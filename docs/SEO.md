# SEO Requirements

Requirements for gif2webp.com derived from [Google Search Essentials and the
Google Search documentation](https://developers.google.com/search/docs).

Legend: ✅ satisfied · 🔧 fixed in this pass · 📋 future work

## 1. Technical requirements (crawlability / indexability)

- ✅ Served over HTTPS with a valid certificate (Cloudflare Pages).
- ✅ Not blocked by `robots.txt`, no `noindex` directives.
- ✅ Single-URL app, so no crawlable-link or soft-404 concerns.
- 🔧 `robots.txt` should state its rules explicitly (`User-agent` /
  `Allow`) instead of relying on the empty-file default.
- 🔧 The app was fully client-side rendered. The static shell is now
  prerendered at build time (`scripts/prerender.mjs` + hydration in
  `main.tsx`), so the default (English) content is present in the HTML
  itself and indexing does not depend on Googlebot's rendering queue.
  This is build-time only — the deployed artifact remains fully static
  and conversion still runs entirely in the browser.

## 2. Sitemap

- ✅ `sitemap.xml` exists and is referenced from `robots.txt` and a
  `<link rel="sitemap">` tag.
- 🔧 Google ignores `<changefreq>` and `<priority>`; drop them and keep
  `<lastmod>` accurate (it is only used when it is consistently truthful).

## 3. Title links and snippets

- 🔧 `<title>` is `gif2webp` — too generic. Google recommends a
  descriptive, concise title that states what the page offers and the
  site name (e.g. "Convert GIF to animated WebP in your browser").
- 🔧 `<meta name="description">` should be a unique, human-readable
  summary that can serve as the snippet; the current one is serviceable
  but can better surface the key differentiators (free, no upload,
  browser-only, open source).
- 🔧 `<meta name="keywords">` is ignored by Google Search — remove.
- 🔧 `<meta name="robots" content="index, follow">` only restates
  defaults — remove.

## 4. Semantic content structure

- ✅ Landmarks: `<header>`, `<main>`, `<footer>` are used.
- 🔧 The visible page title is rendered as `<p>`; it must be an `<h1>` so
  Google (and assistive tech) can identify the primary heading.
- 🔧 The English headline reads "Convert your GIF to WebP in on your
  browser" — a grammar bug that hurts content quality; fix the copy.

## 5. Structured data

- ✅ JSON-LD `WebApplication` markup is present and matches visible
  content.
- 🔧 Add fields Google recommends for software apps: `offers`
  (price `0` — the app is free), `featureList`, `inLanguage`,
  `screenshot`. Do **not** add `aggregateRating`/reviews we don't have —
  that violates the structured-data guidelines.
- 📋 A visible FAQ section (+ `FAQPage` markup) could be added later;
  markup without matching visible content is not allowed.

## 6. Social / sharing metadata

- ✅ Basic Open Graph tags (`og:title`, `og:description`, `og:type`,
  `og:url`, `og:image`) are present.
- 🔧 Add `og:site_name`, `og:locale` (+ one `og:locale:alternate` per other
  language), `og:image:width/height/alt`, and Twitter Card tags so shared
  links render a large preview everywhere.

## 7. Mobile friendliness & page experience

- ✅ Responsive layout with a correct `viewport` meta tag.
- ✅ No intrusive interstitials (the About modal is user-initiated).
- ✅ Conversion runs in a Web Worker, keeping the main thread responsive
  (INP); no layout-shifting content above the fold (CLS).

## 8. Internationalization

- ✅ `<html lang>` is kept in sync with the selected language.
- ✅ Five languages are supported — English (default, `/`), Korean
  (`/ko/`), Japanese (`/ja/`), German (`/de/`) and Simplified Chinese
  (`/zh/`) — each with a dedicated URL, prerendered with a localized
  `<head>`. Every page is annotated bidirectionally with self-referencing
  `hreflang` tags for all five languages plus `x-default` pointing at the
  English root, and carries `og:locale` for itself and an
  `og:locale:alternate` for each of the other four. Canonicals are
  self-referencing, the language switcher renders real crawlable anchors
  (inside a `<details>` disclosure so they stay in the HTML even while
  collapsed — see `LanguageSelect.tsx`), all five URLs are in the sitemap,
  and there is no server-side redirect: a saved language preference (or a
  matching browser language on first visit) is honored by a client-side,
  pre-paint move from `/` to that language's URL only, which crawlers
  fetching the static pages never trigger.
- Fonts and line breaking are scoped per language via `:lang()` in
  `index.css` rather than applied globally — Japanese and Simplified
  Chinese share Han glyphs that each font family draws differently, and
  Korean's `word-break: keep-all` convention would make an entire
  paragraph unbreakable in languages without inter-word spaces.

### Adding another language

`src/config/i18n.ts`'s `SUPPORTED_LANGUAGES` is the single entry point —
everything else derives from it:

1. Add a row: `SUPPORTED_LANGUAGES.<code> = { name, ogLocale }`, and add
   `<code>` to the `Language` union.
2. Add a block to `translations.ts` (the compiler will require it — every
   key from the English block) and, if the language is CJK, decide whether
   `header.title`/`header.titleEmphasis` need to swap which half carries
   the emphasis (see the comment on the `ja` block for why).
3. Add a block to `DOCUMENT_STRINGS` in `documentMeta.ts`
   (`twitterDescription`, `structuredDataDescription`, `noscriptHtml`).
4. If the language needs its own font face or line-breaking rule, add a
   `:lang(<code>)` block in `index.css`.
5. Run `yarn workspace @gif2webp/frontend build:prod` — `scripts/prerender.mjs`
   prerenders the new `/<code>/` page and regenerates `dist/sitemap.xml`
   automatically. Bump `CONTENT_LAST_MODIFIED` in `documentMeta.ts`.

index.html's `<!-- i18n:head:start/end -->` and `<!-- i18n:noscript:start/end
-->` blocks, and the pre-paint redirect script's `var LANGS = "…";` line,
carry the *default* language's content inline (so `vite dev` serves a
correct page without running the prerender script) — `prerender.mjs` fails
the build if any of them drifts from what `documentMeta.ts` generates.
Adding a non-default language doesn't touch these; only changing the
default language's copy does.

## 9. Favicon

- ✅ SVG favicon (a format Google Search supports) is registered at a
  stable URL.

## 10. Monitoring

- 📋 Verify the property in Google Search Console, submit the sitemap,
  and watch the Page Indexing / Enhancements reports after these changes
  ship.
