import { vi } from "vitest";
import type { ConversionStatus } from "../hooks/useImageConversion";

export interface MockImageConversionReturn {
	status: ConversionStatus;
	error: string | null;
	convertedData: Uint8Array | null;
	progress: string;
	retry: () => void;
	startConversion: () => void;
}

/**
 * Create a mock return value for useImageConversion hook
 */
export function createMockImageConversion(
	overrides: Partial<MockImageConversionReturn> = {},
): MockImageConversionReturn {
	return {
		status: "idle",
		error: null,
		convertedData: null,
		progress: "",
		retry: vi.fn(),
		startConversion: vi.fn(),
		...overrides,
	};
}

/**
 * Mock useImageConversion hook for testing
 */
export function mockUseImageConversion(
	returnValue: Partial<MockImageConversionReturn> = {},
) {
	const mockReturn = createMockImageConversion(returnValue);
	vi.mock("../hooks/useImageConversion", () => ({
		useImageConversion: vi.fn(() => mockReturn),
	}));
	return mockReturn;
}
