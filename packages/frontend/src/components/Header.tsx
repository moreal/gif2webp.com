import {
	HeaderTitle,
	HeaderSubtitle,
	HeaderContainer,
	EmphasisText,
} from "./ui";
import { useLanguage } from "../hooks/useLanguage";

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
