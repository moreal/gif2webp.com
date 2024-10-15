import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface LoadedFile {
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
  onChange: (files: LoadedFile[]) => Promise<void>;
}

export function Dropzone({ onChange }: DropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    (async () => {
      const results = await Promise.all(acceptedFiles.map(readAsync));
      await onChange(results);
    })();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}
