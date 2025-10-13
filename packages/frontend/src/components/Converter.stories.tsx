import type { Meta, StoryObj } from '@storybook/react';
import { Converter } from './Converter';
import { mockSmallFile, mockMediumFile, mockLargeFile } from '../__mocks__/mockFiles';
import { MockLanguageProvider } from '../__mocks__/mockContexts';

const meta = {
  title: 'Conversion/Converter',
  component: Converter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px', maxWidth: '95vw' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Converter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IdleState: Story = {
  loaders: [
    async () => ({
      mockFile: await mockSmallFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <Converter {...args} file={mockFile} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Converter in idle state with Convert button ready. Click "Convert to WebP" to start conversion.',
      },
    },
  },
};

// Idle 상태 한국어 - 신규 추가
export const IdleStateKorean: Story = {
  loaders: [
    async () => ({
      mockFile: await mockSmallFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <Converter {...args} file={mockFile} />
  ),
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
        story: 'Converter in idle state with Korean UI',
      },
    },
  },
};

export const MediumFile: Story = {
  loaders: [
    async () => ({
      mockFile: await mockMediumFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <Converter {...args} file={mockFile} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Converter with a medium-sized file (5MB). Note: Actual conversion requires Web Worker which is not available in Storybook.',
      },
    },
  },
};

export const LargeFile: Story = {
  loaders: [
    async () => ({
      mockFile: await mockLargeFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <Converter {...args} file={mockFile} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Converter with a large file (50MB). Shows memory warning for files over recommended size.',
      },
    },
  },
};

export const WithMemoryWarning: Story = {
  loaders: [
    async () => ({
      mockFile: await mockLargeFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <Converter {...args} file={mockFile} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Converter displaying memory warning for large files (>100MB recommended limit)',
      },
    },
  },
};

// 메모리 경고 한국어 - 신규 추가
export const WithMemoryWarningKorean: Story = {
  loaders: [
    async () => ({
      mockFile: await mockLargeFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <Converter {...args} file={mockFile} />
  ),
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
        story: 'Converter displaying memory warning for large files - Korean',
      },
    },
  },
};
