import { createContext, useContext } from "react";
import { Theme } from "../types/theme";

type ThemeSource = "user" | "system";

interface ThemeContextType {
	theme: Theme;
	themeSource: ThemeSource;
	nextTheme: Theme;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
