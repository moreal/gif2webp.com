// Build-time prerendering: renders the app once in Node and embeds the
// resulting markup into dist/index.html. The deployed artifact stays fully
// static — no server-side rendering happens at runtime.
import { readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ssrOutDir = path.join(root, "dist-ssr");

await build({
	root,
	logLevel: "warn",
	build: {
		ssr: "src/entry-prerender.tsx",
		outDir: "dist-ssr",
	},
});

try {
	const { render } = await import(
		pathToFileURL(path.join(ssrOutDir, "entry-prerender.js")).href
	);
	const appHtml = render();
	if (!appHtml) {
		throw new Error("Prerender produced empty markup");
	}

	const indexPath = path.join(root, "dist", "index.html");
	const marker = '<div id="root"></div>';
	const html = await readFile(indexPath, "utf8");
	if (!html.includes(marker)) {
		throw new Error(`Could not find ${marker} in dist/index.html`);
	}
	await writeFile(
		indexPath,
		html.replace(marker, `<div id="root">${appHtml}</div>`),
	);
	console.log("Prerendered app shell into dist/index.html");
} finally {
	await rm(ssrOutDir, { recursive: true, force: true });
}
