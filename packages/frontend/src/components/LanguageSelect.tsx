import { useLanguage } from "../contexts/LanguageContext";
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
				padding: 0,
				color: "inherit",
				cursor: "pointer",
				opacity: 0.8,
				fontSize: "inherit",
				transition: "opacity 0.2s",
			}}
		>
			{Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
				<option key={code} value={code}>
					{name}
				</option>
			))}
		</select>
	);
}
