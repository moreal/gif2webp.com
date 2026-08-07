import { useEffect, useCallback, useMemo, useState } from "react";
import {
	type Language,
	DEFAULT_LANGUAGE,
	languagePath,
	languageFromPathname,
} from "../config/i18n";
import { getTranslation, type TranslationValues } from "../config/translations";
import { LanguageContext } from "./LanguageContext";

// Also read by the preference-redirect inline script in index.html — keep in sync.
const LANGUAGE_STORAGE_KEY = "gif2webp-language";

export function LanguageProvider({
	initialLanguage = DEFAULT_LANGUAGE,
	children,
}: {
	initialLanguage?: Language;
	children: React.ReactNode;
}) {
	// Each language lives at its own URL (/ for English, /ko/ for Korean), so
	// the language is fixed by the page being served; initialLanguage must match
	// that page for hydration. Browser-language detection happens before paint
	// via the inline script in index.html, not here.
	const [language, setLanguageState] = useState<Language>(initialLanguage);

	// Switching stays client-side (pushState) so in-progress state such as the
	// uploaded file list survives; the URL change keeps reloads and shared
	// links on the right language version.
	const setLanguage = useCallback((lang: Language) => {
		setLanguageState(lang);
		try {
			localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
		} catch {
			// the preference just won't be remembered
		}
		const path = languagePath(lang);
		if (window.location.pathname !== path) {
			window.history.pushState(null, "", path);
		}
	}, []);

	useEffect(() => {
		const handlePopState = () => {
			setLanguageState(languageFromPathname(window.location.pathname));
		};
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, []);

	useEffect(() => {
		document.documentElement.lang = language;
		document.title = getTranslation(language, "meta.title");
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
