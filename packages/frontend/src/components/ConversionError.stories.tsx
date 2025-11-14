import type { Meta, StoryObj } from "@storybook/react";
import { ConversionError } from "./ConversionError";

const meta = {
	title: "Components/ConversionError",
	component: ConversionError,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		onRetry: () => console.log("Retry clicked"),
	},
} satisfies Meta<typeof ConversionError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultError: Story = {
	args: {
		error: null,
	},
};

export const CustomError: Story = {
	args: {
		error: "Failed to convert image: Out of memory",
	},
};

export const NetworkError: Story = {
	args: {
		error: "Network error: Unable to load conversion module",
	},
};

export const FileFormatError: Story = {
	args: {
		error: "Invalid file format: Only GIF files are supported",
	},
};

export const LongErrorMessage: Story = {
	args: {
		error:
			"An unexpected error occurred during the conversion process. Please try again with a smaller file or contact support if the problem persists.",
	},
};
