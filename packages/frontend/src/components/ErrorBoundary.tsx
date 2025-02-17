import type React from "react";
import { Component, type ErrorInfo } from "react";
import { ErrorText } from "./StyledComponents";
import { type Language } from "../config/i18n";
import { getTranslation } from "../config/translations";

interface State {
	hasError: boolean;
	error?: Error;
}

interface Props extends React.PropsWithChildren {
	language?: Language;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Error caught by boundary:", error);
		console.error("Component stack:", errorInfo.componentStack);
	}

	render() {
		if (this.state.hasError) {
			// Using getTranslation directly since we can't use hooks in class components
			const lang = this.props.language || "en";
			return (
				<div style={{ padding: "20px", textAlign: "center" }}>
					<ErrorText>
						{getTranslation(lang, "errors.general", undefined)}
					</ErrorText>
					<button
						onClick={() => {
							this.setState({ hasError: false, error: undefined });
							window.location.reload();
						}}
						style={{
							marginTop: "10px",
							padding: "8px 16px",
							borderRadius: "4px",
							backgroundColor: "transparent",
							border: "1px solid white",
							color: "white",
							cursor: "pointer",
						}}
					>
						{getTranslation(lang, "errors.refresh", undefined)}
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
