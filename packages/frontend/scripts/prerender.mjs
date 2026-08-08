// Build-time prerendering: renders the app once per language in Node and
// writes dist/index.html (English) plus dist/<lang>/index.html for every
// other language (e.g. dist/ko/index.html), each with a localized <head>.
// The deployed artifact stays fully static — no server-side rendering
// happens at runtime.
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ssrOutDir = path.join(root, "dist-ssr");
const distDir = path.join(root, "dist");

const ROOT_MARKER = '<div id="root"></div>';

function injectApp(html, appHtml) {
	if (!appHtml) {
		throw new Error("Prerender produced empty markup");
	}
	return replaceOnce(html, ROOT_MARKER, `<div id="root">${appHtml}</div>`);
}

// Replaces `from` with `to`, failing loudly if `from` doesn't appear exactly
// once — index.html drifting out from under this script is a build error,
// not something to silently ignore.
function replaceOnce(html, from, to) {
	const parts = html.split(from);
	if (parts.length !== 2) {
		throw new Error(
			`Expected exactly 1 occurrence of ${JSON.stringify(from.slice(0, 80))} in index.html, found ${parts.length - 1}`,
		);
	}
	return parts.join(to);
}

function regionMarkers(name) {
	return [`<!-- i18n:${name}:start -->`, `<!-- i18n:${name}:end -->`];
}

// Splits html around a <!-- i18n:<name>:start/end --> marked region, failing
// loudly if the markers are missing or duplicated.
function splitRegion(html, name) {
	const [startMarker, endMarker] = regionMarkers(name);
	const startParts = html.split(startMarker);
	if (startParts.length !== 2) {
		throw new Error(
			`Expected exactly 1 occurrence of ${startMarker} in index.html, found ${startParts.length - 1}`,
		);
	}
	const endParts = startParts[1].split(endMarker);
	if (endParts.length !== 2) {
		throw new Error(
			`Expected exactly 1 occurrence of ${endMarker} in index.html, found ${endParts.length - 1}`,
		);
	}
	return [startParts[0] + startMarker, endParts[0], endMarker + endParts[1]];
}

function readRegion(html, name) {
	return splitRegion(html, name)[1];
}

function replaceRegion(html, name, lines, indent = "  ") {
	const [before, , after] = splitRegion(html, name);
	const body = lines.map((line) => (line ? indent + line : "")).join("\n");
	return `${before}\n${body}\n${after}`;
}

// index.html is formatted by editors (formatOnSave is on in .vscode) and its
// long attributes get wrapped onto continuation lines; comparing with
// whitespace collapsed means a re-indent never trips this guard, while an
// actual content change still does.
function normalizeHtml(text) {
	return text.replace(/\s+/g, " ").trim();
}

function assertNoDrift(name, inIndexHtml, generated) {
	const a = normalizeHtml(inIndexHtml);
	const b = normalizeHtml(generated);
	if (a === b) return;
	throw new Error(
		`index.html's <!-- i18n:${name} --> block no longer matches what ` +
			`src/config/documentMeta.ts generates for the default language. ` +
			`Regenerate it (see docs/SEO.md §8) or fix the generator.\n\n` +
			`--- index.html ---\n${a}\n\n--- generated ---\n${b}`,
	);
}

// The pre-paint redirect script in index.html is hand-written (it must run
// under `vite dev`, where this script never executes), but its language list
// must match SUPPORTED_LANGUAGES.
function assertRedirectLanguageList(html, prefixedCodes) {
	const match = html.match(/var LANGS = "([a-z ]*)";/);
	if (!match) {
		throw new Error(
			'index.html: could not find the `var LANGS = "…";` line in the pre-paint redirect script',
		);
	}
	const expected = prefixedCodes.join(" ");
	if (match[1] !== expected) {
		throw new Error(
			`index.html's pre-paint redirect lists "${match[1]}" but SUPPORTED_LANGUAGES yields "${expected}"`,
		);
	}
}

await build({
	root,
	logLevel: "warn",
	build: {
		ssr: "src/entry-prerender.tsx",
		outDir: "dist-ssr",
	},
});

try {
	const {
		render,
		LANGUAGE_CODES,
		DEFAULT_LANGUAGE,
		languagePath,
		DOCUMENT_META,
		renderHeadLines,
		renderNoscriptLines,
		renderSitemap,
	} = await import(
		pathToFileURL(path.join(ssrOutDir, "entry-prerender.js")).href
	);

	const base = await readFile(path.join(distDir, "index.html"), "utf8");
	const defaultMeta = DOCUMENT_META[DEFAULT_LANGUAGE];

	// index.html carries the default language's blocks inline so `vite dev`
	// serves a correct page without running this script. That makes it a
	// second copy of generated output — fail the build the moment the two
	// disagree instead of silently deploying stale markup.
	assertNoDrift(
		"head",
		readRegion(base, "head"),
		renderHeadLines(defaultMeta).join("\n"),
	);
	assertNoDrift(
		"noscript",
		readRegion(base, "noscript"),
		renderNoscriptLines(defaultMeta).join("\n"),
	);
	assertRedirectLanguageList(
		base,
		LANGUAGE_CODES.filter((code) => code !== DEFAULT_LANGUAGE),
	);

	for (const lang of LANGUAGE_CODES) {
		const meta = DOCUMENT_META[lang];
		let html = base;
		html = replaceOnce(html, '<html lang="en">', `<html lang="${lang}">`);
		html = replaceRegion(html, "head", renderHeadLines(meta));
		html = replaceRegion(html, "noscript", renderNoscriptLines(meta));
		html = injectApp(html, await render(lang));

		const dir = path.join(distDir, languagePath(lang));
		await mkdir(dir, { recursive: true });
		await writeFile(path.join(dir, "index.html"), html);
	}

	// public/ was already copied into dist/ by `vite build`, which ran before
	// this script — writing here overwrites that copy. sitemap.xml lists
	// every language's URL, so it is generated here instead of hand-maintained
	// as a static asset.
	await writeFile(path.join(distDir, "sitemap.xml"), renderSitemap());

	console.log(
		`Prerendered ${LANGUAGE_CODES.length} language(s): ` +
			LANGUAGE_CODES.map((lang) => languagePath(lang)).join(", "),
	);
} finally {
	await rm(ssrOutDir, { recursive: true, force: true });
}
