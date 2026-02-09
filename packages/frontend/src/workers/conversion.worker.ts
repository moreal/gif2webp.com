import { convertImage } from "@gif2webp/image-converter";

self.onmessage = async (event: MessageEvent) => {
	try {
		const fileData: Uint8Array = event.data;
		console.log("[Conversion] Worker received data, starting conversion...", {
			dataSize: fileData.byteLength,
		});

		const converted = await convertImage(fileData, {
			onProgress: (phase) => {
				console.log(`[Conversion] ${phase}`);
				self.postMessage({ type: "progress", data: phase });
			},
		});

		if (!converted) {
			throw new Error("Conversion failed");
		}

		console.log("[Conversion] Conversion complete", {
			inputSize: fileData.byteLength,
			outputSize: converted.byteLength,
		});
		self.postMessage({ type: "success", data: converted });
	} catch (error) {
		console.error("[Conversion] Conversion error:", error);
		self.postMessage({
			type: "error",
			error: error instanceof Error ? error.message : "Failed to convert image",
		});
	}
};
