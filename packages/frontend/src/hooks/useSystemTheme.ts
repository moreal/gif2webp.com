import { useEffect, useState } from "react";
import { Theme } from "../types/theme";

/**
 * Hook to detect system theme preference
 */
export function useSystemTheme(): Theme {
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
