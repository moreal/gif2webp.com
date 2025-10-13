import { useLanguage } from "../hooks/useLanguage";
import { SUPPORTED_LANGUAGES } from "../config/i18n";

export function LanguageSelect() {
	const { language, setLanguage } = useLanguage();

	return (
		<select
			value={language}
			onChange={(e) =>
				setLanguage(e.target.value as keyof typeof SUPPORTED_LANGUAGES)
			}
			style={{
				background: "none",
				border: "none",
				padding: "8px 4px",
				color: "inherit",
				cursor: "pointer",
				opacity: 0.8,
				fontSize: "inherit",
				transition: "opacity 0.2s",
				minHeight: "44px",
				minWidth: "75px",
				touchAction: "manipulation",
				WebkitAppearance: "none",
				MozAppearance: "none",
				appearance: "none",
				backgroundImage:
					'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6"><path d="M0,0 L12,0 L6,6 Z" fill="%23888" /></svg>\')',
				backgroundRepeat: "no-repeat",
				backgroundPosition: "right 8px center",
				paddingRight: "24px",
			}}
			aria-label="Select language"
		>
			{Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
				<option key={code} value={code}>
					{name}
				</option>
			))}
		</select>
	);
}
