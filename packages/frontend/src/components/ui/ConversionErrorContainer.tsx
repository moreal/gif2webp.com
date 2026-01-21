export function ConversionErrorContainer({
	children,
}: React.PropsWithChildren) {
	return (
		<div
			style={{
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				width: "100%",
				animation: "shake 0.4s var(--ease-out-quart)",
			}}
		>
			{children}
		</div>
	);
}
