import { useState } from 'react'
import './App.css'
import { Dropzone, type LoadedFile } from './components/Dropzone';
import { ImagePreview } from './components/ImagePreview';

function App() {
  const [files, setFiles] = useState<LoadedFile[]>([]);

  return (
    // @ts-ignore
    <div align="center">
      <header>
        <p className="title">Convert your GIF to WebP <ins className='title-highlight'><b>on your browser</b></ins></p>
        <p className='subtitle'>Don't sacrifice your image for convenience.</p>
      </header>
      <main>
        <p style={{
          'fontStyle': 'italic',
          'fontSize': '20px'
        }}>Choose files..</p>
      </main>
      <Dropzone onUpload={async uploadedFiles => {
        setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
        // setProgress("IN-PROGRESS");
        // setConverted(await convertImage(files[0].data));
        // setProgress("CONVERTED");
      }} />
      <div style={{ marginTop: "5vh" }}>
        {...files.map((x, index) => <ImagePreview file={x} onDelete={() => {
          setFiles(prevFiles => [...prevFiles.slice(0, index), ...prevFiles.slice(index + 1)]);
        }} />)}
      </div>
    </div>
  )
}

export default App
