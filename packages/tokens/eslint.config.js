import { eslintConfig } from '@aaos/eslint-config';

export default [
  {
    ignores: ['dist/**/*.ts'],
  },
  ...eslintConfig,
];
