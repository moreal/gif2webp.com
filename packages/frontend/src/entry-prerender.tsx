import { prerender } from "react-dom/static";
import { App } from "./App";
import type { Language } from "./config/i18n";

// Executed once at build time (scripts/prerender.mjs) to embed per-language
// markup into dist/index.html, dist/ko/index.html, etc. Never runs in the
// browser or on a server. Uses react-dom/static's prerender (not
// renderToString) so Suspense boundaries — e.g. the lazy-loaded AboutModal —
// are resolved at build time instead of failing hydration with React
// error #419.
export async function render(language: Language): Promise<string> {
	const { prelude } = await prerender(<App initialLanguage={language} />);

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

// Re-exported so scripts/prerender.mjs can reach build-time metadata through
// the SSR bundle it already imports, without a second entry point.
export {
	LANGUAGE_CODES,
	DEFAULT_LANGUAGE,
	languagePath,
} from "./config/i18n";
export {
	DOCUMENT_META,
	renderHeadLines,
	renderNoscriptLines,
	renderSitemap,
} from "./config/documentMeta";
