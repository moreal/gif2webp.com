import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';
import { MockProviders } from '../__mocks__/mockContexts';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer with all interactive elements: About button, GitHub link, Theme toggle, and Language selector',
      },
    },
  },
};

export const WithAboutModal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the "About" button to open the modal',
      },
    },
  },
};

// Dark 테마 + 영어 - 신규 추가
export const DarkThemeEnglish: Story = {
  decorators: [
    (Story) => (
      <MockProviders theme="dark" language="en">
        <Story />
      </MockProviders>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Footer in dark theme with English language',
      },
    },
  },
};

// Dark 테마 + 한국어 - 신규 추가
export const DarkThemeKorean: Story = {
  decorators: [
    (Story) => (
      <MockProviders theme="dark" language="ko">
        <Story />
      </MockProviders>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Footer in dark theme with Korean language',
      },
    },
  },
};

// Light 테마 + 한국어 - 신규 추가
export const LightThemeKorean: Story = {
  decorators: [
    (Story) => (
      <MockProviders theme="light" language="ko">
        <Story />
      </MockProviders>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Footer in light theme with Korean language',
      },
    },
  },
};
