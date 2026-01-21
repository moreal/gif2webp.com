export function OptionsContainer({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "16px",
				marginBottom: "12px",
				fontSize: "14px",
				flexWrap: "wrap",
				justifyContent: "center",
				width: "100%",
			}}
		>
			{children}
		</div>
	);
}
