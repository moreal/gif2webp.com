export type Language = "en" | "ko";

export const DEFAULT_LANGUAGE: Language = "en";

export const SUPPORTED_LANGUAGES = {
	en: "English",
	ko: "한국어",
} as const;
