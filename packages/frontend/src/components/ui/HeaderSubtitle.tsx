export function HeaderSubtitle({ children }: React.PropsWithChildren) {
	return (
		<p
			style={{
				fontWeight: 200,
				fontSize: "clamp(16px, 5vw, 20px)",
				marginTop: 0,
				textAlign: "center",
				padding: "0 10px",
				wordBreak: "keep-all",
				lineHeight: 1.4,
				textWrap: "balance",
			}}
		>
			{children}
		</p>
	);
}
