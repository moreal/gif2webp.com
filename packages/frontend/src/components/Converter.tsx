import { useCallback } from "react";
import type { LoadedFile } from "../utils/fileUtils";
import { replaceExtension } from "../utils/fileUtils";
import { downloadWebP } from "../utils/downloadUtils";
import { ConverterContainer } from "./ui";
import { ConversionControls } from "./ConversionControls";
import { CompletedConversion } from "./CompletedConversion";
import { ConversionError } from "./ConversionError";
import { useImageConversion } from "../hooks/useImageConversion";

interface ConverterProps {
	file: LoadedFile;
	onDownload?: (data: Uint8Array, filename: string) => void;
}

export function Converter({
	file: { file, data, size },
	onDownload,
}: ConverterProps) {
	const {
		status,
		error,
		convertedData,
		convertedSize,
		retry,
		startConversion,
	} = useImageConversion(new Uint8Array(data));

	const handleDownload = useCallback(() => {
		if (convertedData) {
			const filename = replaceExtension(file.name, ".webp");
			if (onDownload) {
				onDownload(convertedData, filename);
			} else {
				downloadWebP(convertedData, filename);
			}
		}
	}, [convertedData, file.name, onDownload]);

	const renderContent = () => {
		switch (status) {
			case "idle":
			case "converting":
				return (
					<ConversionControls
						status={status}
						fileSize={size}
						onConvert={startConversion}
					/>
				);

			case "converted":
				return (
					<CompletedConversion
						originalSize={size}
						convertedSize={convertedSize}
						onDownload={handleDownload}
					/>
				);

			case "error":
				return <ConversionError error={error} onRetry={retry} />;

			default:
				return null;
		}
	};

	return <ConverterContainer>{renderContent()}</ConverterContainer>;
}
