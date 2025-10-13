import type { Meta, StoryObj } from '@storybook/react';
import { ProgressIndicator } from './ProgressIndicator';
import { MockLanguageProvider } from '../__mocks__/mockContexts';

const meta = {
  title: 'Conversion/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px', maxWidth: '95vw' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Converting: Story = {
  args: {
    phase: 'Converting...',
    fileSize: 5 * 1024 * 1024, // 5MB
    isComplete: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress indicator showing conversion in progress',
      },
    },
  },
};

// 변환 중 한국어 - 신규 추가
export const ConvertingKorean: Story = {
  args: {
    phase: '변환 중...',
    fileSize: 5 * 1024 * 1024,
    isComplete: false,
  },
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
        story: 'Progress indicator showing conversion in progress - Korean',
      },
    },
  },
};

export const Complete: Story = {
  args: {
    phase: 'Conversion complete!',
    fileSize: 3 * 1024 * 1024, // 3MB
    isComplete: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress indicator showing completed conversion with checkmark',
      },
    },
  },
};

// 완료 한국어 - 신규 추가
export const CompleteKorean: Story = {
  args: {
    phase: '변환 완료!',
    fileSize: 3 * 1024 * 1024,
    isComplete: true,
  },
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
        story: 'Progress indicator showing completed conversion with checkmark - Korean',
      },
    },
  },
};

export const SmallFile: Story = {
  args: {
    phase: 'Converting...',
    fileSize: 50 * 1024, // 50KB
    isComplete: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress indicator for a small file (50KB)',
      },
    },
  },
};

export const LargeFile: Story = {
  args: {
    phase: 'Converting...',
    fileSize: 150 * 1024 * 1024, // 150MB
    isComplete: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress indicator for a large file (150MB)',
      },
    },
  },
};
