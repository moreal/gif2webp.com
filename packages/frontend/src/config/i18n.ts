export type Language = "en" | "ko" | "ja" | "de" | "zh";

export const DEFAULT_LANGUAGE: Language = "en";

// One row per language: `name` is written in that language (it's what the
// switcher shows), `ogLocale` is Open Graph's language_TERRITORY form (not
// derivable from the code, so listed explicitly). Adding a language is
// adding a row here — it then flows into the switcher, hreflang, og:locale,
// JSON-LD and the sitemap.
export const SUPPORTED_LANGUAGES = {
	en: { name: "English", ogLocale: "en_US" },
	ko: { name: "한국어", ogLocale: "ko_KR" },
	ja: { name: "日本語", ogLocale: "ja_JP" },
	de: { name: "Deutsch", ogLocale: "de_DE" },
	zh: { name: "简体中文", ogLocale: "zh_CN" },
} as const satisfies Record<Language, { name: string; ogLocale: string }>;

// Declaration order is the order the switcher renders in.
export const LANGUAGE_CODES = Object.keys(SUPPORTED_LANGUAGES) as Language[];

// Each language lives at its own URL: the default language at / and every
// other one under /<lang>/ (e.g. /ko/), so search engines can crawl and
// annotate them via hreflang.
export function languagePath(lang: Language): string {
	return lang === DEFAULT_LANGUAGE ? "/" : `/${lang}/`;
}

export function languageFromPathname(pathname: string): Language {
	const segment = pathname.split("/")[1];
	// hasOwnProperty, not `in`: `in` walks the prototype chain, so a segment
	// like "constructor" or "toString" would be accepted as a language and
	// then crash getTranslation.
	return segment !== DEFAULT_LANGUAGE &&
		Object.prototype.hasOwnProperty.call(SUPPORTED_LANGUAGES, segment)
		? (segment as Language)
		: DEFAULT_LANGUAGE;
}
