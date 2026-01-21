export function Container({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
			}}
		>
			{children}
		</div>
	);
}
