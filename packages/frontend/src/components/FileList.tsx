import { useCallback } from "react";
import type { LoadedFile } from "../utils/fileUtils";
import { ImagePreview } from "./ImagePreview";
import { FileListContainer } from "./ui/FileListContainer";

interface FileListProps {
	files: LoadedFile[];
	onDelete: (index: number) => void;
}

export function FileList({ files, onDelete }: FileListProps) {
	return (
		<FileListContainer>
			{files.map((file, index) => (
				<FileListItem
					key={`${file.file.name}-${index}`}
					file={file}
					index={index}
					onDelete={onDelete}
				/>
			))}
		</FileListContainer>
	);
}

function FileListItem({
	file,
	index,
	onDelete,
}: {
	file: LoadedFile;
	index: number;
	onDelete: (index: number) => void;
}) {
	const handleDelete = useCallback(() => onDelete(index), [onDelete, index]);
	return <ImagePreview file={file} onDelete={handleDelete} />;
}
