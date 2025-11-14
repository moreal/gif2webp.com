import { useLanguage } from "../hooks/useLanguage";
import { ConversionButton } from "./StyledComponents";
import { ProgressIndicator } from "./ProgressIndicator";

export interface CompletedConversionProps {
	fileSize: number;
	onDownload: () => void;
}

export function CompletedConversion({
	fileSize,
	onDownload,
}: CompletedConversionProps) {
	const { t } = useLanguage();

	return (
		<>
			<ProgressIndicator
				phase={t("conversion.complete")}
				fileSize={fileSize}
				isComplete={true}
			/>
			<ConversionButton onClick={onDownload}>
				{t("conversion.download")}
			</ConversionButton>
		</>
	);
}
