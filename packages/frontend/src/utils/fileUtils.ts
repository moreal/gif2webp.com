export interface LoadedFile {
	file: File;
	data: ArrayBuffer;
	size: number;
	type: string;
}

export class FileReadError extends Error {
	constructor(
		message: string,
		public readonly originalError?: Error,
	) {
		super(message);
		this.name = "FileReadError";
	}
}

export async function readFileAsArrayBuffer(file: File): Promise<LoadedFile> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		let isAborted = false;

		const cleanup = () => {
			reader.onload = null;
			reader.onerror = null;
			reader.onabort = null;
		};

		reader.onload = () => {
			if (!isAborted) {
				cleanup();
				resolve({
					file,
					data: reader.result as ArrayBuffer,
					size: file.size,
					type: file.type,
				});
			}
		};

		reader.onerror = () => {
			cleanup();
			reject(
				new FileReadError("Failed to read file", reader.error || undefined),
			);
		};

		reader.onabort = () => {
			isAborted = true;
			cleanup();
			reject(new FileReadError("File reading was aborted"));
		};

		try {
			reader.readAsArrayBuffer(file);
		} catch (error) {
			cleanup();
			reject(new FileReadError("Failed to start file reading", error as Error));
		}

		return () => {
			if (!isAborted) {
				isAborted = true;
				reader.abort();
			}
		};
	});
}

export function formatFileSize(bytes: number): string {
	const units = ["B", "KB", "MB", "GB"];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${Math.round(size * 10) / 10} ${units[unitIndex]}`;
}

/**
 * Replaces the file extension of a filename with a new extension
 * @param filename - The original filename
 * @param newExtension - The new extension (with or without leading dot)
 * @returns The filename with the new extension
 *
 * @example
 * replaceExtension("image.gif", ".webp") // "image.webp"
 * replaceExtension("image.gif", "webp") // "image.webp"
 * replaceExtension("file.tar.gz", ".zip") // "file.tar.zip"
 */
export function replaceExtension(
	filename: string,
	newExtension: string,
): string {
	const extension = newExtension.startsWith(".")
		? newExtension
		: `.${newExtension}`;

	// For hidden files (starting with .), check if there's a second dot for extension
	// For regular files, check if there's any dot for extension
	const hasExtension = filename.startsWith(".")
		? /\.\w+\.\w+/.test(filename) // Hidden file needs two dots
		: /\.[^/.]+$/.test(filename); // Regular file needs one dot

	return hasExtension
		? filename.replace(/\.[^/.]+$/, extension)
		: filename + extension;
}
