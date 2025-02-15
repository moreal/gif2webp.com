import { convertImage } from "@gif2webp/image-converter";

self.onmessage = async (event: MessageEvent) => {
  try {
    const fileData: Uint8Array = event.data;
    const converted = await convertImage(fileData);
    
    if (!converted) {
      throw new Error("Conversion failed");
    }
    
    self.postMessage({ type: 'success', data: converted });
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      error: error instanceof Error ? error.message : 'Failed to convert image' 
    });
  }
};
