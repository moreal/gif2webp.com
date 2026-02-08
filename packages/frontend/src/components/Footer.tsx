import { useState, lazy, Suspense } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelect } from "./LanguageSelect";
import { useLanguage } from "../hooks/useLanguage";

const AboutModal = lazy(() => import("./AboutModal"));

export function Footer() {
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const { t } = useLanguage();

	return (
		<footer
			style={{
				padding: "1rem 10px",
				borderTop: "1px solid var(--border-color)",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
				gap: "1rem",
				fontSize: "0.9rem",
				marginTop: "auto",
			}}
		>
			<button
				onClick={() => setIsAboutOpen(true)}
				className="footer-link"
				style={{
					background: "none",
					border: "none",
					padding: "8px",
					color: "inherit",
					cursor: "pointer",
					fontSize: "inherit",
					touchAction: "manipulation",
					minHeight: "44px",
					minWidth: "44px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{t("footer.about")}
			</button>
			<a
				href="https://github.com/moreal/gif2webp.com"
				target="_blank"
				rel="noopener noreferrer"
				className="footer-link"
				style={{
					color: "inherit",
					textDecoration: "none",
					padding: "8px",
					fontWeight: "400",
					minHeight: "44px",
					display: "flex",
					alignItems: "center",
				}}
			>
				{t("footer.sourceCode")}
			</a>
			<ThemeToggle />
			<LanguageSelect />
			<Suspense fallback={null}>
				<AboutModal
					isOpen={isAboutOpen}
					onClose={() => setIsAboutOpen(false)}
				/>
			</Suspense>
		</footer>
	);
}
