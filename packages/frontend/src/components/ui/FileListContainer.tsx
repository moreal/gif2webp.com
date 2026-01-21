export function FileListContainer({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				marginTop: "2rem",
				display: "flex",
				flexWrap: "wrap",
				gap: "16px",
				justifyContent: "center",
				maxHeight: "100%",
				width: "100%",
				padding: "0 10px",
				boxSizing: "border-box",
			}}
		>
			{children}
		</div>
	);
}
