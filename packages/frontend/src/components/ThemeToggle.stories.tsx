import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { MockThemeProvider } from '../__mocks__/mockContexts';

const meta = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 상태 - 글로벌 decorator 사용
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle button that cycles through light/dark modes. Click to toggle theme.',
      },
    },
  },
};

// Light 테마 상태
export const LightTheme: Story = {
  decorators: [
    (Story) => (
      <MockThemeProvider theme="light" themeSource="user">
        <Story />
      </MockThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle in light mode showing sun icon',
      },
    },
  },
};

// Dark 테마 상태
export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <MockThemeProvider theme="dark" themeSource="user">
        <Story />
      </MockThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle in dark mode showing moon icon',
      },
    },
  },
};

// System 테마 상태 (Light)
export const WithSystemPreference: Story = {
  decorators: [
    (Story) => (
      <MockThemeProvider theme="light" themeSource="system">
        <Story />
      </MockThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'When using system theme preference, displays "(System)" label with light theme',
      },
    },
  },
};

// System 테마 상태 (Dark) - 신규 추가
export const DarkWithSystemPreference: Story = {
  decorators: [
    (Story) => (
      <MockThemeProvider theme="dark" themeSource="system">
        <Story />
      </MockThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Dark theme with system preference indicator',
      },
    },
  },
};
