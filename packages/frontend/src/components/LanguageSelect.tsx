import { Select } from "@base-ui/react/select";
import { useLanguage } from "../hooks/useLanguage";
import { type Language, SUPPORTED_LANGUAGES } from "../config/i18n";
import { FOOTER_ELEMENT_OPACITY } from "../config/styles";

export function LanguageSelect() {
	const { language, setLanguage } = useLanguage();

	return (
		<Select.Root
			value={language}
			onValueChange={(value) => {
				if (value !== null) setLanguage(value);
			}}
		>
			<Select.Trigger
				aria-label="Select language"
				style={{
					background: "none",
					border: "none",
					padding: "8px 4px",
					color: "inherit",
					cursor: "pointer",
					opacity: FOOTER_ELEMENT_OPACITY,
					fontSize: "inherit",
					transition: "opacity 0.2s",
					minHeight: "44px",
					minWidth: "75px",
					touchAction: "manipulation",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "4px",
				}}
			>
				<Select.Value>
					{(language: Language) => SUPPORTED_LANGUAGES[language]}
				</Select.Value>
				<Select.Icon>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="6"
						viewBox="0 0 12 6"
					>
						<path d="M0,0 L12,0 L6,6 Z" fill="#888" />
					</svg>
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Positioner
					style={{
						zIndex: 1000,
					}}
				>
					<Select.Popup
						style={{
							backgroundColor: "var(--bg-primary)",
							border: "1px solid var(--border-color)",
							borderRadius: "4px",
							boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
							padding: "4px 0",
						}}
					>
						{Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
							<Select.Item
								key={code}
								value={code}
								style={(style) => ({
									padding: "8px 16px",
									cursor: "pointer",
									color:
										style.selected || style.highlighted
											? "var(--text-primary)"
											: "var(--text-secondary)",
									fontSize: "inherit",
								})}
							>
								<Select.ItemText>{name}</Select.ItemText>
							</Select.Item>
						))}
					</Select.Popup>
				</Select.Positioner>
			</Select.Portal>
		</Select.Root>
	);
}
