import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { Header } from "./Header";
import { MockLanguageProvider } from "../__mocks__/mockContexts";

// Regression test for a bug where the space between the plain title and the
// emphasized segment (`<EmphasisText>`) was contributed by a bare `{" "}`
// JSX expression. That renders two adjacent text children, so React's SSR
// output (what prerender.mjs and hydrateRoot both rely on) separates them
// with an empty `<!-- -->` hydration comment: `WebP<!-- --> <ins>`. On the
// deployed site the browser did not paint that isolated whitespace-only text
// node, so the visible gap disappeared even though it was present in the
// DOM. Folding the space into the title string collapses it into a single
// text child, which avoids the comment entirely.
//
// This must use `renderToString` (SSR), not `renderToStaticMarkup`, which
// strips hydration comments and would silently pass on the buggy markup.
describe("Header", () => {
	it("keeps a plain space before the emphasized segment (English)", () => {
		const html = renderToString(
			<MockLanguageProvider language="en">
				<Header />
			</MockLanguageProvider>,
		);

		expect(html).toContain("WebP <ins");
		expect(html).not.toContain("<!-- -->");
	});

	it("keeps a plain space before the emphasized segment (Korean)", () => {
		const html = renderToString(
			<MockLanguageProvider language="ko">
				<Header />
			</MockLanguageProvider>,
		);

		expect(html).toContain("변환하세요, <ins");
		expect(html).not.toContain("<!-- -->");
	});
});
