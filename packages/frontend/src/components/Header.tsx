import {
	HeaderTitle,
	HeaderSubtitle,
	HeaderContainer,
	EmphasisText,
} from "./StyledComponents";

export const Header = () => (
	<HeaderContainer>
		<HeaderTitle>
			Convert your GIF to WebP <EmphasisText>on your browser</EmphasisText>
		</HeaderTitle>
		<HeaderSubtitle>Don't sacrifice your image for convenience.</HeaderSubtitle>
	</HeaderContainer>
);
