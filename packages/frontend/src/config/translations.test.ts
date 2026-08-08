import { describe, it, expect } from "vitest";
import { LANGUAGE_CODES, DEFAULT_LANGUAGE } from "./i18n";
import { translations } from "./translations";

// Recursively collects dotted leaf paths, e.g. "header.title", from a
// translation object — used to compare each language's key set against
// English's.
function leafPaths(value: unknown, prefix = ""): string[] {
	if (typeof value === "string" || Array.isArray(value)) {
		return [prefix];
	}
	if (value && typeof value === "object") {
		return Object.entries(value).flatMap(([key, child]) =>
			leafPaths(child, prefix ? `${prefix}.${key}` : key),
		);
	}
	return [prefix];
}

function get(value: unknown, path: string): unknown {
	return path.split(".").reduce((acc: any, key) => acc?.[key], value); // eslint-disable-line @typescript-eslint/no-explicit-any
}

function placeholders(text: string): Set<string> {
	return new Set([...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]));
}

const referencePaths = leafPaths(translations[DEFAULT_LANGUAGE]).sort();

describe("translations", () => {
	it.each(LANGUAGE_CODES)("%s has the same key set as English", (lang) => {
		expect(leafPaths(translations[lang]).sort()).toEqual(referencePaths);
	});

	// header.titleJoiner is allowed to be "" by design — ja/zh join title and
	// titleEmphasis with no space (see Header.tsx) — so it's excluded here.
	// Every other leaf must still be non-empty: getTranslation falls back to
	// returning the raw key path for a missing value, so an accidentally
	// empty string for real UI text would silently leak onto the page.
	const EMPTY_ALLOWED = new Set(["header.titleJoiner"]);

	it.each(
		LANGUAGE_CODES,
	)("%s has no unintentionally empty leaf values", (lang) => {
		for (const path of referencePaths) {
			if (EMPTY_ALLOWED.has(path)) continue;
			const value = get(translations[lang], path);
			if (typeof value === "string") {
				expect(value.length, `${lang}: ${path}`).toBeGreaterThan(0);
			} else if (Array.isArray(value)) {
				for (const [index, item] of value.entries()) {
					expect(item.length, `${lang}: ${path}[${index}]`).toBeGreaterThan(0);
				}
			}
		}
	});

	it.each(
		LANGUAGE_CODES,
	)("%s uses the same {placeholder} tokens as English for every key", (lang) => {
		for (const path of referencePaths) {
			const enValue = get(translations[DEFAULT_LANGUAGE], path);
			const langValue = get(translations[lang], path);
			if (typeof enValue === "string") {
				expect(placeholders(langValue as string), `${lang}: ${path}`).toEqual(
					placeholders(enValue),
				);
			}
		}
	});

	it.each(
		LANGUAGE_CODES,
	)("%s has exactly 3 footer.aboutContent paragraphs", (lang) => {
		expect(translations[lang].footer.aboutContent).toHaveLength(3);
	});
});
