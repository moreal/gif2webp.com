import { useEffect, useCallback, useMemo } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { useSystemTheme } from "../hooks/useSystemTheme";
import type { Theme } from "../types/theme";
import { ThemeContext } from "./ThemeContext";

const THEME_STORAGE_KEY = "gif2webp-theme";

type RawTheme = Theme | "system";
const isRawTheme = (value: string): value is RawTheme =>
	value === "light" || value === "dark" || value === "system";

const getOppositeTheme = (theme: Theme): Theme =>
	theme === "dark" ? "light" : "dark";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const systemTheme = useSystemTheme();
	const [rawTheme, setRawTheme] = usePersistedState<RawTheme>(
		THEME_STORAGE_KEY,
		"system",
		isRawTheme,
	);

	const themeSource: "system" | "user" =
		rawTheme === "system" ? "system" : "user";
	const theme = rawTheme === "system" ? systemTheme : rawTheme;

	const nextTheme = getOppositeTheme(theme);
	const toggleTheme = useCallback(() => {
		// Disable transitions during theme switch to prevent animation flash
		document.body.classList.add("theme-switching");
		setRawTheme(nextTheme);
		// Re-enable transitions after theme is applied
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				document.body.classList.remove("theme-switching");
			});
		});
	}, [nextTheme, setRawTheme]);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const contextValue = useMemo(
		() => ({ theme, themeSource, nextTheme, toggleTheme }),
		[theme, themeSource, nextTheme, toggleTheme],
	);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}
