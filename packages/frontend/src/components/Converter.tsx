import { useCallback } from "react";
import type { LoadedFile } from "../utils/fileUtils";
import {
	ConversionButton,
	ConversionErrorContainer,
	ErrorText,
	OptionsContainer,
	MemoryWarning,
} from "./StyledComponents";
import { ProgressIndicator } from "./ProgressIndicator";
import {
	type ConversionStatus,
	useImageConversion,
} from "../hooks/useImageConversion";
import { useLanguage } from "../hooks/useLanguage";

interface ConversionControlsProps {
	status: ConversionStatus;
	fileSize: number;
	progress: string;
	onConvert: () => void;
}

const ConversionControls = ({
	status,
	fileSize,
	onConvert,
}: ConversionControlsProps) => {
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
};

interface CompletedConversionProps {
	fileSize: number;
	onDownload: () => void;
}

const CompletedConversion = ({
	fileSize,
	onDownload,
}: CompletedConversionProps) => {
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
};

interface ConversionErrorProps {
	error: string | null;
	onRetry: () => void;
}

const ConversionError = ({ error, onRetry }: ConversionErrorProps) => {
	const { t } = useLanguage();

	return (
		<ConversionErrorContainer>
			<ErrorText>{error || t("conversion.error")}</ErrorText>
			<ConversionButton onClick={onRetry}>
				{t("conversion.retry")}
			</ConversionButton>
		</ConversionErrorContainer>
	);
};

interface ConverterProps {
	file: LoadedFile;
}

export function Converter({ file: { file, data, size } }: ConverterProps) {
	const { status, error, convertedData, progress, retry, startConversion } =
		useImageConversion(new Uint8Array(data));

	const handleDownload = useCallback(() => {
		if (convertedData) {
			const blob = new Blob([convertedData], { type: "image/webp" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = file.name.replace(/\.[^/.]+$/, ".webp");
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	}, [convertedData, file.name]);

	const renderContent = () => {
		switch (status) {
			case "idle":
			case "converting":
				return (
					<ConversionControls
						status={status}
						fileSize={size}
						progress={progress}
						onConvert={startConversion}
					/>
				);

			case "converted":
				return (
					<CompletedConversion fileSize={size} onDownload={handleDownload} />
				);

			case "error":
				return <ConversionError error={error} onRetry={retry} />;

			default:
				return null;
		}
	};

	return (
		<div
			style={{
				padding: "16px",
				backgroundColor: "rgba(0, 0, 0, 0.1)",
				borderRadius: "8px",
				display: "flex",
				flexDirection: "column",
				gap: "16px",
				width: "100%",
				boxSizing: "border-box",
			}}
		>
			{renderContent()}
		</div>
	);
}
