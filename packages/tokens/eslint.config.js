import { eslintConfig } from '@aaos/eslint-config';

export default [
  ...eslintConfig,
  {
    ignores: ['dist/**/*'],
  },
];
