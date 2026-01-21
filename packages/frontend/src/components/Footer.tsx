import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelect } from "./LanguageSelect";
import { useLanguage } from "../hooks/useLanguage";

interface AboutModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function AboutModal({ isOpen, onClose }: AboutModalProps) {
	const { t } = useLanguage();
	const aboutContent = t("footer.aboutContent") as unknown as string[];

	return (
		<Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<Dialog.Portal>
				<Dialog.Backdrop
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.7)",
						zIndex: "var(--z-index-backdrop)",
					}}
				/>
				<Dialog.Popup
					style={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: "var(--bg-primary)",
						color: "var(--text-primary)",
						padding: "1.5rem",
						borderRadius: "8px",
						maxWidth: "90vw",
						width: "600px",
						maxHeight: "90vh",
						overflow: "auto",
						zIndex: "var(--z-index-modal)",
						margin: "10px",
						animation:
							"modalFadeIn var(--animation-duration-normal) var(--ease-out-quart)",
					}}
				>
					<Dialog.Close
						aria-label={t("common.close")}
						style={{
							position: "absolute",
							top: "10px",
							right: "10px",
							background: "none",
							border: "none",
							color: "var(--text-primary)",
							fontSize: "24px",
							cursor: "pointer",
							width: "44px",
							height: "44px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							touchAction: "manipulation",
						}}
					>
						×
					</Dialog.Close>
					<Dialog.Title
						style={{
							marginTop: 0,
							color: "var(--text-primary)",
							fontSize: "clamp(20px, 5vw, 24px)",
						}}
					>
						{t("footer.aboutTitle")}
					</Dialog.Title>
					<Dialog.Description>
						{aboutContent.map((paragraph, index) => (
							<p
								key={index}
								style={{
									lineHeight: 1.6,
									color: "var(--text-primary)",
									wordBreak: "keep-all",
									fontSize: "clamp(14px, 4vw, 16px)",
								}}
							>
								{paragraph}
							</p>
						))}
					</Dialog.Description>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export function Footer() {
	const [isAboutOpen, setIsAboutOpen] = useState(false);
	const { t } = useLanguage();

	return (
		<footer
			style={{
				padding: "1rem 10px",
				borderTop: "1px solid var(--border-color)",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
				gap: "1rem",
				fontSize: "0.9rem",
				marginTop: "auto",
			}}
		>
			<button
				onClick={() => setIsAboutOpen(true)}
				className="footer-link"
				style={{
					background: "none",
					border: "none",
					padding: "8px",
					color: "inherit",
					cursor: "pointer",
					fontSize: "inherit",
					touchAction: "manipulation",
				}}
			>
				{t("footer.about")}
			</button>
			<a
				href="https://github.com/moreal/gif2webp.com"
				target="_blank"
				rel="noopener noreferrer"
				className="footer-link"
				style={{
					color: "inherit",
					textDecoration: "none",
					padding: "8px",
					fontWeight: "400",
				}}
			>
				{t("footer.sourceCode")}
			</a>
			<ThemeToggle />
			<LanguageSelect />
			<AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
		</footer>
	);
}
