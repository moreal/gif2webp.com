import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import {
	MockLanguageProvider,
	MockThemeProvider,
} from "../__mocks__/mockContexts";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
	language?: "en" | "ko";
	theme?: "light" | "dark";
}

/**
 * Custom render function that wraps components with necessary providers
 */
export function renderWithProviders(
	ui: ReactElement,
	options: CustomRenderOptions = {},
) {
	const { language = "en", theme = "light", ...renderOptions } = options;

	function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<MockThemeProvider theme={theme}>
				<MockLanguageProvider language={language}>
					{children}
				</MockLanguageProvider>
			</MockThemeProvider>
		);
	}

	return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from @testing-library/react
export * from "@testing-library/react";
export { renderWithProviders as render };
