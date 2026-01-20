import { useMemo } from "react";
import { formatFileSize } from "../utils/fileUtils";
import { useLanguage } from "../hooks/useLanguage";

interface ProgressIndicatorProps {
	phase: string;
	fileSize?: number;
	originalSize?: number;
	convertedSize?: number;
	isComplete?: boolean;
}

export function ProgressIndicator({
	phase,
	fileSize,
	originalSize,
	convertedSize,
	isComplete,
}: ProgressIndicatorProps) {
	const { t } = useLanguage();

	// Determine which display mode to use
	const showComparison =
		originalSize !== undefined && convertedSize !== undefined;

	const sizeDisplay = useMemo(() => {
		if (showComparison) {
			// Show size comparison with reduction percentage
			const formattedOriginal = formatFileSize(originalSize);
			const formattedConverted = formatFileSize(convertedSize);
			const reductionPercentage = Math.round(
				((originalSize - convertedSize) / originalSize) * 100,
			);

			return t("conversion.sizeComparison", {
				original: formattedOriginal,
				converted: formattedConverted,
				percentage: reductionPercentage,
			});
		}
		// Fallback to single file size display
		const formattedSize = formatFileSize(fileSize ?? 0);
		return t("conversion.fileSize", { size: formattedSize });
	}, [showComparison, originalSize, convertedSize, fileSize, t]);

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
					<span
						style={{
							display: "inline-block",
							animation:
								"pop var(--animation-duration-normal) var(--ease-out-quart)",
						}}
					>
						✓
					</span>
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
				{sizeDisplay}
			</span>
		</div>
	);
}
