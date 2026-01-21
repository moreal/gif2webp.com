export function EmphasisText({ children }: React.PropsWithChildren) {
	return (
		<ins style={{ fontWeight: 600 }}>
			<b>{children}</b>
		</ins>
	);
}
