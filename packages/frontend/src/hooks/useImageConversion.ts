import { convertImage } from "@gif2webp/image-converter";
import { useState, useCallback, useEffect } from "react";

export type ConversionStatus = "idle" | "converting" | "converted" | "error";

interface ConversionState {
	status: ConversionStatus;
	error: string | null;
	convertedData: Uint8Array | null;
	progress: string;
}

export function useImageConversion(fileData: Uint8Array) {
	const [state, setState] = useState<ConversionState>({
		status: "idle",
		error: null,
		convertedData: null,
		progress: "",
	});

	const convert = useCallback(async () => {
		try {
			setState((prev) => ({
				...prev,
				status: "converting",
				error: null,
				progress: "Converting...",
			}));

			const converted = await convertImage(fileData);

			if (!converted) {
				throw new Error("Conversion failed");
			}

			setState((prev) => ({
				...prev,
				progress: "Conversion complete",
				convertedData: converted,
				status: "converted",
			}));
		} catch (err) {
			setState((prev) => ({
				...prev,
				error: err instanceof Error ? err.message : "Failed to convert image",
				status: "error",
			}));
		}
	}, [fileData]);

	useEffect(() => {
		if (state.status === "idle") {
			convert();
		}
	}, [state.status, convert]);

	const retry = useCallback(() => {
		setState((prev) => ({ ...prev, status: "idle", convertedData: null }));
	}, []);

	const startConversion = useCallback(() => {
		setState((prev) => ({ ...prev, status: "converting" }));
	}, []);

	return {
		...state,
		retry,
		startConversion,
	};
}
