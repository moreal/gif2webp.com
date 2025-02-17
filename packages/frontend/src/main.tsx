import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Main from "./pages/Main";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<LanguageProvider>
				<Main />
			</LanguageProvider>
		</ThemeProvider>
	</StrictMode>,
);
