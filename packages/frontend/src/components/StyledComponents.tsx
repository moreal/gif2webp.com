import { forwardRef } from "react";
import { Button } from "@base-ui/react/button";
import { useLanguage } from "../hooks/useLanguage";
import { config } from "../config/conversion";

// Semantic color constants
const COLORS = {
	ERROR: "#ff4444",
	WARNING: "#ffcc00",
	LOADING: "#888888",
} as const;

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
				animation:
					"fadeScaleIn var(--animation-duration-normal) var(--ease-out-quart)",
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
	<Button
		ref={ref}
		onClick={onClick}
		aria-label="Delete image"
		className="delete-button"
		style={{
			position: "absolute",
			top: "-6px",
			right: "-6px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "36px",
			width: "36px",
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
	</Button>
));

DeleteButton.displayName = "DeleteButton";

export function PreviewImage({
	src,
	alt,
	onError,
}: {
	src: string;
	alt?: string;
	onError?: () => void;
}) {
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

export interface DropzoneContainerProps extends React.PropsWithChildren {
	isDragActive?: boolean;
	isFocused?: boolean;
}

export function DropzoneContainer({
	children,
	isDragActive,
	isFocused,
	...props
}: DropzoneContainerProps) {
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
				transition:
					"transform var(--animation-duration-fast) var(--ease-out-quart), border-color var(--animation-duration-fast) var(--ease-out-quart), box-shadow var(--animation-duration-fast) var(--ease-out-quart), outline var(--animation-duration-fast) var(--ease-out-quart)",
				transform: isDragActive ? "scale(1.01)" : "scale(1)",
				boxShadow: isDragActive ? "0 0 20px rgba(100, 100, 255, 0.3)" : "none",
				outline: isFocused ? "2px solid var(--link-color)" : "none",
				outlineOffset: isFocused ? "2px" : "0",
			}}
		>
			{children}
		</div>
	);
}

export type DropzoneTextVariant = "default" | "error" | "loading";

export interface DropzoneTextProps extends React.PropsWithChildren {
	variant?: DropzoneTextVariant;
}

export function DropzoneText({
	children,
	variant = "default",
}: DropzoneTextProps) {
	const isError = variant === "error";
	const isLoading = variant === "loading";

	return (
		<p
			style={{
				color: isError ? COLORS.ERROR : isLoading ? COLORS.LOADING : "inherit",
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
				textWrap: "balance",
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

export const ConversionButton = forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & React.PropsWithChildren
>(({ children, disabled, onClick, ...props }, ref) => (
	<Button
		ref={ref}
		disabled={disabled}
		onClick={onClick}
		aria-busy={disabled}
		className={disabled ? undefined : "conversion-button"}
		style={{
			padding: "12px 16px",
			borderRadius: "4px",
			border: "1px solid var(--text-primary)",
			backgroundColor: "transparent",
			color: "var(--text-primary)",
			cursor: disabled ? "default" : "pointer",
			opacity: disabled ? 0.7 : 1,
			fontSize: "16px",
			fontWeight: "500",
			minWidth: "120px",
			touchAction: "manipulation",
		}}
		{...props}
	>
		{children}
	</Button>
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
				animation: "shake 0.4s var(--ease-out-quart)",
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

export function MemoryWarning({ fileSize }: { fileSize: number }) {
	const { t } = useLanguage();
	if (fileSize <= config.MAX_SAFE_FILE_SIZE) return null;

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

export function ConverterContainer({ children }: React.PropsWithChildren) {
	return (
		<div
			style={{
				padding: "16px",
				backgroundColor: "rgba(0, 0, 0, 0.1)",
				borderRadius: "8px",
				display: "flex",
				flexDirection: "column",
				gap: "16px",
				width: "100%",
				boxSizing: "border-box",
			}}
		>
			{children}
		</div>
	);
}
