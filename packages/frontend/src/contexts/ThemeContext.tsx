import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type RawTheme = Theme | "system";
type ThemeSource = "user" | "system";

interface ThemeContextType {
	theme: Theme;
	themeSource: ThemeSource;
	nextTheme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_STORAGE_KEY = "gif2webp-theme";

/**
 * Hook to detect system theme preference
 */
function useSystemTheme(): Theme {
	const [systemTheme, setSystemTheme] = useState<Theme>(() =>
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

	return systemTheme;
}
function usePersistedState<T extends string, TDefault extends T>(
	key: string,
	defaultValue: TDefault,
	validate: (value: string) => value is T,
) {
	const [state, setState] = useState<T>(() => {
		const stored = window.localStorage.getItem(key);
		if (stored !== null && validate(stored)) {
			return stored as T;
		}

		return defaultValue;
	});

	useEffect(() => {
		window.localStorage.setItem(key, state);
	}, [state]);

	return [state, setState] as const;
}

const invertTheme = (theme: Theme) => (theme === "dark" ? "light" : "dark");

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const systemTheme = useSystemTheme();
	const [rawTheme, setRawTheme] = usePersistedState<RawTheme, "system">(
		THEME_STORAGE_KEY,
		"system",
		(value) => value === "light" || value === "dark" || value === "system",
	);

	const themeSource = rawTheme === "system" ? "system" : "user";
	const theme = rawTheme === "system" ? systemTheme : rawTheme;

	const nextTheme = invertTheme(theme);
	const toggleTheme = () => setRawTheme(nextTheme);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider
			value={{ theme, themeSource, nextTheme, toggleTheme }}
		>
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
