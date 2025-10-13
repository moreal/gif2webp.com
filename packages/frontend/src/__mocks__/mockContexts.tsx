import React, { type ReactNode } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import type { Theme } from '../types/theme';
import type { Language } from '../config/i18n';
import { getTranslation, type TranslationValues } from '../config/translations';

// Mock ThemeProvider Props
interface MockThemeProviderProps {
  theme?: Theme;
  themeSource?: 'user' | 'system';
  children: ReactNode;
}

/**
 * MockThemeProvider - Story별로 특정 테마 상태를 제공
 *
 * @param theme - 'light' | 'dark'
 * @param themeSource - 'user' | 'system'
 * @param children - React children
 */
export function MockThemeProvider({
  theme = 'light',
  themeSource = 'user',
  children,
}: MockThemeProviderProps) {
  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
  const toggleTheme = () => {
    console.log('Theme toggled in story (mock)');
  };

  // 테마 변경 시 data-theme 속성 업데이트
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeSource,
        nextTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Mock LanguageProvider Props
interface MockLanguageProviderProps {
  language?: Language;
  children: ReactNode;
}

/**
 * MockLanguageProvider - Story별로 특정 언어를 제공
 *
 * @param language - 'en' | 'ko'
 * @param children - React children
 */
export function MockLanguageProvider({
  language = 'en',
  children,
}: MockLanguageProviderProps) {
  const setLanguage = (lang: Language) => {
    console.log('Language changed in story (mock):', lang);
  };

  const t = (key: string, values?: TranslationValues) =>
    getTranslation(language, key, values);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Combined Mock Provider Props
interface MockProvidersProps {
  theme?: Theme;
  themeSource?: 'user' | 'system';
  language?: Language;
  children: ReactNode;
}

/**
 * MockProviders - 테마와 언어를 동시에 모킹하는 통합 Provider
 *
 * @param theme - 'light' | 'dark'
 * @param themeSource - 'user' | 'system'
 * @param language - 'en' | 'ko'
 * @param children - React children
 */
export function MockProviders({
  theme = 'light',
  themeSource = 'user',
  language = 'en',
  children,
}: MockProvidersProps) {
  return (
    <MockThemeProvider theme={theme} themeSource={themeSource}>
      <MockLanguageProvider language={language}>
        {children}
      </MockLanguageProvider>
    </MockThemeProvider>
  );
}
