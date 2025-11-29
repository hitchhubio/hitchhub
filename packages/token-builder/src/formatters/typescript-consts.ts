import camelCase from 'camelcase';
import type { Token } from 'style-dictionary';
import type {
  FormatFnArguments,
  TransformedToken,
} from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';

export function getTokens({
  tokens,
  camelCase: camelCaseOption,
}: {
  tokens: TransformedToken[];
  camelCase: boolean;
}) {
  return tokens.map((token: Token) => {
    if (!token.name) {
      throw new Error(`Token has no name.`);
    }

    const tokenName = camelCaseOption
      ? camelCase(token.name)
      : camelCase(token.name, { pascalCase: true });

    return {
      name: tokenName,
      value: token.$value,
    };
  });
}

export async function typeScriptConstsFormatter({
  dictionary,
  platform,
  options,
  file,
}: FormatFnArguments) {
  const header = await fileHeader({ file });

  const consts = getTokens({
    tokens: dictionary.allTokens,
    camelCase: options.camelCase ?? false,
  }).map(
    (token) => `export const ${token.name} = ${JSON.stringify(token.value)};`,
  );

  const lines = [header, ...consts, ''];

  return lines.join('\n');
}
