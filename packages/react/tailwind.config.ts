import { createTheme } from '@hitchhub/tailwind';
import { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'hh-',
  content: ['./src/**/*.tsx'],
  theme: createTheme(),
  plugins: [],
};

export default config;
