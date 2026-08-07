// Build-time prerendering: renders the app once per language in Node and
// writes dist/index.html (English) plus dist/ko/index.html (Korean, with a
// localized <head>). The deployed artifact stays fully static — no
// server-side rendering happens at runtime.
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ssrOutDir = path.join(root, "dist-ssr");

const ROOT_MARKER = '<div id="root"></div>';

// Localized strings that live only in index.html (everything else comes from
// translations.ts via metaFor).
const TWITTER_DESCRIPTION = {
	en: "Free online GIF to WebP converter that runs entirely in your browser. No upload — your files never leave your device.",
	ko: "브라우저에서 완전히 동작하는 무료 GIF → WebP 변환기. 업로드 없음 — 파일이 기기 밖으로 나가지 않습니다.",
};
const NOSCRIPT_NOTICE = {
	en: `      JavaScript is required for the converter to work — it is what keeps your files on your
      device, converting GIF to WebP locally via WebAssembly instead of uploading them.
      Please enable JavaScript, or review and self-host the
      <a href="https://github.com/moreal/gif2webp.com">source code on GitHub</a>.`,
	ko: `      변환기가 동작하려면 JavaScript가 필요합니다 — 파일을 업로드하는 대신 WebAssembly로
      기기 안에서 GIF를 WebP로 변환하기 때문입니다. JavaScript를 활성화하거나,
      <a href="https://github.com/moreal/gif2webp.com">GitHub의 소스 코드</a>를 검토하고 직접 호스팅할 수도 있습니다.`,
};

// Replaces `from` with `to`, failing loudly when index.html drifted and the
// expected number of occurrences is no longer found.
function replaceCount(html, from, to, expected) {
	const parts = html.split(from);
	const count = parts.length - 1;
	if (count !== expected) {
		throw new Error(
			`Expected ${expected} occurrence(s) of ${JSON.stringify(from.slice(0, 80))} in index.html, found ${count}`,
		);
	}
	return parts.join(to);
}

function injectApp(html, appHtml) {
	if (!appHtml) {
		throw new Error("Prerender produced empty markup");
	}
	return replaceCount(html, ROOT_MARKER, `<div id="root">${appHtml}</div>`, 1);
}

// The Korean page reuses the built English page with its <head> localized.
function localizeKorean(html, en, ko) {
	let out = html;
	out = replaceCount(out, '<html lang="en">', '<html lang="ko">', 1);
	// <title>, og:title and twitter:title carry the same string
	out = replaceCount(out, en.title, ko.title, 3);
	// meta description and og:description carry the same string; the JSON-LD
	// description is a prefix of it, so the longer string must go first
	out = replaceCount(out, en.description, ko.description, 2);
	out = replaceCount(
		out,
		jsonLdDescription(en.description),
		jsonLdDescription(ko.description),
		1,
	);
	out = replaceCount(
		out,
		TWITTER_DESCRIPTION.en,
		TWITTER_DESCRIPTION.ko,
		1,
	);
	out = replaceCount(
		out,
		'<link rel="canonical" href="https://gif2webp.com/" />',
		'<link rel="canonical" href="https://gif2webp.com/ko/" />',
		1,
	);
	out = replaceCount(
		out,
		'<meta property="og:url" content="https://gif2webp.com/" />',
		'<meta property="og:url" content="https://gif2webp.com/ko/" />',
		1,
	);
	out = replaceCount(
		out,
		'<meta property="og:locale" content="en_US" />',
		'<meta property="og:locale" content="ko_KR" />',
		1,
	);
	out = replaceCount(
		out,
		'<meta property="og:locale:alternate" content="ko_KR" />',
		'<meta property="og:locale:alternate" content="en_US" />',
		1,
	);
	out = replaceCount(out, NOSCRIPT_NOTICE.en, NOSCRIPT_NOTICE.ko, 1);
	return out;
}

// The JSON-LD description is the meta description without the trailing
// "open source" sentence.
function jsonLdDescription(description) {
	return description.replace(/ (Open source\.|오픈 소스\.)$/, "");
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
	const { render, metaFor } = await import(
		pathToFileURL(path.join(ssrOutDir, "entry-prerender.js")).href
	);

	const base = await readFile(path.join(root, "dist", "index.html"), "utf8");

	await writeFile(
		path.join(root, "dist", "index.html"),
		injectApp(base, await render("en")),
	);

	const korean = localizeKorean(base, metaFor("en"), metaFor("ko"));
	await mkdir(path.join(root, "dist", "ko"), { recursive: true });
	await writeFile(
		path.join(root, "dist", "ko", "index.html"),
		injectApp(korean, await render("ko")),
	);

	console.log("Prerendered app shell into dist/index.html and dist/ko/index.html");
} finally {
	await rm(ssrOutDir, { recursive: true, force: true });
}
