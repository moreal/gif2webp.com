import { useLanguage } from "../hooks/useLanguage";
import { ConversionButton } from "./ui/ConversionButton";
import { ConversionErrorContainer } from "./ui/ConversionErrorContainer";
import { ErrorText } from "./ui/ErrorText";

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
