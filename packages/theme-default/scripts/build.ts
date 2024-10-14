import { buildTheme } from '@hitchhub/theme-builder';

async function main() {
  await buildTheme({
    themeId: 'default',
    sourceFolder: 'tokens',
    outputFolderCss: 'dist',
    outputFolderTypeScript: 'src/dist',
  });
}

main();
