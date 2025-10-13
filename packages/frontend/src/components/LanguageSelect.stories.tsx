import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSelect } from './LanguageSelect';
import { MockLanguageProvider } from '../__mocks__/mockContexts';

const meta = {
  title: 'UI/LanguageSelect',
  component: LanguageSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// 영어 선택 상태
export const EnglishSelected: Story = {
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
        story: 'Language selector with English selected',
      },
    },
  },
};

// 한국어 선택 상태
export const KoreanSelected: Story = {
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
        story: 'Language selector with Korean selected',
      },
    },
  },
};
