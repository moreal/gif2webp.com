import { useLanguage } from "../hooks/useLanguage";
import { ConversionButton } from "./ui";
import { ProgressIndicator } from "./ProgressIndicator";

export interface CompletedConversionProps {
	originalSize: number;
	convertedSize: number;
	onDownload: () => void;
}

export function CompletedConversion({
	originalSize,
	convertedSize,
	onDownload,
}: CompletedConversionProps) {
	const { t } = useLanguage();

	return (
		<>
			<ProgressIndicator
				phase={t("conversion.complete")}
				originalSize={originalSize}
				convertedSize={convertedSize}
				isComplete={true}
			/>
			<ConversionButton onClick={onDownload}>
				{t("conversion.download")}
			</ConversionButton>
		</>
	);
}
