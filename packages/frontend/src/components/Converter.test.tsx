import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../test/utils";
import { Converter } from "./Converter";
import type { LoadedFile } from "../utils/fileUtils";
import * as useImageConversionModule from "../hooks/useImageConversion";
import userEvent from "@testing-library/user-event";

// Mock the useImageConversion hook
vi.mock("../hooks/useImageConversion");

describe("Converter", () => {
	const mockFile: LoadedFile = {
		file: new File(["test"], "test.gif", { type: "image/gif" }),
		data: new ArrayBuffer(100),
		size: 1024 * 1024, // 1MB
		type: "image/gif",
	};

	const mockUseImageConversion = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		// Set up the default mock implementation
		vi.spyOn(useImageConversionModule, "useImageConversion").mockImplementation(
			mockUseImageConversion,
		);
	});

	describe("idle state", () => {
		it("should render convert button when status is idle", () => {
			mockUseImageConversion.mockReturnValue({
				status: "idle",
				error: null,
				convertedData: null,
				progress: "",
				retry: vi.fn(),
				startConversion: vi.fn(),
			});

			render(<Converter file={mockFile} />);

			expect(
				screen.getByRole("button", { name: /convert/i }),
			).toBeInTheDocument();
		});

		it("should call startConversion when convert button is clicked", async () => {
			const startConversion = vi.fn();
			mockUseImageConversion.mockReturnValue({
				status: "idle",
				error: null,
				convertedData: null,
				progress: "",
				retry: vi.fn(),
				startConversion,
			});

			const user = userEvent.setup();
			render(<Converter file={mockFile} />);

			const button = screen.getByRole("button", { name: /convert/i });
			await user.click(button);

			expect(startConversion).toHaveBeenCalledTimes(1);
		});
	});

	describe("converting state", () => {
		it("should show progress indicator when status is converting", () => {
			mockUseImageConversion.mockReturnValue({
				status: "converting",
				error: null,
				convertedData: null,
				progress: "50%",
				retry: vi.fn(),
				startConversion: vi.fn(),
			});

			render(<Converter file={mockFile} />);

			expect(screen.getByText(/converting/i)).toBeInTheDocument();
			expect(
				screen.queryByRole("button", { name: /convert/i }),
			).not.toBeInTheDocument();
		});
	});

	describe("converted state", () => {
		it("should show download button when conversion is complete", () => {
			mockUseImageConversion.mockReturnValue({
				status: "converted",
				error: null,
				convertedData: new Uint8Array([1, 2, 3]),
				progress: "100%",
				retry: vi.fn(),
				startConversion: vi.fn(),
			});

			render(<Converter file={mockFile} />);

			expect(
				screen.getByRole("button", { name: /download/i }),
			).toBeInTheDocument();
			expect(screen.getByText(/complete/i)).toBeInTheDocument();
		});

		it("should call custom onDownload handler when provided", async () => {
			const onDownload = vi.fn();
			mockUseImageConversion.mockReturnValue({
				status: "converted",
				error: null,
				convertedData: new Uint8Array([1, 2, 3]),
				progress: "100%",
				retry: vi.fn(),
				startConversion: vi.fn(),
			});

			const user = userEvent.setup();
			render(<Converter file={mockFile} onDownload={onDownload} />);

			const button = screen.getByRole("button", { name: /download/i });
			await user.click(button);

			expect(onDownload).toHaveBeenCalledWith(
				expect.any(Uint8Array),
				"test.webp",
			);
		});

		it("should replace file extension correctly", async () => {
			const onDownload = vi.fn();
			const fileWithExtension: LoadedFile = {
				...mockFile,
				file: new File(["test"], "animation.gif", { type: "image/gif" }),
			};

			mockUseImageConversion.mockReturnValue({
				status: "converted",
				error: null,
				convertedData: new Uint8Array([1, 2, 3]),
				progress: "100%",
				retry: vi.fn(),
				startConversion: vi.fn(),
			});

			const user = userEvent.setup();
			render(<Converter file={fileWithExtension} onDownload={onDownload} />);

			const button = screen.getByRole("button", { name: /download/i });
			await user.click(button);

			expect(onDownload).toHaveBeenCalledWith(
				expect.any(Uint8Array),
				"animation.webp",
			);
		});
	});

	describe("error state", () => {
		it("should show error message and retry button when status is error", () => {
			const errorMessage = "Conversion failed";
			mockUseImageConversion.mockReturnValue({
				status: "error",
				error: errorMessage,
				convertedData: null,
				progress: "",
				retry: vi.fn(),
				startConversion: vi.fn(),
			});

			render(<Converter file={mockFile} />);

			expect(screen.getByText(errorMessage)).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: /retry/i }),
			).toBeInTheDocument();
		});

		it("should call retry when retry button is clicked", async () => {
			const retry = vi.fn();
			mockUseImageConversion.mockReturnValue({
				status: "error",
				error: "Error",
				convertedData: null,
				progress: "",
				retry,
				startConversion: vi.fn(),
			});

			const user = userEvent.setup();
			render(<Converter file={mockFile} />);

			const button = screen.getByRole("button", { name: /retry/i });
			await user.click(button);

			expect(retry).toHaveBeenCalledTimes(1);
		});
	});
});
