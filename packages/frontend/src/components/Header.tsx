import {
	HeaderTitle,
	HeaderSubtitle,
	HeaderContainer,
	EmphasisText,
} from "./StyledComponents";
import { useLanguage } from "../contexts/LanguageContext";

export const Header = () => {
	const { t } = useLanguage();

	return (
		<HeaderContainer>
			<HeaderTitle>
				{t("header.title")}{" "}
				<EmphasisText>{t("header.titleEmphasis")}</EmphasisText>
			</HeaderTitle>
			<HeaderSubtitle>{t("header.subtitle")}</HeaderSubtitle>
		</HeaderContainer>
	);
};
