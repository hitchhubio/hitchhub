import { promises as fs } from 'node:fs';
import type { TokenBuilderPlatform } from '@hitchhub/token-builder';
import {
  buildTokens,
  createPlatformCss,
  createPlatformTailwindTheme,
  createPlatformTypeScript,
  createPlatformTypeScriptConsts,
} from '@hitchhub/token-builder';
import { meta } from '@hitchhub/tokens';
import { outputFile } from 'fs-extra';
import { compile } from 'json-schema-to-typescript';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { tokensUnresolvedSchema } from './validation/schema/index.js';
import { validateDesignTokensSchema } from './validation/validate-schema.js';

async function validateAndBuildTokens({
  source,
  tokens,
  platforms,
}: {
  source: string[];
  tokens?: any;
  platforms: TokenBuilderPlatform[];
}) {
  await validateDesignTokensSchema({ source, tokens });
  await buildTokens({ source, tokens, platforms });
}

async function convertZodSchemaToTypeScriptString(
  schema: any, // TODO: type
): Promise<string> {
  const jsonSchema = zodToJsonSchema(schema, {
    $refStrategy: 'none',
    target: 'openApi3',
  });

  return await compile(jsonSchema, 'Tokens', {
    bannerComment: '',
    unknownAny: false,
    style: {
      singleQuote: true,
    },
  });
}

export async function buildTheme({
  themeId,
  sourceFolder,
  outputFolderCss,
  outputFolderTypeScript,
}: {
  themeId: string;
  sourceFolder: string;
  outputFolderCss: string;
  outputFolderTypeScript: string;
}) {
  // light: string
  // dark?: string

  const prefix = 'hh';

  const tsSchema = await convertZodSchemaToTypeScriptString(
    tokensUnresolvedSchema,
  );

  await outputFile(`${outputFolderTypeScript}/schema.ts`, tsSchema);

  const tokensSchemaImport = `import { Tokens } from "./schema.js";`;

  await validateAndBuildTokens({
    source: [`${sourceFolder}/light/**/*.json`],
    tokens: meta.light.unresolved,
    platforms: [
      createPlatformCss({
        prefix,
        selector: `[data-theme="${themeId}-light"]`,
        outputFolder: outputFolderCss,
        outputFilename: 'light.css',
      }),
      createPlatformTypeScript({
        header: tokensSchemaImport,
        exportName: 'metaLight',
        exportType: 'Tokens',
        outputFolder: outputFolderTypeScript,
        outputFilename: 'meta-light.ts',
        outputReferences: false,
      }),
      createPlatformTypeScriptConsts({
        prefix,
        camelCase: true,
        outputFolder: outputFolderTypeScript,
        outputFilename: 'tokens-light.ts',
      }),
    ],
  });

  await validateAndBuildTokens({
    source: [`${sourceFolder}/light/**/*.json`],
    tokens: meta.light.unresolved,
    platforms: [
      createPlatformTypeScript({
        header: tokensSchemaImport,
        exportName: 'metaLightUnresolved',
        exportType: 'Tokens',
        outputFolder: outputFolderTypeScript,
        outputFilename: 'meta-light-unresolved.ts',
        outputReferences: true,
      }),
    ],
  });

  await validateAndBuildTokens({
    source: [`${sourceFolder}/dark/**/*.json`],
    tokens: meta.dark.unresolved,
    platforms: [
      createPlatformCss({
        prefix,
        selector: `[data-theme="${themeId}-dark"]`,
        outputFolder: outputFolderCss,
        outputFilename: 'dark.css',
      }),
      createPlatformTypeScript({
        header: tokensSchemaImport,
        exportName: 'metaDark',
        exportType: 'Tokens',
        outputFolder: outputFolderTypeScript,
        outputFilename: 'meta-dark.ts',
        outputReferences: false,
      }),
      createPlatformTypeScriptConsts({
        prefix,
        camelCase: true,
        outputFolder: outputFolderTypeScript,
        outputFilename: 'tokens-dark.ts',
      }),
    ],
  });

  await validateAndBuildTokens({
    source: [`${sourceFolder}/dark/**/*.json`],
    tokens: meta.dark.unresolved,
    platforms: [
      createPlatformTypeScript({
        header: tokensSchemaImport,
        exportName: 'metaDarkUnresolved',
        exportType: 'Tokens',
        outputFolder: outputFolderTypeScript,
        outputFilename: 'meta-dark-unresolved.ts',
        outputReferences: true,
      }),
    ],
  });

  const lightCss = await fs.readFile(`${outputFolderCss}/light.css`, 'utf8');

  const lightCssRoot = lightCss.replace(
    `[data-theme="${themeId}-light"]`,
    ':root',
  );

  const darkCss = await fs.readFile(`${outputFolderCss}/dark.css`, 'utf8');

  await outputFile(
    `${outputFolderCss}/theme.css`,
    [lightCssRoot, darkCss].join('\n'),
  );

  await validateAndBuildTokens({
    source: [`${sourceFolder}/light/**/*.json`],
    tokens: meta.light.unresolved,
    platforms: [
      createPlatformTailwindTheme({
        prefix,
        outputFolder: outputFolderCss,
        outputFilename: 'tailwind.css',
      }),
    ],
  });
}
