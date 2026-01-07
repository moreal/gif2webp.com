import { ThemeContext } from "../contexts/ThemeContext";
import { createContextHook } from "./createContextHook";

export const useTheme = createContextHook(
	ThemeContext,
	"useTheme",
	"ThemeProvider",
);
