export function FileName({ children }: React.PropsWithChildren) {
	return (
		<p
			style={{
				margin: 0,
				fontSize: "14px",
				textAlign: "center",
				color: "var(--text-secondary)",
				wordBreak: "keep-all",
				maxWidth: "100%",
			}}
		>
			{children}
		</p>
	);
}
