import { useMemo } from "react";
import { formatFileSize } from "../utils/fileUtils";

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

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "8px",
				margin: "12px 0",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "8px",
				}}
			>
				{isComplete ? (
					<></>
				) : (
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
				)}
				<span style={{ fontSize: "14px" }}>{phase}</span>
			</div>
			<span
				style={{
					fontSize: "12px",
					opacity: 0.7,
				}}
			>
				File size: {formattedSize}
			</span>
		</div>
	);
}

// Add the keyframe animation to the document
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
