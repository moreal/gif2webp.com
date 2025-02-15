import { useCallback, useState, useMemo } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { DropzoneContainer, DropzoneText } from "./StyledComponents";
import { readFileAsArrayBuffer, type LoadedFile } from "../utils/fileUtils";
import { DROPZONE_MESSAGES } from "../constants/messages";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export type { LoadedFile };

export interface DropzoneProps {
	onUpload: (files: LoadedFile[]) => Promise<void>;
}

export function Dropzone({ onUpload }: DropzoneProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onDrop = useCallback(
		async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			setError(null);

			if (rejectedFiles.length > 0) {
				const sizeError = rejectedFiles.some(
					(f) => f.file.size > MAX_FILE_SIZE,
				);
				setError(
					sizeError
						? DROPZONE_MESSAGES.FILE_SIZE_ERROR
						: DROPZONE_MESSAGES.FILE_TYPE_ERROR,
				);
				return;
			}

			try {
				setIsLoading(true);
				const results = await Promise.all(
					acceptedFiles.map((file) =>
						readFileAsArrayBuffer(file).catch(() => {
							throw new Error(DROPZONE_MESSAGES.READ_ERROR);
						}),
					),
				);
				await onUpload(results);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: DROPZONE_MESSAGES.PROCESSING_ERROR,
				);
			} finally {
				setIsLoading(false);
			}
		},
		[onUpload],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/gif": [".gif"],
		},
		maxSize: MAX_FILE_SIZE,
	});

	const message = useMemo(() => {
		if (isLoading) return DROPZONE_MESSAGES.PROCESSING;
		if (error) return error;
		if (isDragActive) return DROPZONE_MESSAGES.DRAG_ACTIVE;
		return DROPZONE_MESSAGES.DEFAULT;
	}, [isLoading, error, isDragActive]);

	return (
		<DropzoneContainer {...getRootProps()}>
			<input {...getInputProps()} />
			<DropzoneText>{message}</DropzoneText>
		</DropzoneContainer>
	);
}
