import { prerender } from "react-dom/static";
import { App } from "./App";

// Executed once at build time (scripts/prerender.mjs) to embed the initial
// markup into dist/index.html. Never runs in the browser or on a server.
// Uses react-dom/static's prerender (not renderToString) so Suspense
// boundaries — e.g. the lazy-loaded AboutModal — are resolved at build time
// instead of failing hydration with React error #419.
export async function render(): Promise<string> {
	const { prelude } = await prerender(<App />);

	const reader = prelude.getReader();
	const decoder = new TextDecoder();
	let html = "";
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		html += decoder.decode(value, { stream: true });
	}
	return html;
}
