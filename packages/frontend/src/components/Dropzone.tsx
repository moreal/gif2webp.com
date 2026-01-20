import { useCallback, useState, useMemo } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import {
	DropzoneContainer,
	DropzoneText,
	type DropzoneTextVariant,
} from "./StyledComponents";
import { readFileAsArrayBuffer, type LoadedFile } from "../utils/fileUtils";
import { useLanguage } from "../hooks/useLanguage";
import { config } from "../config/conversion";

export type { LoadedFile };

export interface DropzoneProps {
	onUpload: (files: LoadedFile[]) => Promise<void>;
}

export function Dropzone({ onUpload }: DropzoneProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { t } = useLanguage();

	const onDrop = useCallback(
		async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			setError(null);

			if (rejectedFiles.length > 0) {
				const sizeError = rejectedFiles.some(
					(f) => f.file.size > config.MAX_FILE_SIZE,
				);
				setError(
					sizeError
						? t("dropzone.fileSizeError", {
								maxSize: config.MAX_FILE_SIZE / 1024 / 1024,
							})
						: t("dropzone.fileTypeError"),
				);
				return;
			}

			try {
				setIsLoading(true);
				const results = await Promise.all(
					acceptedFiles.map((file) =>
						readFileAsArrayBuffer(file).catch(() => {
							throw new Error(t("dropzone.readError"));
						}),
					),
				);
				await onUpload(results);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : t("dropzone.processingError"),
				);
			} finally {
				setIsLoading(false);
			}
		},
		[onUpload, t],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/gif": [".gif"],
		},
		maxSize: config.MAX_FILE_SIZE,
		// Make touchable device handling better
		noClick: false,
		noDrag: false,
		noKeyboard: false,
		multiple: true,
		useFsAccessApi: true,
	});

	const { message, variant } = useMemo<{
		message: string;
		variant: DropzoneTextVariant;
	}>(() => {
		if (isLoading)
			return { message: t("dropzone.processing"), variant: "loading" };
		if (error) return { message: error, variant: "error" };
		if (isDragActive)
			return { message: t("dropzone.dragActive"), variant: "default" };
		return { message: t("dropzone.default"), variant: "default" };
	}, [isLoading, error, isDragActive, t]);

	return (
		<DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
			<input {...getInputProps()} />
			<DropzoneText variant={variant}>{message}</DropzoneText>
		</DropzoneContainer>
	);
}
