import type { Preview } from '@storybook/react';
import '@hitchhub/theme-default/theme.css';
import './global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
