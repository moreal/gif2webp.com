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
- 🔧 Add `og:site_name`, `og:locale` (+ `og:locale:alternate` for ko),
  `og:image:width/height/alt`, and Twitter Card tags so shared links
  render a large preview everywhere.

## 7. Mobile friendliness & page experience

- ✅ Responsive layout with a correct `viewport` meta tag.
- ✅ No intrusive interstitials (the About modal is user-initiated).
- ✅ Conversion runs in a Web Worker, keeping the main thread responsive
  (INP); no layout-shifting content above the fold (CLS).

## 8. Internationalization

- ✅ `<html lang>` is kept in sync with the selected language.
- 🔧 Each language now has a dedicated URL — English at `/` and Korean
  at `/ko/`, both prerendered with a localized `<head>` — annotated
  bidirectionally with self-referencing `hreflang` tags and
  `x-default` pointing at the English root. Canonicals are
  self-referencing, the language switcher is real crawlable anchors
  (intercepted for an in-app pushState switch), both URLs are in the
  sitemap, and there is no server-side redirect: a saved `ko`
  preference (or a Korean browser on first visit) is honored by a
  client-side, pre-paint move from `/` to `/ko/` only, which crawlers
  fetching the static pages never trigger.

## 9. Favicon

- ✅ SVG favicon (a format Google Search supports) is registered at a
  stable URL.

## 10. Monitoring

- 📋 Verify the property in Google Search Console, submit the sitemap,
  and watch the Page Indexing / Enhancements reports after these changes
  ship.
