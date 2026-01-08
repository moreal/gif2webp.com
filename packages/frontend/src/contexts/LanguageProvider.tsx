import { useEffect } from "react";
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

const getInitialLanguage = (): Language => {
	const browserLang = navigator.language.split("-")[0];
	return browserLang in SUPPORTED_LANGUAGES
		? (browserLang as Language)
		: DEFAULT_LANGUAGE;
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = usePersistedState<Language>(
		LANGUAGE_STORAGE_KEY,
		getInitialLanguage(),
		isLanguage,
	);

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	const t = (key: string, values?: TranslationValues) =>
		getTranslation(language, key, values);

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}
