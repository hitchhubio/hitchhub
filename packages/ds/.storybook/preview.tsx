import { WireframeBox } from '@hitchhub-react/wireframe';
import type { Preview } from '@storybook/react';
import React, { useState } from 'react';
import { Box, BoxProvider } from '../src';
import '@hitchhub/theme-default/theme.css';
import '../styles.css';
import './global.css';

function BoxSwitcher({ children }: { children: React.ReactNode }) {
  const [box, setBox] = useState<boolean>(false);

  return (
    <BoxProvider box={box ? WireframeBox : Box}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <button onClick={() => setBox(false)}>Default</button>
          <button onClick={() => setBox(true)}>Wireframe</button>
        </div>
        <div>{children}</div>
      </div>
    </BoxProvider>
  );
}

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
      <BoxSwitcher>
        <Story />
      </BoxSwitcher>
    ),
  ],
};

export default preview;
