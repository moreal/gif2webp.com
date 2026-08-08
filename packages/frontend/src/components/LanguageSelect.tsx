import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import {
	LANGUAGE_CODES,
	SUPPORTED_LANGUAGES,
	languagePath,
} from "../config/i18n";

const dropdownArrow = (
	<svg
		className="language-select-chevron"
		width="12"
		height="6"
		viewBox="0 0 12 6"
		aria-hidden="true"
	>
		<path d="M0,0 L12,0 L6,6 Z" fill="currentColor" />
	</svg>
);

// A <details> disclosure rather than a portal-based select: every language
// anchor stays in the prerendered HTML at all times (closed just hides them
// via the UA stylesheet), so crawlers can discover them without executing
// JS. The base-ui <Select> this used to be rendered its options into a
// Portal that didn't exist in the DOM until opened — invisible to a
// crawler — which is why it was replaced by plain anchors in the first
// place. The authoritative i18n signal for search engines is the <head>
// hreflang tags (present on every page) plus the sitemap; these anchors are
// corroboration, not the mechanism, so it's fine that they're display:none
// while collapsed.
export function LanguageSelect() {
	const { language, setLanguage, t } = useLanguage();
	const detailsRef = useRef<HTMLDetailsElement>(null);
	const summaryRef = useRef<HTMLElement>(null);
	const [open, setOpen] = useState(false);

	const close = () => {
		if (detailsRef.current) detailsRef.current.open = false;
	};

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (event: PointerEvent) => {
			if (!detailsRef.current?.contains(event.target as Node)) close();
		};
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [open]);

	return (
		<details
			ref={detailsRef}
			className="language-select"
			onToggle={(event) => setOpen(event.currentTarget.open)}
			onKeyDown={(event) => {
				if (event.key === "Escape" && detailsRef.current?.open) {
					event.stopPropagation();
					close();
					summaryRef.current?.focus();
				}
			}}
		>
			<summary
				ref={summaryRef}
				aria-label={`${t("footer.language")}: ${SUPPORTED_LANGUAGES[language].name}`}
			>
				<span lang={language}>{SUPPORTED_LANGUAGES[language].name}</span>
				{dropdownArrow}
			</summary>
			<nav aria-label={t("footer.language")} className="language-select-menu">
				{LANGUAGE_CODES.map((code) => (
					<a
						key={code}
						href={languagePath(code)}
						hrefLang={code}
						lang={code}
						aria-current={code === language ? "page" : undefined}
						onClick={(event) => {
							event.preventDefault();
							setLanguage(code);
							close();
						}}
					>
						{SUPPORTED_LANGUAGES[code].name}
					</a>
				))}
			</nav>
		</details>
	);
}
