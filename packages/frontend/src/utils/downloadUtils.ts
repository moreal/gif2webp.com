/**
 * Downloads a Blob as a file with the specified filename
 * @param blob - The Blob to download
 * @param filename - The name of the file to download
 */
export function downloadBlob(blob: Blob, filename: string): void {
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
	URL.revokeObjectURL(url);
}

/**
 * Downloads a Uint8Array as a WebP file
 * @param data - The image data to download
 * @param filename - The name of the file to download
 */
export function downloadWebP(data: Uint8Array, filename: string): void {
	const blob = new Blob([data], { type: "image/webp" });
	downloadBlob(blob, filename);
}
