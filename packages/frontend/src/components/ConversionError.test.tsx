import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/utils";
import { ConversionError } from "./ConversionError";
import userEvent from "@testing-library/user-event";

describe("ConversionError", () => {
	const defaultProps = {
		error: null,
		onRetry: vi.fn(),
	};

	it("should render retry button", () => {
		render(<ConversionError {...defaultProps} />);

		const button = screen.getByRole("button", {
			name: /retry/i,
		});
		expect(button).toBeInTheDocument();
	});

	it("should call onRetry when button is clicked", async () => {
		const onRetry = vi.fn();
		const user = userEvent.setup();

		render(<ConversionError {...defaultProps} onRetry={onRetry} />);

		const button = screen.getByRole("button", {
			name: /retry/i,
		});
		await user.click(button);

		expect(onRetry).toHaveBeenCalledTimes(1);
	});

	it("should display default error message when error is null", () => {
		render(<ConversionError {...defaultProps} error={null} />);

		expect(screen.getByText("Conversion failed")).toBeInTheDocument();
	});

	it("should display custom error message when provided", () => {
		const customError = "Out of memory error";
		render(<ConversionError {...defaultProps} error={customError} />);

		expect(screen.getByText(customError)).toBeInTheDocument();
	});

	it("should render error text in red color", () => {
		render(<ConversionError {...defaultProps} error="Test error" />);

		const errorText = screen.getByText("Test error");
		expect(errorText).toHaveStyle({ color: "#ff4444" });
	});

	it("should render Korean text when language is ko", () => {
		render(<ConversionError {...defaultProps} />, { language: "ko" });

		expect(screen.getByText("변환 실패")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "다시 시도" }),
		).toBeInTheDocument();
	});
});
