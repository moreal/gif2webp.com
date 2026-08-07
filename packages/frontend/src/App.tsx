import { StrictMode } from "react";
import Main from "./pages/Main";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { LanguageProvider } from "./contexts/LanguageProvider";
import type { Language } from "./config/i18n";

// Single app tree shared by the client entry (main.tsx) and the build-time
// prerender entry (entry-prerender.tsx) so both always render the same markup.
// initialLanguage is the language of the URL being served (/ or /ko/).
export function App({ initialLanguage }: { initialLanguage?: Language }) {
	return (
		<StrictMode>
			<ThemeProvider>
				<LanguageProvider initialLanguage={initialLanguage}>
					<Main />
				</LanguageProvider>
			</ThemeProvider>
		</StrictMode>
	);
}
