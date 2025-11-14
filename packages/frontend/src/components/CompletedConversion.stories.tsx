import type { Meta, StoryObj } from "@storybook/react";
import { CompletedConversion } from "./CompletedConversion";

const meta = {
	title: "Components/CompletedConversion",
	component: CompletedConversion,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		onDownload: () => console.log("Download clicked"),
	},
} satisfies Meta<typeof CompletedConversion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		fileSize: 1024 * 1024, // 1MB
	},
};

export const SmallFile: Story = {
	args: {
		fileSize: 500 * 1024, // 500KB
	},
};

export const LargeFile: Story = {
	args: {
		fileSize: 50 * 1024 * 1024, // 50MB
	},
};
