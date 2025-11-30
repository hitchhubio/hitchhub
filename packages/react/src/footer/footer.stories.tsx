import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './footer';

const meta = {
  title: 'layout/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Footer content',
  },
};
