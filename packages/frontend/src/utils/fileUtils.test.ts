import { describe, it, expect } from "vitest";
import { formatFileSize, replaceExtension } from "./fileUtils";

describe("fileUtils", () => {
	describe("formatFileSize", () => {
		it("should format bytes correctly", () => {
			expect(formatFileSize(0)).toBe("0 B");
			expect(formatFileSize(500)).toBe("500 B");
			expect(formatFileSize(1023)).toBe("1023 B");
		});

		it("should format kilobytes correctly", () => {
			expect(formatFileSize(1024)).toBe("1 KB");
			expect(formatFileSize(1536)).toBe("1.5 KB");
			expect(formatFileSize(10240)).toBe("10 KB");
		});

		it("should format megabytes correctly", () => {
			expect(formatFileSize(1024 * 1024)).toBe("1 MB");
			expect(formatFileSize(1.5 * 1024 * 1024)).toBe("1.5 MB");
			expect(formatFileSize(10 * 1024 * 1024)).toBe("10 MB");
		});

		it("should format gigabytes correctly", () => {
			expect(formatFileSize(1024 * 1024 * 1024)).toBe("1 GB");
			expect(formatFileSize(2.5 * 1024 * 1024 * 1024)).toBe("2.5 GB");
		});

		it("should round to one decimal place", () => {
			expect(formatFileSize(1536)).toBe("1.5 KB");
			expect(formatFileSize(1638)).toBe("1.6 KB");
		});
	});

	describe("replaceExtension", () => {
		it("should replace simple file extension", () => {
			expect(replaceExtension("image.gif", ".webp")).toBe("image.webp");
			expect(replaceExtension("photo.jpg", ".png")).toBe("photo.png");
		});

		it("should work with extension without leading dot", () => {
			expect(replaceExtension("image.gif", "webp")).toBe("image.webp");
			expect(replaceExtension("photo.jpg", "png")).toBe("photo.png");
		});

		it("should replace only the last extension", () => {
			expect(replaceExtension("file.tar.gz", ".zip")).toBe("file.tar.zip");
			expect(replaceExtension("archive.tar.bz2", ".7z")).toBe("archive.tar.7z");
		});

		it("should handle filenames with dots in the name", () => {
			expect(replaceExtension("my.special.file.gif", ".webp")).toBe(
				"my.special.file.webp",
			);
		});

		it("should handle filenames with no extension", () => {
			expect(replaceExtension("filename", ".webp")).toBe("filename.webp");
		});

		it("should handle hidden files (starting with dot)", () => {
			expect(replaceExtension(".gitignore", ".txt")).toBe(".gitignore.txt");
		});

		it("should handle various image formats", () => {
			expect(replaceExtension("animated.gif", ".webp")).toBe("animated.webp");
			expect(replaceExtension("photo.jpeg", ".webp")).toBe("photo.webp");
			expect(replaceExtension("logo.png", ".webp")).toBe("logo.webp");
		});
	});
});
