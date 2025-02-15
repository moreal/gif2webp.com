import type { LoadedFile } from "../utils/fileUtils";
import { ImagePreview } from "./ImagePreview";
import { FileListContainer } from "./StyledComponents";

interface FileListProps {
	files: LoadedFile[];
	onDelete: (index: number) => void;
}

export function FileList({ files, onDelete }: FileListProps) {
	return (
		<FileListContainer>
			{files.map((file, index) => (
				<ImagePreview
					key={`${file.file.name}-${index}`}
					file={file}
					onDelete={() => onDelete(index)}
				/>
			))}
		</FileListContainer>
	);
}
