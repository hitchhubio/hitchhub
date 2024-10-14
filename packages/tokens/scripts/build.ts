import {
  buildTokens,
  createPlatformCssVariableObject,
  createPlatformTypeScript,
  createPlatformTypeScriptConsts,
} from '@hitchhub/token-builder';

async function main() {
  const prefix = 'hh';

  await buildTokens({
    source: ['tokens/light/**/*.json'],
    platforms: [
      createPlatformTypeScript({
        exportName: 'metaLight',
        outputFolder: './src/dist',
        outputFilename: 'meta-light.ts',
        outputReferences: false,
      }),
    ],
  });

  await buildTokens({
    source: ['tokens/light/**/*.json'],
    platforms: [
      createPlatformTypeScript({
        exportName: 'metaLightUnresolved',
        outputFolder: './src/dist',
        outputFilename: 'meta-light-unresolved.ts',
        outputReferences: true,
      }),
      createPlatformTypeScriptConsts({
        prefix,
        camelCase: true,
        outputFolder: './src/dist',
        outputFilename: 'tokens-light.ts',
      }),
    ],
  });

  await buildTokens({
    source: ['tokens/light/**/*.json', 'tokens/dark/**/*.json'],
    platforms: [
      createPlatformTypeScript({
        exportName: 'metaDark',
        outputFolder: './src/dist',
        outputFilename: 'meta-dark.ts',
        outputReferences: false,
      }),
    ],
  });

  await buildTokens({
    source: ['tokens/light/**/*.json', 'tokens/dark/**/*.json'],
    platforms: [
      createPlatformTypeScript({
        exportName: 'metaDarkUnresolved',
        outputFolder: './src/dist',
        outputFilename: 'meta-dark-unresolved.ts',
        outputReferences: true,
      }),
      createPlatformTypeScriptConsts({
        prefix,
        camelCase: true,
        outputFolder: './src/dist',
        outputFilename: 'tokens-dark.ts',
      }),
    ],
  });

  await buildTokens({
    source: ['tokens/light/**/*.json'],
    platforms: [
      createPlatformCssVariableObject({
        prefix,
        exportName: 'variables',
        outputFolder: './src/dist',
        outputFilename: 'variables.ts',
      }),
    ],
  });
}

main();
