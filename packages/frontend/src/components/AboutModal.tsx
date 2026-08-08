import { Dialog } from "@base-ui/react/dialog";
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
			<Dialog.Portal keepMounted>
				<Dialog.Backdrop
					className="modal-backdrop"
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
					className="modal-popup"
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
					}}
				>
					<Dialog.Close
						aria-label={t("common.close")}
						className="modal-close-button"
						style={{
							position: "absolute",
							top: "14px",
							right: "14px",
							background: "none",
							border: "none",
							color: "var(--text-primary)",
							fontSize: "24px",
							cursor: "pointer",
							width: "36px",
							height: "36px",
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
					{/* Renders as a div: it defaults to a <p>, but the content below
					    is itself one <p> per paragraph, and <p> cannot contain <p>
					    (the nested tag would auto-close the outer one, corrupting
					    hydration). */}
					<Dialog.Description render={<div />}>
						{aboutContent.map((paragraph, index) => (
							<p
								key={index}
								style={{
									lineHeight: 1.6,
									color: "var(--text-primary)",
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

export default AboutModal;
