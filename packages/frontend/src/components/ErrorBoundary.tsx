import type React from "react";
import { Component, type ErrorInfo } from "react"
import { ErrorText } from "./StyledComponents";

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<React.PropsWithChildren, State> {
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
			return (
				<div style={{ padding: "20px", textAlign: "center" }}>
					<ErrorText>
						Something went wrong. Please refresh the page and try again.
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
						Refresh Page
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
