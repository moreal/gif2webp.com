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
	// According to MDN, BlobPart can be TypedArray(i.e., Uint8Array) but TypeScript's type definition
	// doesn't allow. See https://github.com/microsoft/TypeScript/issues/62240.
	// @ts-expect-error TS2322: Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'BlobPart'.
	const blob = new Blob([data], { type: "image/webp" });
	downloadBlob(blob, filename);
}
