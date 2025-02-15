import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface AboutModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function AboutModal({ isOpen, onClose }: AboutModalProps) {
	if (!isOpen) return null;

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
					aria-label="Close modal"
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
					About gif2webp.com
				</h2>
				<p style={{ lineHeight: 1.6, color: "var(--text-primary)" }}>
					gif2webp.com is a service that{" "}
					<strong>converts GIF to WebP in your browser</strong>. The motivation
					for creating this service came when a certain design portfolio hosting
					service discontinued GIF support and decided to only support WebP, but
					there weren't any suitable conversion tools available. More
					specifically, I couldn't find any implementation that worked directly
					in the browser.
				</p>
				<p style={{ lineHeight: 1.6, color: "var(--text-primary)" }}>
					Recently, I've observed many cases where images provided through
					various services are being used as training data for artificial
					intelligence. This has made me somewhat distrustful of sending images
					to servers. While other converter services mention in their
					descriptions that they delete images after a certain period, it's
					still better not to send them at all if we can avoid it.
				</p>
				<p style={{ lineHeight: 1.6, color: "var(--text-primary)" }}>
					That's why I developed gif2webp.com.{" "}
					<strong>
						This service uses WASM technology to convert GIF to WebP without
						sending images to the server.
					</strong>{" "}
					Really! If you don't trust the deployed code, this service is{" "}
					<strong>open source</strong>, so you can access the source code
					through the link at the bottom and even{" "}
					<strong>host it yourself.</strong>
				</p>
			</div>
		</div>
	);
}

export function Footer() {
	const [isAboutOpen, setIsAboutOpen] = useState(false);

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
				About
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
				Source code
			</a>
			<ThemeToggle />
			<AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
		</footer>
	);
}
