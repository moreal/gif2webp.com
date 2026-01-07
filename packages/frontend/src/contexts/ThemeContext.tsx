import { createContext } from "react";
import type { Theme } from "../types/theme";

type ThemeSource = "user" | "system";

interface ThemeContextType {
	theme: Theme;
	themeSource: ThemeSource;
	nextTheme: Theme;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
