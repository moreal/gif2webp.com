import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from "./i18n";
import {
	DOCUMENT_META,
	SITE_ORIGIN,
	renderHeadLines,
	renderNoscriptLines,
} from "./documentMeta";

describe("DOCUMENT_META", () => {
	it.each(LANGUAGE_CODES)("%s has every field populated", (lang) => {
		const meta = DOCUMENT_META[lang];
		expect(meta.title.length).toBeGreaterThan(0);
		expect(meta.description.length).toBeGreaterThan(0);
		expect(meta.twitterDescription.length).toBeGreaterThan(0);
		expect(meta.structuredDataDescription.length).toBeGreaterThan(0);
		expect(meta.noscriptHtml.length).toBeGreaterThan(0);
		expect(meta.ogLocale.length).toBeGreaterThan(0);
	});

	it.each(
		LANGUAGE_CODES,
	)("%s's structured-data description is shorter than the meta description", (lang) => {
		const meta = DOCUMENT_META[lang];
		expect(meta.structuredDataDescription.length).toBeLessThan(
			meta.description.length,
		);
	});

	it.each(
		LANGUAGE_CODES,
	)("%s's alternates cover every language plus exactly one x-default", (lang) => {
		const { alternates } = DOCUMENT_META[lang];
		const xDefaults = alternates.filter((a) => a.hreflang === "x-default");
		expect(xDefaults).toHaveLength(1);
		expect(xDefaults[0].href).toBe(`${SITE_ORIGIN}/`);
		const nonDefault = alternates.filter((a) => a.hreflang !== "x-default");
		expect(nonDefault.map((a) => a.hreflang).sort()).toEqual(
			[...LANGUAGE_CODES].sort(),
		);
	});

	it.each(
		LANGUAGE_CODES,
	)("%s's ogLocaleAlternates excludes its own locale", (lang) => {
		const meta = DOCUMENT_META[lang];
		expect(meta.ogLocaleAlternates).not.toContain(meta.ogLocale);
		expect(meta.ogLocaleAlternates).toHaveLength(LANGUAGE_CODES.length - 1);
	});

	it.each(
		LANGUAGE_CODES,
	)("%s's noscript fallback links to the GitHub source", (lang) => {
		expect(DOCUMENT_META[lang].noscriptHtml).toContain(
			"https://github.com/moreal/gif2webp.com",
		);
	});

	it("ko's generated head carries ko_KR and /ko/ URLs", () => {
		const head = renderHeadLines(DOCUMENT_META.ko).join("\n");
		expect(head).toContain('content="ko_KR"');
		expect(head).toContain('href="https://gif2webp.com/ko/"');
		expect(head).toContain('hreflang="ja"');
	});
});

// Mirrors scripts/prerender.mjs's drift guard so a mismatch between
// index.html's hand-maintained default-language blocks and what
// documentMeta.ts generates is caught by `vitest` too, not only by a full
// `vite build` (which CI doesn't currently run as a test step).
describe("index.html drift", () => {
	const indexHtmlPath = path.resolve(
		path.dirname(fileURLToPath(import.meta.url)),
		"../../index.html",
	);
	const indexHtml = readFileSync(indexHtmlPath, "utf8");

	function region(name: string): string {
		const start = `<!-- i18n:${name}:start -->`;
		const end = `<!-- i18n:${name}:end -->`;
		const startIndex = indexHtml.indexOf(start);
		const endIndex = indexHtml.indexOf(end);
		if (startIndex === -1 || endIndex === -1) {
			throw new Error(`index.html is missing the i18n:${name} markers`);
		}
		return indexHtml.slice(startIndex + start.length, endIndex);
	}

	function normalize(text: string): string {
		return text.replace(/\s+/g, " ").trim();
	}

	it("head block matches the default language's generated head", () => {
		expect(normalize(region("head"))).toBe(
			normalize(renderHeadLines(DOCUMENT_META[DEFAULT_LANGUAGE]).join("\n")),
		);
	});

	it("noscript block matches the default language's generated noscript", () => {
		expect(normalize(region("noscript"))).toBe(
			normalize(
				renderNoscriptLines(DOCUMENT_META[DEFAULT_LANGUAGE]).join("\n"),
			),
		);
	});

	it("the pre-paint redirect's language list matches SUPPORTED_LANGUAGES", () => {
		const match = indexHtml.match(/var LANGS = "([a-z ]*)";/);
		expect(match).not.toBeNull();
		const expected = LANGUAGE_CODES.filter(
			(code) => code !== DEFAULT_LANGUAGE,
		).join(" ");
		expect(match?.[1]).toBe(expected);
	});
});
