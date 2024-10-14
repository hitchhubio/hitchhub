import { WireframeBox } from '@hitchhub-react/wireframe';
import type { Preview } from '@storybook/react';
import React from 'react';
import { BoxProvider } from '../src';
import '@hitchhub/theme-default/theme.css';
import '../styles.css';
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
  decorators: [
    (Story) => (
      <BoxProvider box={WireframeBox}>
        <Story />
      </BoxProvider>
    ),
  ],
};

export default preview;
