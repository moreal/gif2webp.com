import type { ConversionStatus } from "../hooks/useImageConversion";
import { useLanguage } from "../hooks/useLanguage";
import { ConversionButton } from "./ui/ConversionButton";
import { OptionsContainer } from "./ui/OptionsContainer";
import { MemoryWarning } from "./ui/MemoryWarning";
import { ProgressIndicator } from "./ProgressIndicator";

export interface ConversionControlsProps {
	status: ConversionStatus;
	fileSize: number;
	onConvert: () => void;
}

export function ConversionControls({
	status,
	fileSize,
	onConvert,
}: ConversionControlsProps) {
	const { t } = useLanguage();

	return (
		<>
			<MemoryWarning fileSize={fileSize} />
			<OptionsContainer>
				{status === "converting" ? (
					<ProgressIndicator
						phase={t("conversion.converting")}
						fileSize={fileSize}
						isComplete={false}
					/>
				) : (
					<ConversionButton onClick={onConvert}>
						{t("conversion.button")}
					</ConversionButton>
				)}
			</OptionsContainer>
		</>
	);
}
