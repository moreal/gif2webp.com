import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useImageConversion } from "./useImageConversion";

// Capture worker instances created during tests
let workerInstances: Array<{
	postMessage: ReturnType<typeof vi.fn>;
	terminate: ReturnType<typeof vi.fn>;
	onmessage: ((event: MessageEvent) => void) | null;
	onerror: ((event: ErrorEvent) => void) | null;
	addEventListener: ReturnType<typeof vi.fn>;
	removeEventListener: ReturnType<typeof vi.fn>;
}>;

beforeEach(() => {
	workerInstances = [];
	vi.mocked(global.Worker).mockImplementation(function () {
		const instance = {
			postMessage: vi.fn(),
			terminate: vi.fn(),
			onmessage: null as ((event: MessageEvent) => void) | null,
			onerror: null as ((event: ErrorEvent) => void) | null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		};
		workerInstances.push(instance);
		return instance;
	} as unknown as new (
		scriptURL: string | URL,
		options?: WorkerOptions,
	) => Worker);
});

describe("useImageConversion", () => {
	const fileData = new Uint8Array([0x47, 0x49, 0x46, 0x38]); // GIF magic bytes

	it("should auto-convert on mount and reach converted status on success", async () => {
		const { result } = renderHook(() => useImageConversion(fileData));

		// Worker should have been created and postMessage called
		expect(workerInstances).toHaveLength(1);
		expect(workerInstances[0].postMessage).toHaveBeenCalledWith(fileData);
		expect(result.current.status).toBe("converting");

		// Simulate worker success response
		const converted = new Uint8Array([0x52, 0x49, 0x46, 0x46]); // RIFF header
		await act(async () => {
			workerInstances[0].onmessage?.({
				data: { type: "success", data: converted },
			} as MessageEvent);
		});

		expect(result.current.status).toBe("converted");
		expect(result.current.convertedData).toBe(converted);
		expect(result.current.convertedSize).toBe(converted.byteLength);
	});

	it("should set error status when worker sends error message", async () => {
		const { result } = renderHook(() => useImageConversion(fileData));

		await act(async () => {
			workerInstances[0].onmessage?.({
				data: { type: "error", error: "Conversion failed" },
			} as MessageEvent);
		});

		expect(result.current.status).toBe("error");
		expect(result.current.error).toBe("Conversion failed");
	});

	it("should set error status when worker.onerror fires", async () => {
		const { result } = renderHook(() => useImageConversion(fileData));

		await act(async () => {
			workerInstances[0].onerror?.({
				message: "Worker script failed to load",
			} as ErrorEvent);
		});

		expect(result.current.status).toBe("error");
		expect(result.current.error).toBeTruthy();
	});

	it("should complete conversion after StrictMode cleanup/remount cycle", async () => {
		// Simulate StrictMode: mount → unmount → remount
		const { unmount } = renderHook(() => useImageConversion(fileData));

		// First mount: worker created, postMessage called
		expect(workerInstances).toHaveLength(1);
		expect(workerInstances[0].postMessage).toHaveBeenCalledWith(fileData);

		// StrictMode cleanup
		unmount();
		expect(workerInstances[0].terminate).toHaveBeenCalled();

		// Remount (simulates StrictMode second mount)
		const { result: result2 } = renderHook(() => useImageConversion(fileData));

		// A new worker should be created (not reusing terminated one)
		expect(workerInstances.length).toBeGreaterThanOrEqual(2);
		const latestWorker = workerInstances[workerInstances.length - 1];
		expect(latestWorker.postMessage).toHaveBeenCalledWith(fileData);

		// Simulate success on the new worker
		const converted = new Uint8Array([0x52, 0x49, 0x46, 0x46]);
		await act(async () => {
			latestWorker.onmessage?.({
				data: { type: "success", data: converted },
			} as MessageEvent);
		});

		expect(result2.current.status).toBe("converted");
		expect(result2.current.convertedData).toBe(converted);
	});

	it("should update progress when worker sends progress message", async () => {
		const { result } = renderHook(() => useImageConversion(fileData));

		await act(async () => {
			workerInstances[0].onmessage?.({
				data: { type: "progress", data: "Loading image" },
			} as MessageEvent);
		});

		expect(result.current.progress).toBe("Loading image");
	});

	it("should retry conversion when retry is called", async () => {
		const { result } = renderHook(() => useImageConversion(fileData));

		// Simulate error
		await act(async () => {
			workerInstances[0].onmessage?.({
				data: { type: "error", error: "Failed" },
			} as MessageEvent);
		});
		expect(result.current.status).toBe("error");

		// Retry should reset to idle, which triggers auto-convert
		await act(async () => {
			result.current.retry();
		});

		// After retry, the hook should have re-triggered conversion
		expect(result.current.status).toBe("converting");
	});
});
