import { HeaderTitle } from "./ui/HeaderTitle";
import { HeaderSubtitle } from "./ui/HeaderSubtitle";
import { HeaderContainer } from "./ui/HeaderContainer";
import { EmphasisText } from "./ui/EmphasisText";
import { useLanguage } from "../hooks/useLanguage";

export const Header = () => {
	const { t } = useLanguage();

	return (
		<HeaderContainer>
			<HeaderTitle>
				{/* titleJoiner is a real word-space for en/ko/de, but empty for
				    ja/zh — those languages don't put ASCII spaces between CJK text
				    and the Latin "GIF"/"WebP" that starts titleEmphasis. */}
				{`${t("header.title")}${t("header.titleJoiner")}`}
				<EmphasisText>{t("header.titleEmphasis")}</EmphasisText>
			</HeaderTitle>
			<HeaderSubtitle>{t("header.subtitle")}</HeaderSubtitle>
		</HeaderContainer>
	);
};
