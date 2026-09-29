import type { Preview } from '@storybook/react-vite';
import '@hitchhub/theme-default/theme.css';
import '../src/styles.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div data-theme="default-light" style={{ padding: 48 }}>
        <Story />
      </div>
    ),
  ],
};
export default preview;
