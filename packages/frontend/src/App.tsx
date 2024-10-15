import { useState } from 'react'
import { convertImage } from "@gif2webp/image-converter";
import './App.css'
import { Dropzone } from './components/Dropzone';

type Phase = "NO-FILES" | "IN-PROGRESS" | "CONVERTED";

function App() {
  const [progress, setProgress] = useState<Phase>("NO-FILES");
  const [converted, setConverted] = useState<Uint8Array | null>(null);

  if (progress === "NO-FILES") {
    return (
      <Dropzone onChange={async files => {
        setProgress("IN-PROGRESS");
        setConverted(await convertImage(files[0].data));
        setProgress("CONVERTED");
      }} />
    )
  }

  if (progress === "IN-PROGRESS")
    return <p>Processing...</p>

  if (progress === "CONVERTED") {
    if (converted === null) {
      return <p>Unexpected situation.</p>
    }

    const blob = new Blob([converted], { type: 'image/webp' });
    return <div>
        <p>Converted!: {converted.length}</p>
        <button><a href={URL.createObjectURL(blob)} download="converted.webp">Download</a></button>
        <img src={URL.createObjectURL(blob)}/>
      </div>
  }
}

export default App
