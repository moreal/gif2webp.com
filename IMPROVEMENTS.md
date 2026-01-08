# React Frontend 코드 개선 분석

`packages/frontend` 소스코드를 React 프론트엔드 전문가 관점에서 분석한 결과입니다.

---

## 1. 성능 최적화 (Critical)

### 1.1 Context 값 메모이제이션 누락

#### ThemeProvider.tsx (lines 33-38)

**현재 코드:**
```tsx
return (
  <ThemeContext.Provider
    value={{ theme, themeSource, nextTheme, toggleTheme }}
  >
    {children}
  </ThemeContext.Provider>
);
```

**문제점:**
- `value` 객체가 매 렌더링마다 새로 생성됨
- ThemeContext를 구독하는 모든 컴포넌트가 불필요하게 리렌더링됨

**개선 코드:**
```tsx
import { useMemo, useCallback } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useSystemTheme();
  const [rawTheme, setRawTheme] = usePersistedState<RawTheme>(
    THEME_STORAGE_KEY,
    "system",
    isRawTheme,
  );

  const themeSource = rawTheme === "system" ? "system" : "user";
  const theme = rawTheme === "system" ? systemTheme : rawTheme;
  const nextTheme = invertTheme(theme);

  // useCallback으로 안정적인 참조 유지
  const toggleTheme = useCallback(() => {
    setRawTheme(invertTheme(rawTheme === "system" ? systemTheme : rawTheme));
  }, [rawTheme, systemTheme, setRawTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // useMemo로 context 값 메모이제이션
  const value = useMemo(
    () => ({ theme, themeSource, nextTheme, toggleTheme }),
    [theme, themeSource, nextTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

#### LanguageProvider.tsx (lines 30-36)

**현재 코드:**
```tsx
const t = (key: string, values?: TranslationValues) =>
  getTranslation(language, key, values);

return (
  <LanguageContext.Provider value={{ language, setLanguage, t }}>
    {children}
  </LanguageContext.Provider>
);
```

**문제점:**
- `t` 함수가 매 렌더링마다 새로 생성됨
- `value` 객체도 매 렌더링마다 새로 생성됨

**개선 코드:**
```tsx
import { useMemo, useCallback } from "react";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // 초기화 로직 (try-catch 추가)
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && stored in SUPPORTED_LANGUAGES) {
        return stored as Language;
      }
    } catch {
      // Private browsing 등에서 localStorage 접근 실패 시
    }

    const browserLang = navigator.language.split("-")[0];
    return browserLang in SUPPORTED_LANGUAGES
      ? (browserLang as Language)
      : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // localStorage 쓰기 실패 무시
    }
    document.documentElement.lang = language;
  }, [language]);

  // useCallback으로 t 함수 메모이제이션
  const t = useCallback(
    (key: string, values?: TranslationValues) =>
      getTranslation(language, key, values),
    [language]
  );

  // useMemo로 context 값 메모이제이션
  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
```

---

### 1.2 useImageConversion 무한 루프 위험

#### useImageConversion.ts (lines 57-74)

**현재 코드:**
```tsx
const convert = useCallback(() => {
  if (!workerRef.current) return;
  setState((prev) => ({
    ...prev,
    status: "converting",
    error: null,
    progress: "Converting...",
  }));
  workerRef.current.postMessage(fileData);
}, [fileData]);  // ← fileData가 변경될 때마다 convert 재생성

useEffect(() => {
  if (state.status === "idle") {
    convert();
  }
}, [state.status, convert]);  // ← convert 변경 시 effect 재실행
```

**문제점:**
- `Converter.tsx:27`에서 `new Uint8Array(data)` 호출로 매 렌더링마다 새 참조 생성
- `convert` 콜백이 재생성되어 무한 변환 가능성

**개선 코드:**
```tsx
// useImageConversion.ts
export function useImageConversion(fileData: Uint8Array) {
  const [state, setState] = useState<ConversionState>({
    status: "idle",
    error: null,
    convertedData: null,
    convertedSize: 0,
    progress: "",
  });

  const workerRef = useRef<Worker | null>(null);
  // fileData를 ref로 관리하여 참조 안정성 확보
  const fileDataRef = useRef(fileData);

  // fileData가 실제로 변경되었을 때만 ref 업데이트
  useEffect(() => {
    fileDataRef.current = fileData;
  }, [fileData]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/conversion.worker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (event) => {
      const { type, data, error } = event.data;

      if (type === "success") {
        setState({
          status: "converted",
          error: null,
          progress: "Conversion complete",
          convertedData: data,
          convertedSize: data.byteLength,
        });
      } else if (type === "error") {
        setState((prev) => ({
          ...prev,
          error: error,
          status: "error",
        }));
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // 의존성에서 fileData 제거, ref 사용
  const convert = useCallback(() => {
    if (!workerRef.current) return;

    setState((prev) => ({
      ...prev,
      status: "converting",
      error: null,
      progress: "Converting...",
    }));

    workerRef.current.postMessage(fileDataRef.current);
  }, []);

  // 초기 변환 시작 - 마운트 시 한 번만 실행
  const hasStartedRef = useRef(false);
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      convert();
    }
  }, [convert]);

  const retry = useCallback(() => {
    setState({
      status: "idle",
      error: null,
      convertedData: null,
      convertedSize: 0,
      progress: "",
    });
    // retry 시 바로 convert 호출
    convert();
  }, [convert]);

  return {
    ...state,
    retry,
  };
}
```

**Converter.tsx 개선:**
```tsx
// useMemo로 Uint8Array 참조 안정화
const fileDataMemo = useMemo(() => new Uint8Array(data), [data]);

const {
  status,
  error,
  convertedData,
  convertedSize,
  retry,
} = useImageConversion(fileDataMemo);
```

---

### 1.3 LanguageSelect - Object.entries 메모이제이션

#### LanguageSelect.tsx (lines 64-80)

**현재 코드:**
```tsx
{Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
  <Select.Item key={code} value={code} /* ... */>
    <Select.ItemText>{name}</Select.ItemText>
  </Select.Item>
))}
```

**문제점:**
- `Object.entries(SUPPORTED_LANGUAGES)`가 매 렌더링마다 새 배열 생성

**개선 코드:**
```tsx
import { useMemo } from "react";

export function LanguageSelect() {
  const { language, setLanguage } = useLanguage();

  // 언어 목록 메모이제이션
  const languageEntries = useMemo(
    () => Object.entries(SUPPORTED_LANGUAGES) as [Language, string][],
    []
  );

  return (
    <Select.Root /* ... */>
      {/* ... */}
      <Select.Popup /* ... */>
        {languageEntries.map(([code, name]) => (
          <Select.Item key={code} value={code} /* ... */>
            <Select.ItemText>{name}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.Popup>
    </Select.Root>
  );
}
```

---

## 2. 에러 처리 개선 (High)

### 2.1 localStorage 에러 처리 누락

#### LanguageProvider.tsx (lines 13-27)

**현재 코드:**
```tsx
const [language, setLanguage] = useState<Language>(() => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);  // ← try-catch 없음
  // ...
});

useEffect(() => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);  // ← try-catch 없음
  // ...
}, [language]);
```

**문제점:**
- Safari Private Browsing, localStorage 할당량 초과 등에서 에러 발생 가능
- 앱 크래시 원인이 될 수 있음

**개선 코드:**
```tsx
// utils/storage.ts - 안전한 localStorage 래퍼 생성
export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

// LanguageProvider.tsx
import { safeGetItem, safeSetItem } from "../utils/storage";

const [language, setLanguage] = useState<Language>(() => {
  const stored = safeGetItem(LANGUAGE_STORAGE_KEY);
  if (stored && stored in SUPPORTED_LANGUAGES) {
    return stored as Language;
  }
  // ...
});

useEffect(() => {
  safeSetItem(LANGUAGE_STORAGE_KEY, language);
  document.documentElement.lang = language;
}, [language]);
```

---

### 2.2 ImagePreview Blob 에러 구체화

#### ImagePreview.tsx (lines 25-36)

**현재 코드:**
```tsx
useEffect(() => {
  try {
    const blob = new Blob([data], { type: file.type });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  } catch {
    setError("Failed to load image preview");  // ← 하드코딩된 에러 메시지
  }
}, [data, file.type]);
```

**개선 코드:**
```tsx
import { useLanguage } from "../hooks/useLanguage";

export function ImagePreview({ file: loadedFile, onDelete }: ImagePreviewProps) {
  const { t } = useLanguage();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { file, data } = loadedFile;

  useEffect(() => {
    try {
      const blob = new Blob([data], { type: file.type });
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
      setError(null);  // 성공 시 에러 초기화
      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (err) {
      // 더 구체적인 에러 메시지
      const message = err instanceof Error
        ? t("preview.loadError", { detail: err.message })
        : t("preview.loadError.unknown");
      setError(message);
    }
  }, [data, file.type, t]);

  // ...
}
```

---

## 3. 접근성(A11y) 개선 (High)

### 3.1 Dropzone 키보드 및 스크린리더 접근성

#### Dropzone.tsx (lines 76-81)

**현재 코드:**
```tsx
return (
  <DropzoneContainer {...getRootProps()}>
    <input {...getInputProps()} />
    <DropzoneText>{message}</DropzoneText>
  </DropzoneContainer>
);
```

**문제점:**
- `role`, `aria-label` 누락
- 스크린리더 사용자에게 목적 전달 불가

**개선 코드:**
```tsx
return (
  <DropzoneContainer
    {...getRootProps()}
    role="button"
    aria-label={t("dropzone.ariaLabel")}
    aria-describedby="dropzone-description"
    tabIndex={0}
  >
    <input {...getInputProps()} aria-label={t("dropzone.inputAriaLabel")} />
    <DropzoneText id="dropzone-description">
      {message}
    </DropzoneText>
    {/* 스크린리더 전용 상태 안내 */}
    <span className="sr-only" aria-live="polite">
      {isLoading ? t("dropzone.processing") : ""}
    </span>
  </DropzoneContainer>
);

// CSS (sr-only 클래스)
// .sr-only {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   border: 0;
// }
```

---

### 3.2 ProgressIndicator ARIA 속성

#### ProgressIndicator.tsx (lines 46-101)

**현재 코드:**
```tsx
return (
  <div style={{ /* ... */ }}>
    <div style={{ /* ... */ }}>
      {!isComplete ? (
        <div style={{ /* spinner */ }} />
      ) : (
        <span>✓</span>
      )}
      <span style={{ /* ... */ }}>{phase}</span>
    </div>
    {/* ... */}
  </div>
);
```

**문제점:**
- 스피너에 `role="status"` 없음
- 상태 변경 시 스크린리더 알림 없음

**개선 코드:**
```tsx
export function ProgressIndicator({
  phase,
  fileSize,
  originalSize,
  convertedSize,
  isComplete,
}: ProgressIndicatorProps) {
  const { t } = useLanguage();

  // ...

  return (
    <div
      style={{ /* ... */ }}
      role="status"
      aria-live="polite"
      aria-busy={!isComplete}
      aria-label={isComplete ? t("conversion.complete") : t("conversion.inProgress")}
    >
      <div style={{ /* ... */ }}>
        {!isComplete ? (
          <div
            style={{ /* spinner */ }}
            role="progressbar"
            aria-valuetext={phase}
          />
        ) : (
          <span aria-hidden="true">✓</span>
        )}
        <span style={{ /* ... */ }}>
          {phase}
        </span>
      </div>
      <span
        style={{ /* ... */ }}
        aria-label={t("conversion.sizeInfo")}
      >
        {sizeDisplay}
      </span>
    </div>
  );
}
```

---

### 3.3 ConversionError 에러 알림

#### ConversionError.tsx (lines 13-24)

**현재 코드:**
```tsx
return (
  <ConversionErrorContainer>
    <ErrorText>{error || t("conversion.error")}</ErrorText>
    <ConversionButton onClick={onRetry}>
      {t("conversion.retry")}
    </ConversionButton>
  </ConversionErrorContainer>
);
```

**개선 코드:**
```tsx
return (
  <ConversionErrorContainer
    role="alert"
    aria-live="assertive"
  >
    <ErrorText>{error || t("conversion.error")}</ErrorText>
    <ConversionButton
      onClick={onRetry}
      aria-label={t("conversion.retry.ariaLabel")}
    >
      {t("conversion.retry")}
    </ConversionButton>
  </ConversionErrorContainer>
);
```

---

### 3.4 터치 타겟 크기 개선

#### StyledComponents.tsx - DeleteButton

**현재:** 30x30px

**개선:**
```tsx
export const DeleteButton = styled("button")({
  position: "absolute",
  top: "-10px",
  right: "-10px",
  width: "44px",      // WCAG 권장
  height: "44px",     // WCAG 권장
  minWidth: "44px",   // 최소 터치 영역 보장
  minHeight: "44px",
  borderRadius: "50%",
  // ...
});
```

---

## 4. 타입 안전성 개선 (Medium)

### 4.1 downloadUtils.ts @ts-expect-error 제거

#### downloadUtils.ts (lines 22-26)

**현재 코드:**
```tsx
// @ts-expect-error TS2322: Type 'Uint8Array<ArrayBufferLike>' is not assignable to type 'BlobPart'.
const blob = new Blob([data], { type: "image/webp" });
```

**개선 코드:**
```tsx
export function downloadWebP(data: Uint8Array, filename: string): void {
  // ArrayBuffer로 변환하여 타입 문제 해결
  const blob = new Blob([data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)], {
    type: "image/webp",
  });
  downloadBlob(blob, filename);
}
```

---

### 4.2 Footer.tsx 이중 타입 단언 개선

**현재 코드:**
```tsx
const aboutContent = t("footer.aboutContent") as unknown as string[];
```

**개선 코드:**
```tsx
// config/translations.ts에서 타입 정의 개선
interface TranslationResult {
  // 단일 문자열 또는 문자열 배열 지원
  (key: string, values?: TranslationValues): string | string[];
}

// Footer.tsx
const rawContent = t("footer.aboutContent");
const aboutContent = Array.isArray(rawContent) ? rawContent : [rawContent];
```

---

## 5. 테스트 커버리지 개선 (Medium)

### 5.1 누락된 테스트

| 파일 | 테스트 필요 항목 |
|------|-----------------|
| `hooks/useImageConversion.ts` | 상태 전이, Worker 메시지 처리, 에러 핸들링 |
| `hooks/usePersistedState.ts` | localStorage 읽기/쓰기, 검증 함수, storage 이벤트 |
| `hooks/useSystemTheme.ts` | 미디어 쿼리 변경 감지 |
| `contexts/ThemeProvider.tsx` | 테마 토글, 시스템 테마 동기화 |
| `contexts/LanguageProvider.tsx` | 언어 변경, 번역 함수 |
| `components/ErrorBoundary.tsx` | 에러 캐치, 복구 UI |

### 5.2 테스트 예시

```tsx
// hooks/useImageConversion.test.ts
import { renderHook, act, waitFor } from "@testing-library/react";
import { useImageConversion } from "./useImageConversion";

describe("useImageConversion", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("초기 상태가 idle이어야 함", () => {
    const { result } = renderHook(() =>
      useImageConversion(new Uint8Array([1, 2, 3]))
    );
    expect(result.current.status).toBe("idle");
  });

  it("변환 성공 시 converted 상태로 전환", async () => {
    const { result } = renderHook(() =>
      useImageConversion(new Uint8Array([1, 2, 3]))
    );

    // Worker mock이 success 메시지 전송
    await waitFor(() => {
      expect(result.current.status).toBe("converted");
    });
  });

  it("retry 호출 시 재변환 시작", async () => {
    const { result } = renderHook(() =>
      useImageConversion(new Uint8Array([1, 2, 3]))
    );

    // 에러 상태 시뮬레이션 후
    act(() => {
      result.current.retry();
    });

    expect(result.current.status).toBe("converting");
  });
});
```

---

## 우선순위 정리

| 우선순위 | 영역 | 파일 | 영향도 |
|---------|------|------|--------|
| Critical | Context 메모이제이션 | `ThemeProvider.tsx`, `LanguageProvider.tsx` | 성능 |
| Critical | useImageConversion 루프 | `useImageConversion.ts`, `Converter.tsx` | 버그 |
| High | localStorage 에러 처리 | `LanguageProvider.tsx` | 안정성 |
| High | Dropzone 접근성 | `Dropzone.tsx` | A11y |
| High | ProgressIndicator ARIA | `ProgressIndicator.tsx` | A11y |
| Medium | 타입 단언 개선 | `downloadUtils.ts`, `Footer.tsx` | 유지보수 |
| Medium | 테스트 추가 | hooks, contexts | 품질 |
| Low | 터치 타겟 크기 | `StyledComponents.tsx` | UX |
