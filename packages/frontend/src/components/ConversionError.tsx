import { useLanguage } from "../hooks/useLanguage";
import {
	ConversionButton,
	ConversionErrorContainer,
	ErrorText,
} from "./StyledComponents";

export interface ConversionErrorProps {
	error: string | null;
	onRetry: () => void;
}

export function ConversionError({ error, onRetry }: ConversionErrorProps) {
	const { t } = useLanguage();

	return (
		<ConversionErrorContainer>
			<ErrorText>{error || t("conversion.error")}</ErrorText>
			<ConversionButton onClick={onRetry}>
				{t("conversion.retry")}
			</ConversionButton>
		</ConversionErrorContainer>
	);
}
