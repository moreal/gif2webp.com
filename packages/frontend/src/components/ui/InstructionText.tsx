export function InstructionText({ children }: React.PropsWithChildren) {
	return <p style={{ fontSize: "clamp(16px, 5vw, 20px)" }}>{children}</p>;
}
