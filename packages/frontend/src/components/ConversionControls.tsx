import type { ConversionStatus } from "../hooks/useImageConversion";
import { useLanguage } from "../hooks/useLanguage";
import {
	ConversionButton,
	OptionsContainer,
	MemoryWarning,
} from "./StyledComponents";
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
