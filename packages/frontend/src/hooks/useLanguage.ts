import { LanguageContext } from "../contexts/LanguageContext";
import { createContextHook } from "./createContextHook";

export const useLanguage = createContextHook(
	LanguageContext,
	"useLanguage",
	"LanguageProvider",
);
