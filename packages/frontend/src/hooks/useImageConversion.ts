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

	const ensureWorker = useCallback(() => {
		if (workerRef.current) return workerRef.current;
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
			}
		};
		workerRef.current = worker;
		return worker;
	}, []);

	useEffect(() => {
		return () => {
			workerRef.current?.terminate();
		};
	}, []);

	const convert = useCallback(() => {
		const worker = ensureWorker();

		setState((prev) => ({
			...prev,
			status: "converting",
			error: null,
			progress: "Converting...",
		}));

		worker.postMessage(fileData);
	}, [fileData, ensureWorker]);

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
		setState((prev) => ({ ...prev, status: "converting" }));
	}, []);

	return {
		...state,
		retry,
		startConversion,
	};
}
