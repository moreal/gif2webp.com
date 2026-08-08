import { describe, it, expect } from "vitest";
import {
	DEFAULT_LANGUAGE,
	LANGUAGE_CODES,
	SUPPORTED_LANGUAGES,
	languageFromPathname,
	languagePath,
} from "./i18n";

describe("languageFromPathname", () => {
	it.each([
		"constructor",
		"toString",
		"__proto__",
		"hasOwnProperty",
		"valueOf",
	])("does not accept the prototype key %s as a language segment", (segment) => {
		expect(languageFromPathname(`/${segment}/`)).toBe(DEFAULT_LANGUAGE);
	});

	it("maps / to the default language", () => {
		expect(languageFromPathname("/")).toBe(DEFAULT_LANGUAGE);
	});

	it("maps an unknown segment to the default language", () => {
		expect(languageFromPathname("/xx/")).toBe(DEFAULT_LANGUAGE);
	});

	it("maps /en/ to the default language (the default has no path prefix)", () => {
		expect(languageFromPathname("/en/")).toBe(DEFAULT_LANGUAGE);
	});

	it.each(LANGUAGE_CODES)("round-trips %s through languagePath", (lang) => {
		expect(languageFromPathname(languagePath(lang))).toBe(
			lang === DEFAULT_LANGUAGE ? DEFAULT_LANGUAGE : lang,
		);
	});
});

describe("SUPPORTED_LANGUAGES", () => {
	it("gives every language a distinct ogLocale", () => {
		const ogLocales = LANGUAGE_CODES.map(
			(lang) => SUPPORTED_LANGUAGES[lang].ogLocale,
		);
		expect(new Set(ogLocales).size).toBe(ogLocales.length);
	});

	it("gives every language a non-empty name", () => {
		for (const lang of LANGUAGE_CODES) {
			expect(SUPPORTED_LANGUAGES[lang].name.length).toBeGreaterThan(0);
		}
	});
});
