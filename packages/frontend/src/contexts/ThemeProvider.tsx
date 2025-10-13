import { useEffect } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { useSystemTheme } from "../hooks/useSystemTheme";
import type { Theme } from "../types/theme";
import { ThemeContext } from "./ThemeContext";

const THEME_STORAGE_KEY = "gif2webp-theme";

type RawTheme = Theme | "system";
const isRawTheme = (value: string): value is RawTheme =>
	value === "light" || value === "dark" || value === "system";

const invertTheme = (theme: Theme) => (theme === "dark" ? "light" : "dark");

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const systemTheme = useSystemTheme();
	const [rawTheme, setRawTheme] = usePersistedState<RawTheme>(
		THEME_STORAGE_KEY ? THEME_STORAGE_KEY : "system",
		"system",
		isRawTheme,
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
