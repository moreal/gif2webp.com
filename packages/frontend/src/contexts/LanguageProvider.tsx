import { useEffect, useCallback, useMemo } from "react";
import {
	type Language,
	DEFAULT_LANGUAGE,
	SUPPORTED_LANGUAGES,
} from "../config/i18n";
import { getTranslation, type TranslationValues } from "../config/translations";
import { LanguageContext } from "./LanguageContext";
import { usePersistedState } from "../hooks/usePersistedState";

const LANGUAGE_STORAGE_KEY = "gif2webp-language";

const isLanguage = (value: string): value is Language =>
	value in SUPPORTED_LANGUAGES;

const getBrowserLanguage = (): Language => {
	const browserLang = navigator.language.split("-")[0];
	return browserLang in SUPPORTED_LANGUAGES
		? (browserLang as Language)
		: DEFAULT_LANGUAGE;
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	// The first render always uses the default language: navigator is
	// unavailable during build-time prerendering, and the first client render
	// has to match the prerendered HTML. Detection runs in the effect below.
	const [language, setLanguage] = usePersistedState<Language>(
		LANGUAGE_STORAGE_KEY,
		DEFAULT_LANGUAGE,
		isLanguage,
	);

	useEffect(() => {
		try {
			const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
			if (stored !== null && isLanguage(stored)) return;
		} catch {
			// fall through to browser-language detection
		}
		setLanguage(getBrowserLanguage());
	}, [setLanguage]);

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	const t = useCallback(
		(key: string, values?: TranslationValues) =>
			getTranslation(language, key, values),
		[language],
	);

	const contextValue = useMemo(
		() => ({ language, setLanguage, t }),
		[language, setLanguage, t],
	);

	return (
		<LanguageContext.Provider value={contextValue}>
			{children}
		</LanguageContext.Provider>
	);
}
