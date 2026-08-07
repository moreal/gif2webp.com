import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { languageFromPathname } from "./config/i18n";
import "./index.css";

const container = document.getElementById("root")!;
const initialLanguage = languageFromPathname(window.location.pathname);

// Production builds ship prerendered markup inside #root (scripts/prerender.mjs),
// which must be hydrated; in dev the container is empty and rendered from scratch.
if (container.firstChild) {
	hydrateRoot(container, <App initialLanguage={initialLanguage} />);
} else {
	createRoot(container).render(<App initialLanguage={initialLanguage} />);
}
