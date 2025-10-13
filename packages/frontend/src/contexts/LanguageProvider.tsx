import { useEffect, useState } from "react";
import {
	type Language,
	DEFAULT_LANGUAGE,
	SUPPORTED_LANGUAGES,
} from "../config/i18n";
import { getTranslation, type TranslationValues } from "../config/translations";
import { LanguageContext } from "./LanguageContext";

const LANGUAGE_STORAGE_KEY = "gif2webp-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>(() => {
		const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
		if (stored && stored in SUPPORTED_LANGUAGES) {
			return stored as Language;
		}

		const browserLang = navigator.language.split("-")[0];
		return browserLang in SUPPORTED_LANGUAGES
			? (browserLang as Language)
			: DEFAULT_LANGUAGE;
	});

	useEffect(() => {
		localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
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
