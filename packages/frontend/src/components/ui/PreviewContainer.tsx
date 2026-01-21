export function PreviewContainer({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				display: "inline-block",
				position: "relative",
				margin: "0.5rem",
				padding: "8px",
				borderRadius: "4px",
				backgroundColor: "var(--bg-secondary)",
				maxWidth: "100%",
				animation:
					"fadeScaleIn var(--animation-duration-normal) var(--ease-out-quart)",
			}}
		>
			{children}
		</div>
	);
}
