import Vips from "wasm-vips";

export interface ConversionOptions {
	quality?: number; // 0-100
	lossless?: boolean;
	onProgress?: (phase: string) => void;
}

export async function convertImage(
	data: Uint8Array,
	options: ConversionOptions = {},
): Promise<Uint8Array> {
	const { quality = 100, lossless = true, onProgress } = options;

	try {
		onProgress?.("Initializing WASM");
		const vips = await Vips({
			dynamicLibraries: [],
		});

		onProgress?.("Loading image");
		const image = vips.Image.newFromBuffer(data, "[n=-1]");

		onProgress?.("Processing");
		const thumbnail = vips.Image.thumbnailBuffer(data, image.width, {
			height: image.height,
			option_string: "[n=-1]",
		});

		// Preserve animation delays
		const delays = thumbnail.getArrayInt("delay");
		const copied = thumbnail.copy();
		copied.setArrayInt("delay", delays);

		onProgress?.("Encoding WebP");
		const result = copied.writeToBuffer(
			`.webp[Q=${quality},lossless=${lossless ? 1 : 0}]`,
		);

		// Cleanup
		onProgress?.("Cleaning up");
		image.delete();
		thumbnail.delete();
		copied.delete();

		return result;
	} catch (error) {
		throw new Error(
			`Conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}
