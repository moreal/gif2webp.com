import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { MockLanguageProvider } from '../__mocks__/mockContexts';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// 영어 버전
export const EnglishLanguage: Story = {
  decorators: [
    (Story) => (
      <MockLanguageProvider language="en">
        <Story />
      </MockLanguageProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header displayed in English language',
      },
    },
  },
};

// 한국어 버전
export const KoreanLanguage: Story = {
  decorators: [
    (Story) => (
      <MockLanguageProvider language="ko">
        <Story />
      </MockLanguageProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Header displayed in Korean language',
      },
    },
  },
};
