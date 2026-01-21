export function ProgressText({ children }: React.PropsWithChildren) {
	return (
		<p
			style={{
				margin: "8px 0",
				fontSize: "14px",
				color: "var(--text-secondary)",
				textAlign: "center",
			}}
		>
			{children}
		</p>
	);
}
