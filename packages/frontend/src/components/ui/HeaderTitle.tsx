export function HeaderTitle({ children }: React.PropsWithChildren) {
	return (
		<p
			style={{
				fontWeight: 300,
				fontSize: "clamp(28px, 7vw, 48px)",
				marginBottom: 0,
				textUnderlineOffset: "6px",
				textAlign: "center",
				lineHeight: 1.2,
				wordBreak: "keep-all",
				textWrap: "balance",
			}}
		>
			{children}
		</p>
	);
}
