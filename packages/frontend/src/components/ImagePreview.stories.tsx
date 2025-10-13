import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { ImagePreview } from './ImagePreview';
import { mockSmallFile } from '../__mocks__/mockFiles';
import { MockLanguageProvider } from '../__mocks__/mockContexts';

const meta = {
  title: 'File Management/ImagePreview',
  component: ImagePreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onDelete: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', maxWidth: '95vw' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImagePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  loaders: [
    async () => ({
      mockFile: await mockSmallFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <ImagePreview {...args} file={mockFile} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Image preview with converter controls',
      },
    },
  },
};

export const WithConverter: Story = {
  loaders: [
    async () => ({
      mockFile: await mockSmallFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <ImagePreview {...args} file={mockFile} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Image preview showing the full converter interface in idle state',
      },
    },
  },
};

// Converter 포함 한국어 - 신규 추가
export const WithConverterKorean: Story = {
  loaders: [
    async () => ({
      mockFile: await mockSmallFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <ImagePreview {...args} file={mockFile} />
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
        story: 'Image preview showing the full converter interface in idle state - Korean',
      },
    },
  },
};

export const LoadError: Story = {
  loaders: [
    async () => ({
      mockFile: await mockSmallFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <ImagePreview
      {...args}
      file={{
        ...mockFile,
        file: new File([], 'corrupted.gif', { type: 'image/gif' }),
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Image preview when the image fails to load',
      },
    },
  },
};

// 에러 한국어 - 신규 추가
export const LoadErrorKorean: Story = {
  loaders: [
    async () => ({
      mockFile: await mockSmallFile,
    }),
  ],
  render: (args, { loaded: { mockFile } }) => (
    <ImagePreview
      {...args}
      file={{
        ...mockFile,
        file: new File([], 'corrupted.gif', { type: 'image/gif' }),
      }}
    />
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
        story: 'Image preview when the image fails to load - Korean',
      },
    },
  },
};
