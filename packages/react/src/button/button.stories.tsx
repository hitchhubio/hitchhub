import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { fn } from 'storybook/test';

const meta = {
  title: 'form/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onClick: fn(),
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};
