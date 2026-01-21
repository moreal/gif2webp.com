import { COLORS } from "./colors";

export type DropzoneTextVariant = "default" | "error" | "loading";

export interface DropzoneTextProps extends React.PropsWithChildren {
	variant?: DropzoneTextVariant;
}

export function DropzoneText({
	children,
	variant = "default",
}: DropzoneTextProps) {
	const isError = variant === "error";
	const isLoading = variant === "loading";

	return (
		<p
			style={{
				color: isError ? COLORS.ERROR : isLoading ? COLORS.LOADING : "inherit",
				fontWeight: isError || isLoading ? "bold" : "normal",
				fontSize: "clamp(14px, 4vw, 16px)",
				textAlign: "center",
				margin: "8px",
			}}
		>
			{children}
		</p>
	);
}
