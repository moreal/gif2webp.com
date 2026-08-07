import { Fragment } from "react";
import { useLanguage } from "../hooks/useLanguage";
import {
	type Language,
	SUPPORTED_LANGUAGES,
	languagePath,
} from "../config/i18n";

// Each language version has its own URL, and these must be real anchors so
// crawlers can discover them; clicking is intercepted to switch in-app
// (pushState) so state like the uploaded file list survives.
export function LanguageSelect() {
	const { language, setLanguage } = useLanguage();

	return (
		<nav
			aria-label="Language"
			style={{
				display: "flex",
				alignItems: "center",
				gap: "4px",
				minHeight: "44px",
			}}
		>
			{(
				Object.entries(SUPPORTED_LANGUAGES) as [
					Language,
					(typeof SUPPORTED_LANGUAGES)[Language],
				][]
			).map(([code, name], index) => (
				<Fragment key={code}>
					{index > 0 && (
						<span aria-hidden="true" style={{ opacity: 0.4 }}>
							·
						</span>
					)}
					{code === language ? (
						<span
							aria-current="page"
							style={{
								padding: "8px 4px",
								fontWeight: 600,
							}}
						>
							{name}
						</span>
					) : (
						<a
							href={languagePath(code)}
							hrefLang={code}
							lang={code}
							className="footer-link"
							style={{
								padding: "8px 4px",
								color: "inherit",
								textDecoration: "none",
								touchAction: "manipulation",
							}}
							onClick={(event) => {
								event.preventDefault();
								setLanguage(code);
							}}
						>
							{name}
						</a>
					)}
				</Fragment>
			))}
		</nav>
	);
}
