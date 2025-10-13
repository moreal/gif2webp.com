import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Dropzone } from './Dropzone';
import { MockLanguageProvider } from '../__mocks__/mockContexts';

const meta = {
  title: 'File Management/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onUpload: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', maxWidth: '90vw' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default dropzone state. Drag and drop GIF files or click to select.',
      },
    },
  },
};

export const DragActive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dropzone when files are being dragged over it. (Simulate by dragging files over the component)',
      },
    },
  },
};

export const LoadingState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dropzone in loading state while processing files. This state is shown automatically when files are being read.',
      },
    },
  },
};

// 에러 메시지 영어
export const ErrorFileSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state when uploaded file exceeds maximum size limit (512MB) - English',
      },
    },
  },
};

// 에러 메시지 한국어 - 신규 추가
export const ErrorFileSizeKorean: Story = {
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
        story: 'Error state when uploaded file exceeds maximum size limit (512MB) - Korean',
      },
    },
  },
};

export const ErrorFileType: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state when uploaded file is not a GIF image - English',
      },
    },
  },
};

// 에러 타입 한국어 - 신규 추가
export const ErrorFileTypeKorean: Story = {
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
        story: 'Error state when uploaded file is not a GIF image - Korean',
      },
    },
  },
};
