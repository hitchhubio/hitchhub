import type { Dictionary, TransformedTokens } from 'style-dictionary';
import type {
  FormatFnArguments,
  TransformedToken,
} from 'style-dictionary/types';
import { createPropertyFormatter, getReferences } from 'style-dictionary/utils';
import type { CssVariable } from './utilities';
import { toCssVariable, toCssVariableName } from './utilities';

export function toTailwindSetting({
  prefix,
  setting,
  removeRoot = false,
  variable,
}: {
  prefix?: string;
  setting: string;
  removeRoot?: boolean;
  variable: CssVariable;
}): CssVariable {
  let variableName = prefix
    ? variable.name.replace(`--${prefix}-`, '')
    : variable.name.replace('--', '');

  if (removeRoot) {
    variableName = variableName.slice(
      Math.max(0, variableName.indexOf('-') + 1),
    );
  }

  return {
    name: `--${setting}-${variableName}`,
    value: variable.value,
  };
}

function toCssVariableString(name: string) {
  return `var(--${name})`;
}

function toReferencedCssVariable({
  formatter,
  tokens,
  unfilteredTokens,
  token,
  namePostfix,
  valuePostfix,
}: {
  formatter: (token: TransformedToken) => string;
  tokens: TransformedTokens;
  unfilteredTokens?: TransformedTokens;
  token: TransformedToken;
  namePostfix?: string;
  valuePostfix?: string;
}): CssVariable {
  const references = getReferences(
    token.original.$value,
    tokens,
    { unfilteredTokens, warnImmediately: true },
    [],
  );

  if (references.length !== 1) {
    throw new Error(
      `Expected exactly one reference for token ${token.name}, but got ${references.length}.`,
    );
  }

  return {
    name: `${toCssVariableName({ formatter, token })}${namePostfix ?? ''}`,
    value: toCssVariableString(`${references[0].name}${valuePostfix ?? ''}`),
  };
}

function toTailwindFontFamilyName(name: string): string {
  const map: Record<string, string> = {
    'font-family-primary': 'sans',
    'font-family-secondary': 'serif',
    'font-family-tertiary': 'mono',
  };

  for (const [suffix, tailwindName] of Object.entries(map)) {
    if (name.includes(suffix)) {
      return name.replace(suffix, tailwindName);
    }
  }

  throw new Error(`Unknown font family name '${name}'.`);
}

function toTailwindConfiguration({
  prefix,
  formatter,
  dictionary,
  token,
}: {
  prefix?: string;
  formatter: (token: TransformedToken) => string;
  dictionary: Dictionary;
  token: TransformedToken;
}): CssVariable[] | undefined {
  const type = token?.attributes?.type;

  switch (type) {
    case 'font': {
      const variable = toCssVariable({ formatter, token });
      return [
        toTailwindSetting({
          prefix,
          setting: 'font',
          removeRoot: true,
          variable: {
            name: toTailwindFontFamilyName(variable.name),
            value: variable.value,
          },
        }),
      ];
    }
    case 'color': {
      return [
        toTailwindSetting({
          prefix,
          setting: 'color',
          removeRoot: true,
          variable: toCssVariable({ formatter, token }),
        }),
      ];
    }
    case 'border': {
      const borderType = token.path[3] as 'radius' | 'width';

      // TODO: review Tailwind v4 config support of border widths
      if (borderType === 'width') {
        return undefined;
      }

      return [
        toTailwindSetting({
          prefix,
          setting: borderType === 'radius' ? 'radius' : 'border',
          variable: toCssVariable({ formatter, token }),
        }),
      ];
    }
    case 'typography': {
      return [
        toTailwindSetting({
          prefix,
          setting: 'text',
          variable: toReferencedCssVariable({
            formatter,
            tokens: dictionary.tokens,
            unfilteredTokens: dictionary.unfilteredTokens,
            token,
            valuePostfix: '-font-size',
          }),
        }),
        toTailwindSetting({
          prefix,
          setting: 'text',
          variable: toReferencedCssVariable({
            formatter,
            tokens: dictionary.tokens,
            unfilteredTokens: dictionary.unfilteredTokens,
            token,
            namePostfix: '--line-height',
            valuePostfix: '-line-height',
          }),
        }),
      ];
    }
    case 'breakpoint': {
      return [
        toTailwindSetting({
          prefix,
          setting: 'screen',
          variable: {
            name: toCssVariableName({ formatter, token }).replace(
              '-breakpoint',
              '',
            ),
            value: token.$value,
          },
        }),
      ];
    }
    case 'space': {
      return [
        toTailwindSetting({
          prefix,
          setting: 'spacing',
          removeRoot: true,
          variable: toCssVariable({ formatter, token }),
        }),
      ];
    }
    default: {
      throw new Error(`Unknown semantic type '${type}'.`);
    }
  }
}

function getTailwindVariables({
  prefix,
  dictionary,
}: {
  prefix?: string;
  dictionary: Dictionary;
}): CssVariable[] {
  const formatter = createPropertyFormatter({
    outputReferences: true,
    outputReferenceFallbacks: false,
    dictionary,
    format: 'css',
    formatting: {},
    themeable: false,
    usesDtcg: true,
  });

  const tailwindTokens = dictionary.allTokens.filter((token) => {
    if (token?.attributes?.category === 'semantic') {
      return true;
    }

    if (
      token?.attributes?.type === 'font' &&
      token?.attributes?.item === 'family'
    ) {
      return true;
    }

    if (token?.attributes?.type === 'space') {
      return true;
    }

    // TODO: review use of primitive colours currently being included in Tailwind config
    return token?.attributes?.type === 'color';
  });

  return tailwindTokens
    .flatMap((token) => {
      if (
        !token?.attributes?.type ||
        typeof token?.attributes.type !== 'string'
      ) {
        throw new Error(
          `Token ${token.name} is missing a type. This is required for Tailwind tokens.`,
        );
      }

      return toTailwindConfiguration({
        prefix,
        formatter,
        dictionary,
        token,
      });
    })
    .filter((setting) => setting !== undefined);
}

export async function tailwindThemeFormatter({
  dictionary,
  platform,
}: FormatFnArguments) {
  const variables = getTailwindVariables({
    prefix: platform.prefix,
    dictionary,
  });

  const lines = [
    '@theme {',
    ...variables.map((variable) => `${variable.name}: ${variable.value};`),
    '}',
  ];

  return lines.join('\n');
}
