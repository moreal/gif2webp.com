import { createContext } from "react";
import type { Language } from "../config/i18n";
import type { TranslationValues } from "../config/translations";

export interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string, values?: TranslationValues) => string;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);
