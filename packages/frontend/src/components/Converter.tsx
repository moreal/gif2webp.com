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

interface ConversionControlsProps {
	status: ConversionStatus;
	fileSize: number;
	progress: string;
	onConvert: () => void;
}

const ConversionControls = ({
	status,
	fileSize,
	progress,
	onConvert,
}: ConversionControlsProps) => (
	<>
		<MemoryWarning fileSize={fileSize} />
		<OptionsContainer>
			{status === "converting" ? (
				<ProgressIndicator
					phase={progress}
					fileSize={fileSize}
					isComplete={false}
				/>
			) : (
				<ConversionButton onClick={onConvert}>Convert to WebP</ConversionButton>
			)}
		</OptionsContainer>
	</>
);

interface CompletedConversionProps {
	fileSize: number;
	onDownload: () => void;
}

const CompletedConversion = ({
	fileSize,
	onDownload,
}: CompletedConversionProps) => (
	<>
		<ProgressIndicator
			phase="Conversion Complete"
			fileSize={fileSize}
			isComplete={true}
		/>
		<ConversionButton onClick={onDownload}>Download WebP</ConversionButton>
	</>
);

interface ConversionErrorProps {
	error: string | null;
	onRetry: () => void;
}

const ConversionError = ({ error, onRetry }: ConversionErrorProps) => (
	<ConversionErrorContainer>
		<ErrorText>{error || "Conversion failed"}</ErrorText>
		<ConversionButton onClick={onRetry}>Retry</ConversionButton>
	</ConversionErrorContainer>
);

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
			}}
		>
			{renderContent()}
		</div>
	);
}
