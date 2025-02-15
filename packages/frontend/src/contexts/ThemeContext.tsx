import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	currentTheme: "light" | "dark"; // actual theme being applied
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_STORAGE_KEY = "gif2webp-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>(() => {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		return (stored as Theme) || "system";
	});

	const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() =>
		window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light",
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e: MediaQueryListEvent) =>
			setSystemTheme(e.matches ? "dark" : "light");

		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	useEffect(() => {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	const currentTheme = theme === "system" ? systemTheme : theme;

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", currentTheme);
	}, [currentTheme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
