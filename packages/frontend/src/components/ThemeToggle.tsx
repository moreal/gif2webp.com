import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
	const { theme, setTheme, currentTheme } = useTheme();

	return (
		<button
			onClick={() => {
				switch (theme) {
					case "system":
						setTheme(currentTheme === "dark" ? "light" : "dark");
						break;
					case "dark":
						setTheme("light");
						break;
					case "light":
						setTheme("dark");
						break;
				}
			}}
			style={{
				background: "none",
				border: "none",
				padding: 0,
				color: "inherit",
				cursor: "pointer",
				opacity: 0.8,
				transition: "opacity 0.2s",
				display: "flex",
				alignItems: "center",
				gap: "4px",
			}}
			aria-label={`Switch to ${theme === "system" ? "manual" : theme === "dark" ? "light" : "dark"} theme`}
		>
			{theme === "system"
				? currentTheme === "dark"
					? "🌙"
					: "☀️"
				: theme === "dark"
					? "🌙"
					: "☀️"}
			{theme === "system" && " (System)"}
		</button>
	);
}
