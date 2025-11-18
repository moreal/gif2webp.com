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
		originalSize: 2 * 1024 * 1024, // 2MB original
		convertedSize: 1024 * 1024, // 1MB converted (50% reduction)
	},
};

export const SmallFile: Story = {
	args: {
		originalSize: 1024 * 1024, // 1MB original
		convertedSize: 500 * 1024, // 500KB converted (50% reduction)
	},
};

export const LargeFile: Story = {
	args: {
		originalSize: 100 * 1024 * 1024, // 100MB original
		convertedSize: 50 * 1024 * 1024, // 50MB converted (50% reduction)
	},
};
