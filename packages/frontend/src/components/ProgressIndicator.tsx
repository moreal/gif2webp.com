import { useMemo } from "react";
import { formatFileSize } from "../utils/fileUtils";
import { useLanguage } from "../hooks/useLanguage";

interface ProgressIndicatorProps {
	phase: string;
	fileSize: number;
	isComplete?: boolean;
}

export function ProgressIndicator({
	phase,
	fileSize,
	isComplete,
}: ProgressIndicatorProps) {
	const formattedSize = useMemo(() => formatFileSize(fileSize), [fileSize]);
	const { t } = useLanguage();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "8px",
				margin: "12px 0",
				width: "100%",
				padding: "0 5px",
				boxSizing: "border-box",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "8px",
					flexWrap: "wrap",
				}}
			>
				{!isComplete ? (
					<div
						style={{
							width: "16px",
							height: "16px",
							border: "2px solid currentColor",
							borderRadius: "50%",
							borderRightColor: "transparent",
							animation: "spin 1s linear infinite",
						}}
					/>
				) : (
					<span>✓</span>
				)}
				<span
					style={{
						fontSize: "14px",
						textAlign: "center",
						wordBreak: "keep-all",
					}}
				>
					{phase}
				</span>
			</div>
			<span
				style={{
					fontSize: "12px",
					opacity: 0.7,
					textAlign: "center",
				}}
			>
				{t("conversion.fileSize", { size: formattedSize })}
			</span>
		</div>
	);
}

// Add the keyframe animation to the document
if (!document.getElementById("spin-animation-style")) {
	const style = document.createElement("style");
	style.id = "spin-animation-style";
	style.textContent = `
		@keyframes spin {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}
	`;
	document.head.appendChild(style);
}
