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
	// The first render must not touch matchMedia: it is unavailable during
	// build-time prerendering, and the first client render has to match the
	// prerendered HTML. The real preference is applied by the effect below;
	// the page colors never flash because the inline script in index.html
	// sets data-theme before paint.
	const [systemTheme, setSystemTheme] = useState<Theme>("light");

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		setSystemTheme(getThemeFromMediaQuery(mediaQuery.matches));

		const handler = (e: MediaQueryListEvent) =>
			setSystemTheme(getThemeFromMediaQuery(e.matches));

		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	return systemTheme;
}
