import { renderToString } from "react-dom/server";
import { App } from "./App";

// Executed once at build time (scripts/prerender.mjs) to embed the initial
// markup into dist/index.html. Never runs in the browser or on a server.
export function render(): string {
	return renderToString(<App />);
}
