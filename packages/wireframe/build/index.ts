import { createTheme } from '@hitchhub/tailwind';
import { __unstable__loadDesignSystem } from 'tailwindcss';

function main() {
  const theme = createTheme();

  console.log(theme);
}

main();
