import type { Preview } from '@storybook/react';
import React from 'react';
import '@hitchhub/theme-default/theme.css';
import '@hitchhub-react/ds/styles.css';
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
  decorators: [(Story) => <Story />],
};

export default preview;
