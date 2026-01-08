import { useEffect, useState, useCallback } from "react";
import { Converter } from "./Converter";
import type { LoadedFile } from "../utils/fileUtils";
import {
	PreviewContainer,
	DeleteButton,
	PreviewImage,
	FileName,
	ErrorText,
} from "./StyledComponents";

const IMAGE_PREVIEW_ERROR = "Failed to load image preview";
const MAX_FILENAME_DISPLAY_LENGTH = 16;
const FILENAME_TRUNCATE_LENGTH = 13;

interface ImagePreviewProps {
	file: LoadedFile;
	onDelete: () => void;
}

export function ImagePreview({
	file: loadedFile,
	onDelete,
}: ImagePreviewProps) {
	const [blobUrl, setBlobUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { file, data } = loadedFile;

	useEffect(() => {
		try {
			const blob = new Blob([data], { type: file.type });
			const url = URL.createObjectURL(blob);
			setBlobUrl(url);
			return () => {
				URL.revokeObjectURL(url);
			};
		} catch {
			setError(IMAGE_PREVIEW_ERROR);
		}
	}, [data, file.type]);

	const filename =
		file.name.length > MAX_FILENAME_DISPLAY_LENGTH
			? `${file.name.substring(0, FILENAME_TRUNCATE_LENGTH)}...`
			: file.name;

	const handleImageError = useCallback(() => {
		setError(IMAGE_PREVIEW_ERROR);
	}, []);

	if (error) {
		return (
			<PreviewContainer>
				<DeleteButton onClick={onDelete} />
				<ErrorText>{error}</ErrorText>
				<FileName>{filename}</FileName>
				<Converter file={loadedFile} />
			</PreviewContainer>
		);
	}

	return (
		<PreviewContainer>
			<DeleteButton onClick={onDelete} />
			{blobUrl && (
				<PreviewImage src={blobUrl} onError={handleImageError} alt={filename} />
			)}
			<FileName>{filename}</FileName>
			<Converter file={loadedFile} />
		</PreviewContainer>
	);
}
