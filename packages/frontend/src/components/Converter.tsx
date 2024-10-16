import { useEffect, useState } from "react";
import { LoadedFile } from "./Dropzone";
import { convertImage } from "@gif2webp/image-converter";

type Phase = "INSTANTIATED" | "IN-PROGRESS" | "CONVERTED";

interface ConverterProps {
    file: LoadedFile,
}

function replaceExtension(filename: string, extension: string) {
    const split = filename.split(".");
    if (split.length < 2) {
        throw new Error();
    }

    return split.slice(0, split.length - 1).join(".") + "." + extension;
}

export function Converter({file: {file, data}}: ConverterProps) {
    const [progress, setProgress] = useState<Phase>("INSTANTIATED");
    const [converted, setConverted] = useState<Uint8Array | null>(null);

    useEffect(() => {
        if (progress === "INSTANTIATED") {
            (async() => {
                setProgress("IN-PROGRESS");
                setConverted(await convertImage(data));
                setProgress("CONVERTED");
            })();
        }
    }, [progress]);

    if (progress === "IN-PROGRESS") {
        return <button>Converting...</button>
    }

    if (progress === "CONVERTED") {
        if (converted === null) {
            return <strong>Unexpected situation.</strong>
        }

        const blob = new Blob([converted], { type: "image/webp" });
        return <a href={URL.createObjectURL(blob)} download={replaceExtension(file.name, "webp")}><button>Download</button></a>;
    }
}
