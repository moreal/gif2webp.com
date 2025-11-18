import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/utils";
import { CompletedConversion } from "./CompletedConversion";
import userEvent from "@testing-library/user-event";

describe("CompletedConversion", () => {
	const defaultProps = {
		originalSize: 2 * 1024 * 1024, // 2MB
		convertedSize: 1024 * 1024, // 1MB
		onDownload: vi.fn(),
	};

	it("should render download button", () => {
		render(<CompletedConversion {...defaultProps} />);

		const button = screen.getByRole("button", {
			name: /download/i,
		});
		expect(button).toBeInTheDocument();
	});

	it("should call onDownload when button is clicked", async () => {
		const onDownload = vi.fn();
		const user = userEvent.setup();

		render(<CompletedConversion {...defaultProps} onDownload={onDownload} />);

		const button = screen.getByRole("button", {
			name: /download/i,
		});
		await user.click(button);

		expect(onDownload).toHaveBeenCalledTimes(1);
	});

	it("should show completion message", () => {
		render(<CompletedConversion {...defaultProps} />);

		expect(screen.getByText(/complete/i)).toBeInTheDocument();
	});

	it("should render Korean text when language is ko", () => {
		render(<CompletedConversion {...defaultProps} />, { language: "ko" });

		expect(screen.getByText("변환 완료")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "WebP 다운로드" }),
		).toBeInTheDocument();
	});
});
