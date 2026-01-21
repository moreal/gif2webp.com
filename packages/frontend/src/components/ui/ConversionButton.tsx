import { forwardRef } from "react";
import { Button } from "@base-ui/react/button";

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
			cursor: disabled ? "not-allowed" : "pointer",
			opacity: disabled ? 0.5 : 1,
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
