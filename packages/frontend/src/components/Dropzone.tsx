import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export interface LoadedFile {
    file: File;
    data: ArrayBuffer;
}

function readAsync(file: File): Promise<LoadedFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onabort = () => reject("onabort");
    reader.onerror = () => reject("onerror");
    reader.onload = () => {
      resolve({
        file,
        data: reader.result as ArrayBuffer
      })
    };

    reader.readAsArrayBuffer(file);
  })
}

export interface DropzoneProps {
  onUpload: (files: LoadedFile[]) => Promise<void>;
}

export function Dropzone({ onUpload }: DropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    (async () => {
      const results = await Promise.all(acceptedFiles.map(readAsync));
      await onUpload(results);
    })();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{border: 'black solid 1px', maxWidth: '25vw', minWidth: '200px', fontWeight: "bold", padding: '5px', minHeight: '5vh'}}>
      <input {...getInputProps()} />
      <p>Drag and drop some files here, or click to select files</p>
    </div>
  )
}
