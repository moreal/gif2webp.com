export interface DropzoneContainerProps extends React.PropsWithChildren {
	isDragActive?: boolean;
	isFocused?: boolean;
}

export function DropzoneContainer({
	children,
	isDragActive,
	isFocused,
	...props
}: DropzoneContainerProps) {
	return (
		<div
			{...props}
			style={{
				borderColor: "var(--text-primary)",
				borderStyle: "dashed",
				borderSpacing: "8px",
				borderWidth: "5px",
				width: "calc(100% - 32px)",
				maxWidth: "500px",
				minWidth: "250px",
				fontWeight: "bold",
				padding: "16px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "5vh",
				cursor: "pointer",
				transition:
					"transform var(--animation-duration-fast) var(--ease-out-quart), border-color var(--animation-duration-fast) var(--ease-out-quart), box-shadow var(--animation-duration-fast) var(--ease-out-quart), outline var(--animation-duration-fast) var(--ease-out-quart)",
				transform: isDragActive ? "scale(1.01)" : "scale(1)",
				boxShadow: isDragActive ? "0 0 20px rgba(100, 100, 255, 0.3)" : "none",
				outline: isFocused ? "2px solid var(--link-color)" : "none",
				outlineOffset: isFocused ? "2px" : "0",
			}}
		>
			{children}
		</div>
	);
}
