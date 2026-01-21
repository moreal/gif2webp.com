export function ConverterContainer({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				padding: "16px",
				backgroundColor: "rgba(0, 0, 0, 0.1)",
				borderRadius: "8px",
				display: "flex",
				flexDirection: "column",
				gap: "16px",
				width: "100%",
				boxSizing: "border-box",
			}}
		>
			{children}
		</div>
	);
}
