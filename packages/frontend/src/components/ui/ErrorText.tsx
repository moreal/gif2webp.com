import { COLORS } from "./colors";

export function ErrorText({ children }: React.PropsWithChildren) {
	return (
		<p
			style={{
				margin: 0,
				color: COLORS.ERROR,
				fontSize: "14px",
				textAlign: "center",
				padding: "8px",
				wordBreak: "keep-all",
			}}
		>
			{children}
		</p>
	);
}
