import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { downloadBlob, downloadWebP } from "./downloadUtils";

describe("downloadUtils", () => {
	let mockAnchor: HTMLAnchorElement;
	let createElementSpy: ReturnType<typeof vi.spyOn>;
	let appendChildSpy: ReturnType<typeof vi.spyOn>;
	let removeChildSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		// Create a mock anchor element
		mockAnchor = {
			href: "",
			download: "",
			click: vi.fn(),
			parentNode: null,
			parentElement: null,
		} as unknown as HTMLAnchorElement;

		// Spy on document methods
		createElementSpy = vi
			.spyOn(document, "createElement")
			.mockReturnValue(mockAnchor);
		appendChildSpy = vi
			.spyOn(document.body, "appendChild")
			.mockReturnValue(mockAnchor);
		removeChildSpy = vi
			.spyOn(document.body, "removeChild")
			.mockReturnValue(mockAnchor);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("downloadBlob", () => {
		it("should create an anchor element with correct attributes", () => {
			const blob = new Blob(["test content"], { type: "text/plain" });
			const filename = "test.txt";

			downloadBlob(blob, filename);

			expect(createElementSpy).toHaveBeenCalledWith("a");
			expect(mockAnchor.download).toBe(filename);
			expect(mockAnchor.href).toBe("mock-object-url");
		});

		it("should append and remove anchor element from DOM", () => {
			const blob = new Blob(["test content"], { type: "text/plain" });
			const filename = "test.txt";

			downloadBlob(blob, filename);

			expect(appendChildSpy).toHaveBeenCalledWith(mockAnchor);
			expect(mockAnchor.click).toHaveBeenCalled();
			expect(removeChildSpy).toHaveBeenCalledWith(mockAnchor);
		});

		it("should create and revoke object URL", () => {
			const blob = new Blob(["test content"], { type: "text/plain" });
			const filename = "test.txt";
			const createObjectURLSpy = vi.spyOn(URL, "createObjectURL");
			const revokeObjectURLSpy = vi.spyOn(URL, "revokeObjectURL");

			downloadBlob(blob, filename);

			expect(createObjectURLSpy).toHaveBeenCalledWith(blob);
			expect(revokeObjectURLSpy).toHaveBeenCalledWith("mock-object-url");
		});
	});

	describe("downloadWebP", () => {
		it("should create a WebP blob and download it", () => {
			const data = new Uint8Array([1, 2, 3, 4]);
			const filename = "image.webp";

			downloadWebP(data, filename);

			expect(createElementSpy).toHaveBeenCalledWith("a");
			expect(mockAnchor.download).toBe(filename);
			expect(mockAnchor.href).toBe("mock-object-url");
		});
	});
});
