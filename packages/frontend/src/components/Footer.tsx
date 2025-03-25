import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelect } from "./LanguageSelect";
import { useLanguage } from "../contexts/LanguageContext";

interface AboutModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function AboutModal({ isOpen, onClose }: AboutModalProps) {
	const { t } = useLanguage();

	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow;
		document.body.style.overflow = "hidden";

		// Focus the modal when it opens
		modalRef.current?.focus();

		return () => {
			document.body.style.overflow = originalStyle;
		};
	}, []);

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [onClose]);

	if (!isOpen) return null;

	const aboutContent = t("footer.aboutContent") as unknown as string[];

	return (
		<div
			onClick={handleOverlayClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			ref={modalRef}
			tabIndex={-1}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.7)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 1000,
				outline: "none", // Remove focus outline on the overlay
			}}
		>
			<div
				style={{
					backgroundColor: "var(--bg-primary)",
					color: "var(--text-primary)",
					padding: "2rem",
					borderRadius: "8px",
					maxWidth: "900px",
					position: "relative",
					margin: "20px",
				}}
			>
				<button
					onClick={onClose}
					aria-label={t("common.close")}
					style={{
						position: "absolute",
						top: "10px",
						right: "10px",
						background: "none",
						border: "none",
						color: "var(--text-primary)",
						fontSize: "20px",
						cursor: "pointer",
					}}
				>
					×
				</button>
				<h2
					id="modal-title"
					style={{ marginTop: 0, color: "var(--text-primary)" }}
				>
					{t("footer.aboutTitle")}
				</h2>
				{aboutContent.map((paragraph, index) => (
					<p
						key={index}
						style={{
							lineHeight: 1.6,
							color: "var(--text-primary)",
							wordBreak: "keep-all",
						}}
					>
						{paragraph}
					</p>
				))}
			</div>
		</div>
	);
}

export function Footer() {
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const { t } = useLanguage();

	return (
		<footer
			style={{
				padding: "1rem 0",
				borderTop: "1px solid var(--border-color)",
				display: "flex",
				justifyContent: "center",
				gap: "2rem",
				fontSize: "0.9rem",
				marginTop: "auto",
			}}
		>
			<button
				onClick={() => setIsAboutOpen(true)}
				style={{
					background: "none",
					border: "none",
					padding: 0,
					color: "inherit",
					cursor: "pointer",
					opacity: 0.8,
					fontSize: "inherit",
					transition: "opacity 0.2s",
				}}
				onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
				onMouseOut={(e) => (e.currentTarget.style.opacity = "0.8")}
			>
				{t("footer.about")}
			</button>
			<a
				href="https://github.com/moreal/gif2webp.com"
				target="_blank"
				rel="noopener noreferrer"
				style={{
					color: "inherit",
					textDecoration: "none",
					opacity: 0.8,
					transition: "opacity 0.2s",
				}}
				onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
				onMouseOut={(e) => (e.currentTarget.style.opacity = "0.8")}
			>
				{t("footer.sourceCode")}
			</a>
			<ThemeToggle />
			<LanguageSelect />
			<AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
		</footer>
	);
}
