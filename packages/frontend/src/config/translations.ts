import type { Language } from './i18n';

export const translations = {
  en: {
    header: {
      title: 'Convert your GIF to WebP in ',
      titleEmphasis: 'on your browser',
      subtitle: "Don't sacrifice your copyright for convenience."
    },
    dropzone: {
      processing: 'Processing...',
      fileTypeError: 'Please upload GIF files only',
      fileSizeError: 'File size exceeds the limit (512MB)',
      processingError: 'Failed to process files. Please try again.',
      readError: 'Failed to read file. Please try again.',
      dragActive: 'Drop GIF files here...',
      default: 'Drag and drop GIF files here, or click to select files'
    },
    conversion: {
      button: 'Convert to WebP',
      download: 'Download WebP',
      complete: 'Conversion Complete',
      retry: 'Retry',
      converting: 'Converting...',
      fileSize: 'File size: {size}',
      memoryWarning: '⚠️ Large file size ({size}MB) may affect performance',
      error: 'Conversion failed'
    },
    footer: {
      about: 'About',
      sourceCode: 'Source code',
      aboutTitle: 'About gif2webp.com',
      aboutContent: [
        "gif2webp.com is a service that converts GIF to WebP in your browser. The motivation for creating this service came when a certain design portfolio hosting service discontinued GIF support and decided to only support WebP, but there weren't any suitable conversion tools available. More specifically, I couldn't find any implementation that worked directly in the browser.",
        "Recently, I've observed many cases where images provided through various services are being used as training data for artificial intelligence. This has made me somewhat distrustful of sending images to servers. While other converter services mention in their descriptions that they delete images after a certain period, it's still better not to send them at all if we can avoid it.",
        "That's why I developed gif2webp.com. This service uses WASM technology to convert GIF to WebP without sending images to the server. Really! If you don't trust the deployed code, this service is open source, so you can access the source code through the link at the bottom and even host it yourself."
      ]
    },
    errors: {
      general: 'Something went wrong. Please refresh the page and try again.',
      refresh: 'Refresh Page'
    },
    common: {
      chooseFiles: 'Choose files...',
      close: 'Close'
    }
  },
  ko: {
    header: {
      title: 'GIF를 WebP로 변환하세요, ',
      titleEmphasis: '당신의 브라우저에서',
      subtitle: '편의성을 위해 저작권을 희생하지 마세요.'
    },
    dropzone: {
      processing: '처리 중...',
      fileTypeError: 'GIF 파일만 업로드해 주세요',
      fileSizeError: '파일 크기가 제한을 초과했습니다 (512MB)',
      processingError: '파일 처리에 실패했습니다. 다시 시도해 주세요.',
      readError: '파일 읽기에 실패했습니다. 다시 시도해 주세요.',
      dragActive: '여기에 GIF 파일을 놓으세요...',
      default: 'GIF 파일을 여기에 끌어다 놓거나 클릭하여 선택하세요'
    },
    conversion: {
      button: 'WebP로 변환',
      download: 'WebP 다운로드',
      complete: '변환 완료',
      retry: '다시 시도',
      converting: '변환 중...',
      fileSize: '파일 크기: {size}',
      memoryWarning: '⚠️ 큰 파일 크기 ({size}MB)는 성능에 영향을 미칠 수 있습니다',
      error: '변환 실패'
    },
    footer: {
      about: '소개',
      sourceCode: '소스 코드',
      aboutTitle: 'gif2webp.com 소개',
      aboutContent: [
        'gif2webp.com은 브라우저에서 GIF를 WebP로 변환하는 서비스입니다. 이 서비스를 만들게 된 계기는 어떤 디자인 포트폴리오 호스팅 서비스가 GIF 지원을 중단하고 WebP만 지원하기로 결정했을 때, 적절한 변환 도구를 찾을 수 없었기 때문입니다. 특히, 브라우저에서 직접 작동하는 구현을 찾을 수 없었습니다.',
        '최근에는 다양한 서비스를 사용할 때 제공되는 이미지들이 인공지능 학습 데이터로 사용되는 사례들을 많이 보았습니다. 이로 인해 이미지를 서버로 전송하는 것에 대해 다소 불신이 생겼습니다. 다른 변환 서비스들이 일정 기간 후 이미지를 삭제한다고 설명에 명시하고 있지만, 가능하다면 아예 전송하지 않는 것이 더 좋습니다.',
        '그래서 gif2webp.com을 개발했습니다. 이 서비스는 WASM 기술을 사용하여 이미지를 서버로 전송하지 않고 GIF를 WebP로 변환합니다. 정말입니다! 배포된 코드를 신뢰할 수 없다면, 이 서비스는 오픈 소스이므로 하단의 링크를 통해 소스 코드에 접근할 수 있으며 직접 호스팅할 수도 있습니다.'
      ]
    },
    errors: {
      general: '문제가 발생했습니다. 페이지를 새로고침하고 다시 시도해주세요.',
      refresh: '페이지 새로고침'
    },
    common: {
      chooseFiles: '파일 선택...',
      close: '닫기'
    }
  }
} as const;

export type TranslationKey = keyof typeof translations.en;
export type TranslationValues = { [key: string]: string | number };

export function getTranslation(lang: Language, key: string, values?: TranslationValues) {
  const keys = key.split('.');
  let translation: any = translations[lang];
  
  for (const k of keys) {
    if (!translation[k]) return key;
    translation = translation[k];
  }

  if (typeof translation === 'string' && values) {
    return Object.entries(values).reduce(
      (text, [key, value]) => text.replace(`{${key}}`, value.toString()),
      translation
    );
  }

  return translation;
}
