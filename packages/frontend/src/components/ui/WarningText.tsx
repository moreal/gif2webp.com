import { COLORS } from "./colors";

export function WarningText({ children }: React.PropsWithChildren) {
	return (
		<p
			style={{
				margin: "8px 0",
				fontSize: "14px",
				color: COLORS.WARNING,
				textAlign: "center",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: "4px",
				flexWrap: "wrap",
				wordBreak: "keep-all",
			}}
		>
			{children}
		</p>
	);
}
