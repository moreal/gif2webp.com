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
				{`${t("header.title")} `}
				<EmphasisText>{t("header.titleEmphasis")}</EmphasisText>
			</HeaderTitle>
			<HeaderSubtitle>{t("header.subtitle")}</HeaderSubtitle>
		</HeaderContainer>
	);
};
