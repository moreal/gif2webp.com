import { forwardRef } from "react";
import { Button } from "@base-ui/react/button";

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
