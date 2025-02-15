import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Main from "./pages/Main";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<Main />
		</ThemeProvider>
	</StrictMode>,
);
