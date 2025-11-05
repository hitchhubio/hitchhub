import type { Dictionary } from 'style-dictionary';
import type { TransformedToken } from 'style-dictionary/types';
import { createPropertyFormatter } from 'style-dictionary/utils';

export type CssVariable = {
  name: string;
  value: string;
};

export function getCssVariables({
  dictionary,
}: {
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

  return dictionary.allTokens.map((token) =>
    toCssVariable({ formatter, token }),
  );
}

export function toCssVariable({
  formatter,
  token,
}: {
  formatter: (token: TransformedToken) => string;
  token: TransformedToken;
}): CssVariable {
  const cssVariable = formatter(token).trim();
  const [name, value] = cssVariable.split(':');
  return { name: name.trim(), value: value.replace(';', '').trim() };
}

export function toCssVariableName({
  formatter,
  token,
}: {
  formatter: (token: TransformedToken) => string;
  token: TransformedToken;
}): string {
  return toCssVariable({ formatter, token }).name;
}

export function toCssVariableValue({
  formatter,
  token,
}: {
  formatter: (token: TransformedToken) => string;
  token: TransformedToken;
}): string {
  return toCssVariable({ formatter, token }).value;
}
