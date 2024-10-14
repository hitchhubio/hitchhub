import camelCase from 'camelcase';
import StyleDictionary, { PlatformConfig, Token } from 'style-dictionary';
import { Config } from 'style-dictionary/types';
import { cssVariableConstsFormatter } from './formatters/css-variable-consts.js';
import { cssVariableObjectFormatter } from './formatters/css-variable-object.js';
import { dtcgFormatter } from './formatters/dtcg.js';
import { typeScriptConstsFormatter } from './formatters/typescript-consts.js';
import { typeScriptFormatter } from './formatters/typescript.js';

export type TokenBuilderPlatform = {
  id: string;
  configure: () => PlatformConfig;
};

export type TokenBuilderOptions = {
  source?: string[];
  tokens?: any;
  platforms: TokenBuilderPlatform[];
};

function createPlatforms(platformConfig: TokenBuilderPlatform[]) {
  const platforms: Record<string, PlatformConfig> = {};

  for (const platform of platformConfig) {
    platforms[platform.id] = platform.configure();
  }

  return platforms;
}

function createRemoveTierTransformer({
  format,
}: {
  format: 'kebab' | 'pascal';
}) {
  return function (token: Token) {
    if (!token.name) {
      throw new Error(`Token has no name.`);
    }

    if (!token.attributes?.category) {
      throw new Error(`Token ${token.name} has no category.`);
    }

    const category = token.attributes?.category as string;

    if (!['primitive', 'semantic', 'component'].includes(category)) {
      throw new Error(
        `Token ${token.name} has an invalid category '${category}'.`,
      );
    }

    if (format === 'pascal') {
      return token.name.replace(camelCase(category, { pascalCase: true }), '');
    }

    return token.name.replace(`-${category}-`, '-');
  };
}

async function build({ source, tokens, platforms }: TokenBuilderOptions) {
  const config: Config = {
    source,
    tokens,
    platforms: createPlatforms(platforms),
  };

  const styleDictionary = new StyleDictionary(config, { verbosity: 'verbose' });

  styleDictionary.registerFileHeader({
    name: 'auto-generated',
    fileHeader() {
      return ['This file was auto-generated.'];
    },
  });

  // Remove 'primitive', 'semantic', or 'component' tier name from the token name
  styleDictionary.registerTransform({
    name: 'name/remove-tier-kebab',
    type: 'name',
    filter() {
      return true;
    },
    transform: createRemoveTierTransformer({ format: 'kebab' }),
  });

  styleDictionary.registerTransform({
    name: 'name/remove-tier-pascal',
    type: 'name',
    filter() {
      return true;
    },
    transform: createRemoveTierTransformer({ format: 'pascal' }),
  });

  styleDictionary.registerTransform({
    name: 'lineHeight/percentage',
    type: 'value',
    filter(token) {
      return token.attributes?.item === 'lineHeight';
    },
    transform(token) {
      const percent = Math.round(token.$value * 100);
      return `${percent}%`;
    },
  });

  styleDictionary.registerTransform({
    name: 'letterSpacing/em',
    type: 'value',
    filter(token) {
      return token.attributes?.item === 'letterSpacing';
    },
    transform(token) {
      const parsed = Number(token.$value.replace('rem', ''));
      return `${parsed}em`;
    },
  });

  styleDictionary.registerTransform({
    name: 'letterSpacing/percentage',
    type: 'value',
    filter(token) {
      return token.attributes?.item === 'letterSpacing';
    },
    transform(token) {
      const parsed = Number(token.$value.replace('rem', ''));
      return `${parsed * 100}%`;
    },
  });

  styleDictionary.registerTransform({
    name: 'fontSize/px',
    type: 'value',
    filter: (token) =>
      token.attributes?.type === 'font' && token.attributes?.item === 'size',
    transform: (token) => {
      const parsed = Number(token.$value.replace('rem', ''));
      return `${parsed * 16}px`;
    },
  });

  styleDictionary.registerTransformGroup({
    name: 'css/custom',
    transforms: [
      'attribute/cti',
      'name/kebab',
      'fontFamily/css',
      'typography/css/shorthand',
      'shadow/css/shorthand',
      'name/remove-tier-kebab',
      'letterSpacing/em',
    ],
  });

  styleDictionary.registerTransformGroup({
    name: 'typeScript/consts',
    transforms: ['attribute/cti', 'name/pascal', 'name/remove-tier-pascal'],
  });

  styleDictionary.registerTransformGroup({
    name: 'figma',
    transforms: [
      'attribute/cti',
      'name/pascal',
      'size/rem',
      'lineHeight/percentage',
      'color/hex',
      'fontFamily/css',
      'shadow/css/shorthand',
      'letterSpacing/percentage',
      'fontSize/px',
    ],
  });

  styleDictionary.registerFormat({
    name: 'dtcg',
    format: dtcgFormatter,
  });

  styleDictionary.registerFormat({
    name: 'typeScript/object',
    format: typeScriptFormatter,
  });

  styleDictionary.registerFormat({
    name: 'typeScript/consts',
    format: typeScriptConstsFormatter,
  });

  styleDictionary.registerFormat({
    name: 'css/variable-object',
    format: cssVariableObjectFormatter,
  });

  styleDictionary.registerFormat({
    name: 'css/variable-consts',
    format: cssVariableConstsFormatter,
  });

  await styleDictionary.buildAllPlatforms();
}

export async function buildTokens({
  source = [],
  tokens = {},
  platforms,
}: TokenBuilderOptions) {
  await build({ source, tokens, platforms });
}
