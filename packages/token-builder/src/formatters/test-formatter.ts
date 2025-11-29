import cloneDeepWith from 'lodash/cloneDeepWith';
import type {
  Dictionary,
  PlatformConfig,
  TransformedToken,
  TransformedTokens,
} from 'style-dictionary';
import type { DesignToken, FormatFnArguments } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';

export type TestTokenAttributes = {
  category?: string;
  type?: string;
  item?: string;
  subItem?: string;
  state?: string;
};

export type TestToken = {
  name?: string;
  type: string;
  description?: string;
  comment?: string;
  value: unknown;
  original?: Omit<TestToken, 'original'>;
  attributes?: TestTokenAttributes;
};

export type TestTokens = {
  [key: string]: TestTokens | TestToken;
};

export type TransformedTestTokens = {
  [key: string]: TransformedTestTokens | TestToken;
};

export type FormatterOptions = {
  [key: string]: unknown;
};

function toDesignToken(token: TestToken): DesignToken & { name: string } {
  return {
    name: token.name ?? 'name',
    type: token.type,
    value: token.value,
    $type: token.type,
    $value: token.value,
    $description: token.description,
    comment: token.comment,
    themeable: true,
    attributes: token.attributes,
  };
}

function toTransformedToken(token: TestToken): TransformedToken {
  return {
    ...toDesignToken(token),
    path: token.name ? token.name.split('.') : [],
    original: token.original
      ? toDesignToken(token.original)
      : toDesignToken(token),
    filePath: 'file.json',
    isSource: true,
  };
}

function isTestToken(token: unknown): token is TestToken {
  return token != null && typeof token === 'object' && 'type' in token;
}

function convertTestTokensToTransformedTokens(
  tokens: TestTokens,
): TransformedTokens {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => {
      return isTestToken(value)
        ? [key, toTransformedToken(value)]
        : [key, convertTestTokensToTransformedTokens(value as TestTokens)];
    }),
  );
}

export function testFormatter({
  formatter,
  platformConfig,
}: {
  formatter: (formatArguments: FormatFnArguments) => Promise<string>;
  platformConfig?: PlatformConfig;
}) {
  const fileName = 'file.ts';

  async function format({
    tokens,
    allTokens,
    unfilteredTokens,
    options,
  }: {
    tokens?: TransformedTestTokens;
    allTokens?: TestToken[];
    unfilteredTokens?: TestTokens;
    options?: FormatterOptions;
  }) {
    const dictionary: Dictionary = {
      tokens: tokens
        ? cloneDeepWith(tokens, (value) => {
            if (value && typeof value === 'object' && 'type' in value) {
              return toTransformedToken(value);
            }
          })
        : {},
      allTokens: (allTokens ?? []).map((token) => toTransformedToken(token)),
      unfilteredTokens: unfilteredTokens
        ? convertTestTokensToTransformedTokens(unfilteredTokens)
        : undefined,
      tokenMap: new Map<string, TransformedToken>(),
    };

    return formatter({
      dictionary,
      platform: platformConfig ?? {},
      options: options ?? {},
      file: {
        destination: fileName,
      },
    });
  }

  async function formatString({
    tokens,
    allTokens,
    unfilteredTokens,
    options,
  }: {
    tokens?: TransformedTestTokens;
    allTokens?: TestToken[];
    unfilteredTokens?: TestTokens;
    options?: FormatterOptions;
  }) {
    return await format({ tokens, allTokens, unfilteredTokens, options });
  }

  async function formatArray({
    tokens,
    allTokens,
    unfilteredTokens,
    options,
  }: {
    tokens?: TransformedTestTokens;
    allTokens?: TestToken[];
    unfilteredTokens?: TestTokens;
    options?: FormatterOptions;
  }) {
    const formatted = await format({
      tokens,
      allTokens,
      unfilteredTokens,
      options,
    });
    return formatted.split('\n');
  }

  async function formatObject({
    exportName,
    tokens,
    allTokens,
    unfilteredTokens,
    options,
  }: {
    exportName?: string;
    tokens?: TransformedTestTokens;
    allTokens?: TestToken[];
    unfilteredTokens?: TestTokens;
    options?: FormatterOptions;
  }) {
    const formatted = await format({
      tokens,
      allTokens,
      unfilteredTokens,
      options,
    });
    const header = await fileHeader({ file: { destination: fileName } });

    let value = formatted.replace(header, '').replace(';', '');

    if (exportName) {
      value = value.replace(`export const ${exportName} = `, '');
    }

    return JSON.parse(value.trim());
  }

  return {
    formatString,
    formatArray,
    formatObject,
  };
}
