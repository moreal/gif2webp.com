import { useTheme } from "../hooks/useTheme";
import { FOOTER_ELEMENT_OPACITY } from "../config/styles";

export function ThemeToggle() {
	const { theme, themeSource, nextTheme, toggleTheme } = useTheme();

	return (
		<button
			onClick={toggleTheme}
			style={{
				background: "none",
				border: "none",
				padding: "8px 8px",
				color: "inherit",
				cursor: "pointer",
				opacity: FOOTER_ELEMENT_OPACITY,
				transition: "opacity 0.2s",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: "4px",
				minWidth: "44px",
				minHeight: "32px",
				touchAction: "manipulation",
				fontSize: "inherit",
			}}
			aria-label={`Switch to ${nextTheme} theme`}
		>
			{theme === "dark" ? "🌙" : "☀️"}
			{themeSource === "system" && " (System)"}
		</button>
	);
}
