export function HeaderContainer({ children }: React.PropsWithChildren) {
	return (
		<header
			style={{
				padding: "0.5rem 10px",
				width: "100%",
				boxSizing: "border-box",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: "clamp(20px, 2vw, 8px)",
			}}
		>
			{children}
		</header>
	);
}
