import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/contexts/ThemeProvider';
import { LanguageProvider } from '../src/contexts/LanguageProvider';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LanguageProvider>
          <div style={{
            minHeight: '100vh',
            padding: '1rem',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)'
          }}>
            <Story />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
