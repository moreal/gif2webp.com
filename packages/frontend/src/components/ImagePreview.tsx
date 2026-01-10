import { useEffect, useState, useCallback, useMemo } from "react";
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
	const [imageError, setImageError] = useState<string | null>(null);
	const { file, data } = loadedFile;

	// Create blob URL using useMemo and track any creation errors
	const { blobUrl, creationError } = useMemo(() => {
		try {
			const blob = new Blob([data], { type: file.type });
			const url = URL.createObjectURL(blob);
			return { blobUrl: url, creationError: null };
		} catch {
			return { blobUrl: null, creationError: IMAGE_PREVIEW_ERROR };
		}
	}, [data, file.type]);

	// Clean up blob URL on unmount or when it changes
	useEffect(() => {
		if (!blobUrl) return;
		return () => {
			URL.revokeObjectURL(blobUrl);
		};
	}, [blobUrl]);

	// Determine the final error state
	const error = creationError || imageError;

	const filename =
		file.name.length > MAX_FILENAME_DISPLAY_LENGTH
			? `${file.name.substring(0, FILENAME_TRUNCATE_LENGTH)}...`
			: file.name;

	const handleImageError = useCallback(() => {
		setImageError(IMAGE_PREVIEW_ERROR);
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
