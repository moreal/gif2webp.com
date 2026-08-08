// Per-language document metadata: everything that ends up in <head>, in the
// <noscript> fallback, in the JSON-LD block and in sitemap.xml. Consumed only
// at build time — by src/entry-prerender.tsx (which scripts/prerender.mjs
// imports out of the SSR bundle) and by this module's tests. Never bundled
// for the browser, so strings that never render (noscript prose, the
// Twitter/JSON-LD description variants) live here rather than in
// translations.ts.
import {
	type Language,
	LANGUAGE_CODES,
	SUPPORTED_LANGUAGES,
	languagePath,
} from "./i18n";
import { translations } from "./translations";

export const SITE_ORIGIN = "https://gif2webp.com";

// Bump this when the page copy changes. Google only trusts <lastmod> when it
// is consistently truthful (see docs/SEO.md), so this is deliberately not
// tied to the build date.
export const CONTENT_LAST_MODIFIED = "2026-08-08";

type DocumentStrings = {
	// twitter:description — shorter than meta.description; Twitter truncates
	// around 200 characters.
	twitterDescription: string;
	// JSON-LD "description". Authored directly rather than derived from
	// meta.description (which ends in an "Open source." sentence) because a
	// regex-strip needs one pattern per language and Japanese/Chinese have no
	// leading space to anchor on.
	structuredDataDescription: string;
	// Raw HTML for the <noscript> fallback. Contains a link, so it is
	// hand-escaped markup and must never be passed through React.
	noscriptHtml: string;
};

const DOCUMENT_STRINGS: Record<Language, DocumentStrings> = {
	en: {
		twitterDescription:
			"Free online GIF to WebP converter that runs entirely in your browser. No upload — your files never leave your device.",
		structuredDataDescription:
			"Free online GIF to WebP converter that runs entirely in your browser. Convert animated GIFs to WebP without uploading — your files never leave your device.",
		noscriptHtml:
			'JavaScript is required for the converter to work — it is what keeps your files on your device, converting GIF to WebP locally via WebAssembly instead of uploading them. Please enable JavaScript, or review and self-host the <a href="https://github.com/moreal/gif2webp.com">source code on GitHub</a>.',
	},
	ko: {
		twitterDescription:
			"브라우저에서 완전히 동작하는 무료 GIF → WebP 변환기. 업로드 없음 — 파일이 기기 밖으로 나가지 않습니다.",
		structuredDataDescription:
			"브라우저에서 완전히 동작하는 무료 온라인 GIF → WebP 변환기입니다. 업로드 없이 GIF를 애니메이션 WebP로 변환하세요 — 파일이 기기 밖으로 나가지 않습니다.",
		noscriptHtml:
			'변환기가 동작하려면 JavaScript가 필요합니다 — 파일을 업로드하는 대신 WebAssembly로 기기 안에서 GIF를 WebP로 변환하기 때문입니다. JavaScript를 활성화하거나, <a href="https://github.com/moreal/gif2webp.com">GitHub의 소스 코드</a>를 검토하고 직접 호스팅할 수도 있습니다.',
	},
	ja: {
		twitterDescription:
			"ブラウザだけで完結する無料のGIF → WebP変換ツール。アップロード不要 — ファイルは端末の外に出ません。",
		structuredDataDescription:
			"ブラウザだけで完結する無料のGIF → WebP変換ツールです。アップロード不要でGIFをWebPアニメーションに変換 — ファイルが端末の外に出ることはありません。",
		noscriptHtml:
			'変換機能を利用するにはJavaScriptが必要です — アップロードする代わりに、WebAssemblyを使って端末内でGIFをWebPに変換しているためです。JavaScriptを有効にするか、<a href="https://github.com/moreal/gif2webp.com">GitHub上のソースコード</a>を確認して自分でホストすることもできます。',
	},
	de: {
		twitterDescription:
			"Kostenloser GIF-zu-WebP-Konverter, komplett im Browser. Kein Upload — deine Dateien verlassen nie dein Gerät.",
		structuredDataDescription:
			"Kostenloser Online-Konverter, der GIF komplett im Browser in WebP umwandelt. Animierte GIFs werden zu WebP, ohne dass du etwas hochlädst — deine Dateien verlassen nie dein Gerät.",
		noscriptHtml:
			'Für den Konverter wird JavaScript benötigt — damit bleiben deine Dateien auf deinem Gerät: GIFs werden lokal per WebAssembly in WebP umgewandelt, statt hochgeladen zu werden. Bitte aktiviere JavaScript oder sieh dir den <a href="https://github.com/moreal/gif2webp.com">Quellcode auf GitHub</a> an und hoste ihn selbst.',
	},
	zh: {
		twitterDescription:
			"完全在浏览器中运行的免费GIF转WebP工具。无需上传，文件不会离开你的设备。",
		structuredDataDescription:
			"完全在浏览器中运行的免费在线GIF转WebP工具。无需上传即可将动态GIF转换为WebP，文件不会离开你的设备。",
		noscriptHtml:
			'转换功能需要JavaScript才能运行：这样才能让文件留在你的设备上，通过WebAssembly在本地将GIF转换为WebP，而不是上传。请启用JavaScript，或查看并自行部署<a href="https://github.com/moreal/gif2webp.com">GitHub上的源代码</a>。',
	},
};

export type DocumentMeta = {
	lang: Language;
	url: string;
	title: string;
	description: string;
	twitterDescription: string;
	structuredDataDescription: string;
	ogLocale: string;
	ogLocaleAlternates: string[];
	alternates: { hreflang: string; href: string }[];
	inLanguage: Language[];
	noscriptHtml: string;
};

function documentMetaFor(lang: Language): DocumentMeta {
	return {
		lang,
		url: `${SITE_ORIGIN}${languagePath(lang)}`,
		title: translations[lang].meta.title,
		description: translations[lang].meta.description,
		twitterDescription: DOCUMENT_STRINGS[lang].twitterDescription,
		structuredDataDescription: DOCUMENT_STRINGS[lang].structuredDataDescription,
		noscriptHtml: DOCUMENT_STRINGS[lang].noscriptHtml,
		ogLocale: SUPPORTED_LANGUAGES[lang].ogLocale,
		ogLocaleAlternates: LANGUAGE_CODES.filter((c) => c !== lang).map(
			(c) => SUPPORTED_LANGUAGES[c].ogLocale,
		),
		alternates: [
			...LANGUAGE_CODES.map((c) => ({
				hreflang: c,
				href: `${SITE_ORIGIN}${languagePath(c)}`,
			})),
			{ hreflang: "x-default", href: `${SITE_ORIGIN}/` },
		],
		inLanguage: LANGUAGE_CODES,
	};
}

export const DOCUMENT_META = Object.fromEntries(
	LANGUAGE_CODES.map((lang) => [lang, documentMetaFor(lang)]),
) as Record<Language, DocumentMeta>;

// Escapes text for use inside an HTML attribute value or element text node.
function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function structuredData(meta: DocumentMeta) {
	return {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: "gif2webp.com",
		url: meta.url,
		description: meta.structuredDataDescription,
		applicationCategory: "UtilityApplication",
		operatingSystem: "Any",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		// Kept English-only for now — Google doesn't surface featureList in
		// results for WebApplication, so localizing it is low priority.
		featureList: [
			"Convert GIF to animated WebP",
			"Runs entirely in the browser via WebAssembly",
			"No file upload — files never leave your device",
			"Batch conversion of multiple files",
			"Free and open source",
		],
		inLanguage: meta.inLanguage,
		screenshot: `${SITE_ORIGIN}/og-screenshot.png`,
		sameAs: ["https://github.com/moreal/gif2webp.com"],
		license: "https://www.gnu.org/licenses/agpl-3.0.en.html",
		maintainer: {
			"@type": "Person",
			name: "moreal",
			url: "https://github.com/moreal",
		},
		browserRequirements: "WebWorker",
		permissions: "No special permissions required",
	};
}

// Returns the localized <head> block (everything between the
// <!-- i18n:head:start/end --> markers in index.html), unindented — the
// caller applies a uniform base indent. JSON-LD lines carry their own extra
// 2-space nesting so the script tag's content reads correctly once the base
// indent is added.
export function renderHeadLines(meta: DocumentMeta): string[] {
	const jsonLines = JSON.stringify(structuredData(meta), null, 2)
		.split("\n")
		.map((line) => `  ${line}`);

	return [
		`<meta name="description" content="${escapeHtml(meta.description)}" />`,
		"",
		`<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
		`<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
		`<meta property="og:type" content="website" />`,
		`<meta property="og:site_name" content="gif2webp.com" />`,
		`<meta property="og:url" content="${meta.url}" />`,
		`<meta property="og:locale" content="${meta.ogLocale}" />`,
		...meta.ogLocaleAlternates.map(
			(locale) => `<meta property="og:locale:alternate" content="${locale}" />`,
		),
		`<meta property="og:image" content="${SITE_ORIGIN}/og-screenshot.png" />`,
		`<meta property="og:image:width" content="2162" />`,
		`<meta property="og:image:height" content="1296" />`,
		`<meta property="og:image:alt" content="Screenshot of gif2webp.com showing the GIF to WebP converter" />`,
		"",
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
		`<meta name="twitter:description" content="${escapeHtml(meta.twitterDescription)}" />`,
		`<meta name="twitter:image" content="${SITE_ORIGIN}/og-screenshot.png" />`,
		"",
		`<link rel="canonical" href="${meta.url}" />`,
		...meta.alternates.map(
			(a) =>
				`<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`,
		),
		"",
		`<script type="application/ld+json">`,
		...jsonLines,
		`</script>`,
		"",
		`<title>${escapeHtml(meta.title)}</title>`,
	];
}

// Returns the localized <noscript> block (the <!-- i18n:noscript:start/end
// --> region in index.html's <body>), unindented.
export function renderNoscriptLines(meta: DocumentMeta): string[] {
	return [
		"<noscript>",
		"  <p>",
		`    ${meta.noscriptHtml}`,
		"  </p>",
		"</noscript>",
	];
}

export function renderSitemap(): string {
	const urls = LANGUAGE_CODES.map((lang) => {
		const meta = DOCUMENT_META[lang];
		return `  <url>\n    <loc>${meta.url}</loc>\n    <lastmod>${CONTENT_LAST_MODIFIED}</lastmod>\n  </url>`;
	}).join("\n");
	return (
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
	);
}
