import { useState, useCallback, useEffect, useRef } from "react";

export type ConversionStatus = "idle" | "converting" | "converted" | "error";

interface ConversionState {
	status: ConversionStatus;
	error: string | null;
	convertedData: Uint8Array | null;
	convertedSize: number;
	progress: string;
}

export function useImageConversion(fileData: Uint8Array) {
	const [state, setState] = useState<ConversionState>({
		status: "idle",
		error: null,
		convertedData: null,
		convertedSize: 0,
		progress: "",
	});

	const workerRef = useRef<Worker | null>(null);

	// Create worker inside useEffect so cleanup properly handles StrictMode double-mount
	useEffect(() => {
		const worker = new Worker(
			new URL("../workers/conversion.worker.ts", import.meta.url),
			{ type: "module" },
		);
		worker.onmessage = (event) => {
			const { type, data, error } = event.data;

			if (type === "success") {
				setState((prev) => ({
					...prev,
					progress: "Conversion complete",
					convertedData: data,
					convertedSize: data.byteLength,
					status: "converted",
				}));
			} else if (type === "error") {
				setState((prev) => ({
					...prev,
					error: error,
					status: "error",
				}));
			} else if (type === "progress") {
				setState((prev) => ({ ...prev, progress: data }));
			}
		};
		worker.onerror = (error) => {
			console.error("[Conversion] Worker error:", error);
			setState((prev) => ({
				...prev,
				error: "Worker failed to load",
				status: "error",
			}));
		};
		workerRef.current = worker;

		return () => {
			worker.terminate();
			workerRef.current = null;
		};
	}, []);

	const convert = useCallback(() => {
		if (!workerRef.current) return;

		setState((prev) => ({
			...prev,
			status: "converting",
			error: null,
			progress: "Converting...",
		}));

		workerRef.current.postMessage(fileData);
	}, [fileData]);

	useEffect(() => {
		if (state.status === "idle") {
			convert();
		}
	}, [state.status, convert]);

	const retry = useCallback(() => {
		setState((prev) => ({
			...prev,
			status: "idle",
			convertedData: null,
			convertedSize: 0,
		}));
	}, []);

	const startConversion = useCallback(() => {
		convert();
	}, [convert]);

	return {
		...state,
		retry,
		startConversion,
	};
}
