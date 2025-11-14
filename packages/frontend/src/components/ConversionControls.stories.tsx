import type { Meta, StoryObj } from "@storybook/react";
import { ConversionControls } from "./ConversionControls";

const meta = {
	title: "Components/ConversionControls",
	component: ConversionControls,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		onConvert: () => console.log("Convert clicked"),
	},
} satisfies Meta<typeof ConversionControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
	args: {
		status: "idle",
		fileSize: 1024 * 1024, // 1MB
	},
};

export const Converting: Story = {
	args: {
		status: "converting",
		fileSize: 1024 * 1024, // 1MB
	},
};

export const SmallFile: Story = {
	args: {
		status: "idle",
		fileSize: 500 * 1024, // 500KB
	},
};

export const LargeFile: Story = {
	args: {
		status: "idle",
		fileSize: 150 * 1024 * 1024, // 150MB - shows memory warning
	},
};

export const ConvertingLargeFile: Story = {
	args: {
		status: "converting",
		fileSize: 150 * 1024 * 1024, // 150MB
	},
};
