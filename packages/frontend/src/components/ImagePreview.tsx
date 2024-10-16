import { Converter } from "./Converter";
import type { LoadedFile } from "./Dropzone";

interface ImagePreviewProps {
    file: LoadedFile;
    onDelete: () => void;
}

export function ImagePreview({ file: loadedFile, onDelete }: ImagePreviewProps) {
    const {file, data} = loadedFile;
    const blob = new Blob([data], { type: file.type });
    const filename = file.name.length > 16 ? `${file.name.substring(0, 13)}...` : file.name;
    return <div style={{display: "inline-block", position: 'relative', margin: "0 1vw"}}>
        <button style={{position: 'absolute', top: "-10px", right: "-10px", textAlign: "center", lineHeight: "25px", height: "25px", width: "25px", borderRadius: "50%", border: "black solid 2px", backgroundColor: "white"}} onClick={_ => onDelete()}>X</button>
        <img style={{ margin: 0 }} width="100px" height="100px" src={URL.createObjectURL(blob)}/>
        <p style={{ margin: 0 }}>{filename}</p>
        <Converter file={loadedFile}/>
    </div>
}
