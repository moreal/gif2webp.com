import { useEffect, useState } from "react";
import { Theme } from "../types/theme";

/**
 * Converts a media query match result to a Theme value
 */
function getThemeFromMediaQuery(matches: boolean): Theme {
	return matches ? "dark" : "light";
}

/**
 * Hook to detect system theme preference
 */
export function useSystemTheme(): Theme {
	const [systemTheme, setSystemTheme] = useState<Theme>(() =>
		getThemeFromMediaQuery(
			window.matchMedia("(prefers-color-scheme: dark)").matches,
		),
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e: MediaQueryListEvent) =>
			setSystemTheme(getThemeFromMediaQuery(e.matches));

		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	return systemTheme;
}
