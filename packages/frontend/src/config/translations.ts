import type { Language } from "./i18n";

export type TranslationSet = {
	// Document metadata for this language's page. English values are also
	// regenerated into index.html's <head> — see src/config/documentMeta.ts
	// and scripts/prerender.mjs.
	meta: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		// Joins title and titleEmphasis in Header.tsx. A real space for
		// space-delimited languages; "" for ja/zh, which don't put an ASCII
		// space between CJK text and the Latin word that starts titleEmphasis.
		titleJoiner: string;
		titleEmphasis: string;
		subtitle: string;
	};
	dropzone: {
		processing: string;
		fileTypeError: string;
		fileSizeError: string;
		processingError: string;
		readError: string;
		dragActive: string;
		default: string;
	};
	conversion: {
		button: string;
		download: string;
		complete: string;
		retry: string;
		converting: string;
		fileSize: string;
		sizeComparison: string;
		memoryWarning: string;
		error: string;
	};
	footer: {
		about: string;
		sourceCode: string;
		aboutTitle: string;
		aboutContent: string[];
		language: string;
	};
	errors: {
		general: string;
		refresh: string;
	};
	common: {
		chooseFiles: string;
		close: string;
	};
};

export const translations: Record<Language, TranslationSet> = {
	en: {
		meta: {
			title: "gif2webp.com — Convert GIF to Animated WebP in Your Browser",
			description:
				"Free online GIF to WebP converter that runs entirely in your browser. Convert animated GIFs to WebP without uploading — your files never leave your device. Open source.",
		},
		header: {
			title: "Convert your GIF to WebP",
			titleJoiner: " ",
			titleEmphasis: "in your browser",
			subtitle: "Don't sacrifice your copyright for convenience.",
		},
		dropzone: {
			processing: "Processing...",
			fileTypeError: "Please upload GIF files only",
			fileSizeError: "File size exceeds the limit ({maxSize}MB)",
			processingError: "Failed to process files. Please try again.",
			readError: "Failed to read file. Please try again.",
			dragActive: "Drop GIF files here...",
			default: "Drag and drop GIF files here, or click to select files",
		},
		conversion: {
			button: "Convert to WebP",
			download: "Download WebP",
			complete: "Conversion Complete",
			retry: "Retry",
			converting: "Converting...",
			fileSize: "File size: {size}",
			sizeComparison: "{original} → {converted} ({percentage}% smaller)",
			memoryWarning: "⚠️ Large file size ({size}MB) may affect performance",
			error: "Conversion failed",
		},
		footer: {
			about: "About",
			sourceCode: "Source code",
			aboutTitle: "About gif2webp.com",
			aboutContent: [
				"gif2webp.com is a service that converts GIF to WebP in your browser. The motivation for creating this service came when a certain design portfolio hosting service discontinued GIF support and decided to only support WebP, but there weren't any suitable conversion tools available. More specifically, I couldn't find any implementation that worked directly in the browser.",
				"Recently, I've observed many cases where images provided through various services are being used as training data for artificial intelligence. This has made me somewhat distrustful of sending images to servers. While other converter services mention in their descriptions that they delete images after a certain period, it's still better not to send them at all if we can avoid it.",
				"That's why I developed gif2webp.com. This service uses WASM technology to convert GIF to WebP without sending images to the server. Really! If you don't trust the deployed code, this service is open source, so you can access the source code through the link at the bottom and even host it yourself.",
			],
			language: "Language",
		},
		errors: {
			general: "Something went wrong. Please refresh the page and try again.",
			refresh: "Refresh Page",
		},
		common: {
			chooseFiles: "Choose files...",
			close: "Close",
		},
	},
	ko: {
		meta: {
			title: "gif2webp.com — 브라우저에서 GIF를 애니메이션 WebP로 변환",
			description:
				"브라우저에서 완전히 동작하는 무료 온라인 GIF → WebP 변환기입니다. 업로드 없이 GIF를 애니메이션 WebP로 변환하세요 — 파일이 기기 밖으로 나가지 않습니다. 오픈 소스.",
		},
		header: {
			title: "GIF를 WebP로 변환하세요,",
			titleJoiner: " ",
			titleEmphasis: "당신의 브라우저에서",
			subtitle: "편의성을 위해 저작권을 희생하지 마세요.",
		},
		dropzone: {
			processing: "처리 중...",
			fileTypeError: "GIF 파일만 업로드해 주세요",
			fileSizeError: "파일 크기가 제한을 초과했습니다 ({maxSize}MB)",
			processingError: "파일 처리에 실패했습니다. 다시 시도해 주세요.",
			readError: "파일 읽기에 실패했습니다. 다시 시도해 주세요.",
			dragActive: "여기에 GIF 파일을 놓으세요...",
			default: "GIF 파일을 여기에 끌어다 놓거나 클릭하여 선택하세요",
		},
		conversion: {
			button: "WebP로 변환",
			download: "WebP 다운로드",
			complete: "변환 완료",
			retry: "다시 시도",
			converting: "변환 중...",
			fileSize: "파일 크기: {size}",
			sizeComparison: "{original} → {converted} ({percentage}% 감소)",
			memoryWarning:
				"⚠️ 큰 파일 크기 ({size}MB)는 성능에 영향을 미칠 수 있습니다",
			error: "변환 실패",
		},
		footer: {
			about: "소개",
			sourceCode: "소스 코드",
			aboutTitle: "gif2webp.com 소개",
			aboutContent: [
				"gif2webp.com은 브라우저에서 GIF를 WebP로 변환하는 서비스입니다. 이 서비스를 만들게 된 계기는 어떤 디자인 포트폴리오 호스팅 서비스가 GIF 지원을 중단하고 WebP만 지원하기로 결정했을 때, 적절한 변환 도구를 찾을 수 없었기 때문입니다. 특히, 브라우저에서 직접 작동하는 구현을 찾을 수 없었습니다.",
				"최근에는 다양한 서비스를 사용할 때 제공되는 이미지들이 인공지능 학습 데이터로 사용되는 사례들을 많이 보았습니다. 이로 인해 이미지를 서버로 전송하는 것에 대해 다소 불신이 생겼습니다. 다른 변환 서비스들이 일정 기간 후 이미지를 삭제한다고 설명에 명시하고 있지만, 가능하다면 아예 전송하지 않는 것이 더 좋습니다.",
				"그래서 gif2webp.com을 개발했습니다. 이 서비스는 WASM 기술을 사용하여 이미지를 서버로 전송하지 않고 GIF를 WebP로 변환합니다. 정말입니다! 배포된 코드를 신뢰할 수 없다면, 이 서비스는 오픈 소스이므로 하단의 링크를 통해 소스 코드에 접근할 수 있으며 직접 호스팅할 수도 있습니다.",
			],
			language: "언어",
		},
		errors: {
			general: "문제가 발생했습니다. 페이지를 새로고침하고 다시 시도해주세요.",
			refresh: "페이지 새로고침",
		},
		common: {
			chooseFiles: "파일 선택...",
			close: "닫기",
		},
	},
	ja: {
		meta: {
			title: "gif2webp.com — ブラウザでGIFをWebPアニメーションに変換",
			description:
				"ブラウザだけで完結する無料のGIF → WebP変換ツールです。アップロード不要でGIFをWebPアニメーションに変換 — ファイルが端末の外に出ることはありません。オープンソース。",
		},
		header: {
			// English/Korean/German emphasize the adverbial ("in your browser") and
			// keep it second; Japanese is verb-final, so putting a locative after
			// the verb reads as an odd inversion. Here the locative comes first and
			// the action is emphasized instead — natural word order, same layout.
			title: "ブラウザの中だけで",
			// No ASCII space before the Latin "GIF" that starts titleEmphasis —
			// see titleJoiner. Japanese text doesn't put a half-width space
			// between kana/kanji and an adjacent Latin word.
			titleJoiner: "",
			titleEmphasis: "GIFをWebPに変換",
			subtitle: "便利さのために著作権を犠牲にしないでください。",
		},
		dropzone: {
			processing: "処理中...",
			fileTypeError: "GIFファイルのみアップロードしてください",
			fileSizeError: "ファイルサイズが上限を超えています（{maxSize}MB）",
			processingError: "ファイルの処理に失敗しました。もう一度お試しください。",
			readError: "ファイルの読み込みに失敗しました。もう一度お試しください。",
			dragActive: "ここにGIFファイルをドロップしてください...",
			default:
				"ここにGIFファイルをドラッグ＆ドロップ、またはクリックして選択してください",
		},
		conversion: {
			button: "WebPに変換",
			download: "WebPをダウンロード",
			complete: "変換完了",
			retry: "再試行",
			converting: "変換中...",
			fileSize: "ファイルサイズ: {size}",
			sizeComparison: "{original} → {converted}（{percentage}%削減）",
			memoryWarning:
				"⚠️ ファイルサイズが大きい（{size}MB）ため、パフォーマンスに影響する場合があります",
			error: "変換に失敗しました",
		},
		footer: {
			about: "このサイトについて",
			sourceCode: "ソースコード",
			aboutTitle: "gif2webp.comについて",
			aboutContent: [
				"gif2webp.comは、ブラウザ上でGIFをWebPに変換するサービスです。このサービスを作ったきっかけは、あるデザインポートフォリオのホスティングサービスがGIFのサポートを終了しWebPのみに対応することになった際、適切な変換ツールが見つからなかったことでした。特に、ブラウザ上で直接動作する実装を見つけることができませんでした。",
				"最近、さまざまなサービスで提供した画像が人工知能の学習データとして使われるケースを多く目にするようになりました。そのため、画像をサーバーに送信することに対して、以前より不信感を抱くようになりました。他の変換サービスの多くは、一定期間後に画像を削除すると説明していますが、可能であれば最初から送信しないほうが望ましいはずです。",
				"そこでgif2webp.comを開発しました。このサービスはWASM技術を使用し、画像をサーバーに送信せずにGIFをWebPに変換します。本当です！公開されているコードが信頼できない場合でも、このサービスはオープンソースなので、ページ下部のリンクからソースコードにアクセスでき、自分自身でホストすることもできます。",
			],
			language: "言語",
		},
		errors: {
			general: "問題が発生しました。ページを更新してもう一度お試しください。",
			refresh: "ページを更新",
		},
		common: {
			chooseFiles: "ファイルを選択...",
			close: "閉じる",
		},
	},
	de: {
		meta: {
			title:
				"gif2webp.com — GIF in animiertes WebP umwandeln, direkt im Browser",
			description:
				"Kostenloser Online-Konverter, der GIF komplett im Browser in WebP umwandelt. Animierte GIFs werden zu WebP, ohne dass du etwas hochlädst — deine Dateien verlassen nie dein Gerät. Open Source.",
		},
		header: {
			title: "Wandle dein GIF in WebP um,",
			titleJoiner: " ",
			titleEmphasis: "direkt in deinem Browser",
			subtitle: "Opfere deine Urheberrechte nicht für Bequemlichkeit.",
		},
		dropzone: {
			processing: "Wird verarbeitet...",
			fileTypeError: "Bitte lade nur GIF-Dateien hoch",
			fileSizeError: "Dateigröße überschreitet das Limit ({maxSize} MB)",
			processingError:
				"Dateien konnten nicht verarbeitet werden. Bitte versuche es erneut.",
			readError: "Datei konnte nicht gelesen werden. Bitte versuche es erneut.",
			dragActive: "GIF-Dateien hier ablegen...",
			default:
				"GIF-Dateien hierher ziehen oder klicken, um Dateien auszuwählen",
		},
		conversion: {
			button: "In WebP umwandeln",
			download: "WebP herunterladen",
			complete: "Umwandlung abgeschlossen",
			retry: "Erneut versuchen",
			converting: "Wird umgewandelt...",
			fileSize: "Dateigröße: {size}",
			sizeComparison: "{original} → {converted} ({percentage} % kleiner)",
			memoryWarning:
				"⚠️ Große Dateigröße ({size} MB) kann die Leistung beeinträchtigen",
			error: "Umwandlung fehlgeschlagen",
		},
		footer: {
			about: "Über uns",
			sourceCode: "Quellcode",
			aboutTitle: "Über gif2webp.com",
			aboutContent: [
				"gif2webp.com ist ein Dienst, der GIFs direkt in deinem Browser in WebP umwandelt. Die Idee dazu entstand, als ein bestimmter Hosting-Dienst für Design-Portfolios die Unterstützung für GIFs einstellte und nur noch WebP zuließ – ein passendes Konvertierungstool war jedoch nicht zu finden. Insbesondere gab es keine Lösung, die direkt im Browser funktionierte.",
				"In letzter Zeit habe ich immer häufiger beobachtet, dass Bilder, die über verschiedene Dienste bereitgestellt werden, als Trainingsdaten für künstliche Intelligenz verwendet werden. Das hat mein Vertrauen darin, Bilder an Server zu senden, spürbar sinken lassen. Andere Konvertierungsdienste geben zwar an, Bilder nach einer bestimmten Zeit zu löschen, aber wenn es sich vermeiden lässt, ist es besser, sie erst gar nicht zu senden.",
				"Deshalb habe ich gif2webp.com entwickelt. Dieser Dienst nutzt WASM-Technologie, um GIFs in WebP umzuwandeln, ohne Bilder an einen Server zu senden. Wirklich! Falls du dem bereitgestellten Code nicht traust: Dieser Dienst ist Open Source, du kannst über den Link am Seitenende auf den Quellcode zugreifen und ihn sogar selbst hosten.",
			],
			language: "Sprache",
		},
		errors: {
			general:
				"Etwas ist schiefgelaufen. Bitte lade die Seite neu und versuche es erneut.",
			refresh: "Seite neu laden",
		},
		common: {
			chooseFiles: "Dateien auswählen...",
			close: "Schließen",
		},
	},
	zh: {
		meta: {
			title: "gif2webp.com — 在浏览器中将GIF转换为动态WebP",
			description:
				"完全在浏览器中运行的免费在线GIF转WebP工具。无需上传即可将动态GIF转换为WebP，文件不会离开你的设备。开源。",
		},
		header: {
			title: "在你的浏览器里，",
			// No ASCII space before the Latin "GIF" that starts titleEmphasis —
			// see titleJoiner. Chinese text doesn't put a half-width space
			// between Han characters and an adjacent Latin word.
			titleJoiner: "",
			titleEmphasis: "把GIF转换为WebP",
			subtitle: "不要为了方便而牺牲你的版权。",
		},
		dropzone: {
			processing: "处理中...",
			fileTypeError: "请仅上传GIF文件",
			fileSizeError: "文件大小超过限制（{maxSize}MB）",
			processingError: "文件处理失败，请重试。",
			readError: "文件读取失败，请重试。",
			dragActive: "将GIF文件拖放到此处...",
			default: "将GIF文件拖放到此处，或点击选择文件",
		},
		conversion: {
			button: "转换为WebP",
			download: "下载WebP",
			complete: "转换完成",
			retry: "重试",
			converting: "转换中...",
			fileSize: "文件大小：{size}",
			sizeComparison: "{original} → {converted}（缩小{percentage}%）",
			memoryWarning: "⚠️ 文件较大（{size}MB）可能会影响性能",
			error: "转换失败",
		},
		footer: {
			about: "关于",
			sourceCode: "源代码",
			aboutTitle: "关于gif2webp.com",
			aboutContent: [
				"gif2webp.com是一个在浏览器中将GIF转换为WebP的服务。创建这个服务的契机是，某个设计作品集托管服务停止支持GIF，转而只支持WebP，但当时找不到合适的转换工具，尤其是找不到能直接在浏览器中运行的实现。",
				"最近我注意到，许多服务中用户提供的图片被用作人工智能的训练数据，这让我对把图片发送到服务器这件事产生了一些不信任感。虽然其他转换服务在说明中提到会在一定期限后删除图片，但如果可以做到根本不发送，那显然更好。",
				"因此我开发了gif2webp.com。这个服务使用WASM技术，在不向服务器发送图片的情况下将GIF转换为WebP。真的！如果你不信任已部署的代码，也没关系，这个服务是开源的，你可以通过页面底部的链接查看源代码，甚至自行部署。",
			],
			language: "语言",
		},
		errors: {
			general: "出了点问题，请刷新页面后重试。",
			refresh: "刷新页面",
		},
		common: {
			chooseFiles: "选择文件...",
			close: "关闭",
		},
	},
} as const;

export type TranslationKey = keyof typeof translations.en;
export type TranslationValues = { [key: string]: string | number };

const translationCache = new Map<string, string>();

export function getTranslation(
	lang: Language,
	key: string,
	values?: TranslationValues,
) {
	const cacheKey = values ? null : `${lang}:${key}`;
	if (cacheKey) {
		const cached = translationCache.get(cacheKey);
		if (cached !== undefined) return cached;
	}

	const keys = key.split(".");
	let translation: any = translations[lang]; // eslint-disable-line @typescript-eslint/no-explicit-any

	for (const k of keys) {
		// undefined check, not truthiness: a falsy check would treat legitimate
		// values like "" (e.g. header.titleJoiner for ja/zh) or 0 as missing
		// and return the raw key path instead.
		if (translation[k] === undefined) return key;
		translation = translation[k];
	}

	if (typeof translation === "string" && values) {
		return Object.entries(values).reduce(
			(text, [placeholder, value]) =>
				text.replace(`{${placeholder}}`, value.toString()),
			translation,
		);
	}

	if (cacheKey) {
		translationCache.set(cacheKey, translation);
	}

	return translation;
}
