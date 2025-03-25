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
			setError("Failed to load image preview");
		}
	}, [data, file.type]);

	const filename =
		file.name.length > 16 ? `${file.name.substring(0, 13)}...` : file.name;

	const handleImageError = useCallback(() => {
		setError("Failed to load image preview");
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
