import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/utils";
import { ConversionControls } from "./ConversionControls";
import userEvent from "@testing-library/user-event";

describe("ConversionControls", () => {
	const defaultProps = {
		status: "idle" as const,
		fileSize: 1024 * 1024, // 1MB
		onConvert: vi.fn(),
	};

	it("should render convert button when status is idle", () => {
		render(<ConversionControls {...defaultProps} />);

		const button = screen.getByRole("button", {
			name: /convert/i,
		});
		expect(button).toBeInTheDocument();
	});

	it("should call onConvert when button is clicked", async () => {
		const onConvert = vi.fn();
		const user = userEvent.setup();

		render(<ConversionControls {...defaultProps} onConvert={onConvert} />);

		const button = screen.getByRole("button", {
			name: /convert/i,
		});
		await user.click(button);

		expect(onConvert).toHaveBeenCalledTimes(1);
	});

	it("should show progress indicator when status is converting", () => {
		render(<ConversionControls {...defaultProps} status="converting" />);

		expect(screen.getByText(/converting/i)).toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: /convert/i }),
		).not.toBeInTheDocument();
	});

	it("should not show memory warning for files under 100MB", () => {
		render(
			<ConversionControls {...defaultProps} fileSize={50 * 1024 * 1024} />,
		);

		// Memory warning should not be present
		expect(screen.queryByText(/warning/i)).not.toBeInTheDocument();
	});

	it("should show memory warning for files over 100MB", () => {
		render(
			<ConversionControls {...defaultProps} fileSize={150 * 1024 * 1024} />,
		);

		// Memory warning should be present (checking for size in MB)
		expect(screen.getByText(/150/)).toBeInTheDocument();
	});

	it("should render Korean text when language is ko", () => {
		render(<ConversionControls {...defaultProps} />, { language: "ko" });

		expect(
			screen.getByRole("button", { name: "WebP로 변환" }),
		).toBeInTheDocument();
	});
});
