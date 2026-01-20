import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { ui } from "../config/ui";

export function ThemeToggle() {
	const { theme, themeSource, nextTheme, toggleTheme } = useTheme();
	const [isAnimating, setIsAnimating] = useState(false);

	const handleClick = () => {
		setIsAnimating(true);
		toggleTheme();
	};

	useEffect(() => {
		if (isAnimating) {
			const timer = setTimeout(() => setIsAnimating(false), 300);
			return () => clearTimeout(timer);
		}
	}, [isAnimating]);

	return (
		<button
			onClick={handleClick}
			style={{
				background: "none",
				border: "none",
				padding: "8px",
				color: "inherit",
				cursor: "pointer",
				opacity: ui.INTERACTIVE_ELEMENT_OPACITY,
				transition:
					"opacity var(--animation-duration-normal) var(--ease-out-quart)",
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
			<span
				style={{
					display: "inline-block",
					transition:
						"transform var(--animation-duration-normal) var(--ease-out-quart)",
					transform: isAnimating ? "rotate(180deg)" : "rotate(0deg)",
				}}
			>
				{theme === "dark" ? "🌙" : "☀️"}
			</span>
			{themeSource === "system" && " (System)"}
		</button>
	);
}
