import { useCallback, useState, useMemo } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { DropzoneContainer, DropzoneText } from "./StyledComponents";
import { readFileAsArrayBuffer, type LoadedFile } from "../utils/fileUtils";
import { useLanguage } from "../hooks/useLanguage";

const MAX_FILE_SIZE = 512 * 1024 * 1024; // 512MB

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
					(f) => f.file.size > MAX_FILE_SIZE,
				);
				setError(
					sizeError ? t("dropzone.fileSizeError") : t("dropzone.fileTypeError"),
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
		maxSize: MAX_FILE_SIZE,
		// Make touchable device handling better
		noClick: false,
		noDrag: false,
		noKeyboard: false,
		multiple: true,
		useFsAccessApi: true,
	});

	const message = useMemo(() => {
		if (isLoading) return t("dropzone.processing");
		if (error) return error;
		if (isDragActive) return t("dropzone.dragActive");
		return t("dropzone.default");
	}, [isLoading, error, isDragActive, t]);

	return (
		<DropzoneContainer {...getRootProps()}>
			<input {...getInputProps()} />
			<DropzoneText>{message}</DropzoneText>
		</DropzoneContainer>
	);
}
