import { forwardRef } from "react";
import { useLanguage } from "../hooks/useLanguage";

export function Container({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
			}}
		>
			{children}
		</div>
	);
}

export function InstructionText({ children }: React.PropsWithChildren) {
	return <p style={{ fontSize: "clamp(16px, 5vw, 20px)" }}>{children}</p>;
}

export function PreviewContainer({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				display: "inline-block",
				position: "relative",
				margin: "0.5rem",
				padding: "8px",
				borderRadius: "4px",
				backgroundColor: "var(--bg-secondary)",
				maxWidth: "100%",
			}}
		>
			{children}
		</div>
	);
}

export const DeleteButton = forwardRef<
	HTMLButtonElement,
	{ onClick: () => void }
>(({ onClick }, ref) => (
	<button
		ref={ref}
		onClick={onClick}
		aria-label="Delete image"
		style={{
			position: "absolute",
			top: "-10px",
			right: "-10px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "30px",
			width: "30px",
			borderRadius: "50%",
			border: "black solid 2px",
			backgroundColor: "white",
			cursor: "pointer",
			color: "black",
			fontWeight: "bold",
			padding: 0,
			fontSize: "14px",
			touchAction: "manipulation",
		}}
	>
		X
	</button>
));

DeleteButton.displayName = "DeleteButton";

export function PreviewImage({
	src,
	alt,
	onError,
}: { src: string; alt?: string; onError?: () => void }) {
	return (
		<img
			src={src}
			alt={alt || "Image preview"}
			onError={onError}
			style={{
				margin: 0,
				width: "100px",
				height: "100px",
				objectFit: "cover",
				borderRadius: "4px",
				maxWidth: "100%",
			}}
			loading="lazy"
		/>
	);
}

export function FileName({ children }: React.PropsWithChildren) {
	return (
		<p
			style={{
				margin: 0,
				fontSize: "14px",
				textAlign: "center",
				color: "var(--text-secondary)",
				wordBreak: "keep-all",
				maxWidth: "100%",
			}}
		>
			{children}
		</p>
	);
}

export function DropzoneContainer({
	children,
	...props
}: React.PropsWithChildren) {
	return (
		<div
			{...props}
			style={{
				borderColor: "var(--text-primary)",
				borderStyle: "dashed",
				borderSpacing: "8px",
				borderWidth: "5px",
				width: "calc(100% - 32px)",
				maxWidth: "500px",
				minWidth: "250px",
				fontWeight: "bold",
				padding: "16px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "5vh",
				cursor: "pointer",
			}}
		>
			{children}
		</div>
	);
}

export function DropzoneText({ children }: React.PropsWithChildren) {
	const text = children?.toString() || "";
	const isError =
		text.startsWith("Failed") || text.includes("Please upload GIF");
	const isLoading = text === "Processing...";

	return (
		<p
			style={{
				color: isError ? "#ff4444" : isLoading ? "#888888" : "inherit",
				fontWeight: isError || isLoading ? "bold" : "normal",
				fontSize: "clamp(14px, 4vw, 16px)",
				textAlign: "center",
				margin: "8px",
			}}
		>
			{children}
		</p>
	);
}

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
			}}
		>
			{children}
		</p>
	);
}

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
			}}
		>
			{children}
		</p>
	);
}

export function HeaderContainer({ children }: React.PropsWithChildren) {
	return (
		<header
			style={{
				padding: "0.5rem 10px",
				width: "100%",
				boxSizing: "border-box",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: "clamp(20px, 2vw, 8px)",
			}}
		>
			{children}
		</header>
	);
}

export function EmphasisText({ children }: React.PropsWithChildren) {
	return (
		<ins style={{ fontWeight: 600 }}>
			<b>{children}</b>
		</ins>
	);
}

export function FileListContainer({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				marginTop: "2rem",
				display: "flex",
				flexWrap: "wrap",
				gap: "16px",
				justifyContent: "center",
				maxHeight: "100%",
				width: "100%",
				padding: "0 10px",
				boxSizing: "border-box",
			}}
		>
			{children}
		</div>
	);
}

export function ErrorText({ children }: React.PropsWithChildren) {
	return (
		<p
			style={{
				margin: 0,
				color: "#ff4444",
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

export const ConversionButton = forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & React.PropsWithChildren
>(({ children, disabled, onClick, ...props }, ref) => (
	<button
		ref={ref}
		disabled={disabled}
		onClick={onClick}
		aria-busy={disabled}
		style={{
			padding: "12px 16px",
			borderRadius: "4px",
			border: "1px solid var(--text-primary)",
			backgroundColor: "transparent",
			color: "var(--text-primary)",
			cursor: disabled ? "default" : "pointer",
			opacity: disabled ? 0.7 : 1,
			transition: "all 0.2s ease",
			fontSize: "16px",
			fontWeight: "500",
			minWidth: "120px",
			touchAction: "manipulation",
		}}
		{...props}
	>
		{children}
	</button>
));

ConversionButton.displayName = "ConversionButton";

export function DownloadLink({
	href,
	download,
	children,
}: {
	href: string;
	download: string;
	children: React.ReactNode;
}) {
	return (
		<a
			href={href}
			download={download}
			style={{
				textDecoration: "none",
				color: "inherit",
				display: "inline-block",
				padding: "5px",
			}}
		>
			{children}
		</a>
	);
}

export function ConversionErrorContainer({
	children,
}: React.PropsWithChildren) {
	return (
		<div
			style={{
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				width: "100%",
			}}
		>
			{children}
		</div>
	);
}

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

export function QualitySlider({
	value,
	onChange,
	disabled,
}: {
	value: number;
	onChange: (value: number) => void;
	disabled?: boolean;
}) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "8px",
				flexWrap: "wrap",
				justifyContent: "center",
			}}
			role="group"
			aria-labelledby="quality-label"
		>
			<label id="quality-label" style={{ fontSize: "14px" }}>
				Quality: {value}
			</label>
			<input
				type="range"
				min="0"
				max="100"
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				disabled={disabled}
				aria-label="Image quality"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={value}
				style={{
					width: "100px",
					opacity: disabled ? 0.5 : 1,
					height: "24px",
				}}
			/>
		</div>
	);
}

export function OptionsContainer({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "16px",
				marginBottom: "12px",
				fontSize: "14px",
				flexWrap: "wrap",
				justifyContent: "center",
				width: "100%",
			}}
		>
			{children}
		</div>
	);
}

export const MAX_SAFE_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export function MemoryWarning({ fileSize }: { fileSize: number }) {
	const { t } = useLanguage();
	if (fileSize <= MAX_SAFE_FILE_SIZE) return null;

	const sizeMB = Math.round(fileSize / 1024 / 1024);
	return (
		<WarningText>{t("conversion.memoryWarning", { size: sizeMB })}</WarningText>
	);
}

export function WarningText({ children }: React.PropsWithChildren) {
	return (
		<p
			style={{
				margin: "8px 0",
				fontSize: "14px",
				color: "#ffcc00",
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
