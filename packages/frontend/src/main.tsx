import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

const container = document.getElementById("root")!;

// Production builds ship prerendered markup inside #root (scripts/prerender.mjs),
// which must be hydrated; in dev the container is empty and rendered from scratch.
if (container.firstChild) {
	hydrateRoot(container, <App />);
} else {
	createRoot(container).render(<App />);
}
