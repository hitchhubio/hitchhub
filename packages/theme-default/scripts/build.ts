import { buildTheme } from '@hitchhub/theme-builder';
import { createTokenManifest } from '@hitchhub/core';
import { outputFile } from 'fs-extra';

async function main() {
  await buildTheme({
    themeId: 'default',
    sourceFolder: 'tokens',
    outputFolderCss: 'dist',
    outputFolderTypeScript: 'src/dist',
  });

  const [{ metaLight }, { metaLightUnresolved }] = await Promise.all([
    import('../src/dist/meta-light.js'),
    import('../src/dist/meta-light-unresolved.js'),
  ]);

  await outputFile(
    'dist/tokens.json',
    `${JSON.stringify(metaLight, null, 2)}\n`,
  );
  await outputFile(
    'dist/manifest.json',
    `${JSON.stringify(createTokenManifest(metaLightUnresolved, metaLight), null, 2)}\n`,
  );
}

main();
