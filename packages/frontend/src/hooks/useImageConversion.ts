import { useState, useCallback, useEffect, useRef } from "react";

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

	const workerRef = useRef<Worker | null>(null);

	useEffect(() => {
		// Create worker instance
		workerRef.current = new Worker(
			new URL("../workers/conversion.worker.ts", import.meta.url),
			{ type: "module" },
		);

		// Set up worker message handling
		workerRef.current.onmessage = (event) => {
			const { type, data, error } = event.data;

			if (type === "success") {
				setState((prev) => ({
					...prev,
					progress: "Conversion complete",
					convertedData: data,
					status: "converted",
				}));
			} else if (type === "error") {
				setState((prev) => ({
					...prev,
					error: error,
					status: "error",
				}));
			}
		};

		return () => {
			workerRef.current?.terminate();
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
