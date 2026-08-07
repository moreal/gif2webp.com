export type Language = "en" | "ko";

export const DEFAULT_LANGUAGE: Language = "en";

export const SUPPORTED_LANGUAGES = {
	en: "English",
	ko: "한국어",
} as const;

// Each language lives at its own URL: the default language at / and every
// other one under /<lang>/ (e.g. /ko/), so search engines can crawl and
// annotate them via hreflang.
export function languagePath(lang: Language): string {
	return lang === DEFAULT_LANGUAGE ? "/" : `/${lang}/`;
}

export function languageFromPathname(pathname: string): Language {
	const segment = pathname.split("/")[1];
	return segment !== DEFAULT_LANGUAGE && segment in SUPPORTED_LANGUAGES
		? (segment as Language)
		: DEFAULT_LANGUAGE;
}
