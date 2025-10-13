import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { FileList } from './FileList';
import { mockFileList, mockSmallFile } from '../__mocks__/mockFiles';

const meta = {
  title: 'File Management/FileList',
  component: FileList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onDelete: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', maxWidth: '95vw' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    files: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty file list with no uploaded files',
      },
    },
  },
};

export const SingleFile: Story = {
  args: {
    files: [mockSmallFile],
  },
  parameters: {
    docs: {
      description: {
        story: 'File list with a single uploaded file',
      },
    },
  },
};

export const MultipleFiles: Story = {
  args: {
    files: mockFileList,
  },
  parameters: {
    docs: {
      description: {
        story: 'File list with multiple uploaded files',
      },
    },
  },
};
