import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Clean up after each test
afterEach(() => {
	cleanup();
});

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = vi.fn(() => "mock-object-url");
global.URL.revokeObjectURL = vi.fn();

// Mock Worker constructor
global.Worker = vi.fn().mockImplementation(() => ({
	postMessage: vi.fn(),
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	terminate: vi.fn(),
	onmessage: null,
	onerror: null,
})) as unknown as typeof Worker;
