import { StrictMode } from "react";
import Main from "./pages/Main";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { LanguageProvider } from "./contexts/LanguageProvider";

// Single app tree shared by the client entry (main.tsx) and the build-time
// prerender entry (entry-prerender.tsx) so both always render the same markup.
export function App() {
	return (
		<StrictMode>
			<ThemeProvider>
				<LanguageProvider>
					<Main />
				</LanguageProvider>
			</ThemeProvider>
		</StrictMode>
	);
}
