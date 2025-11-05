import type { FormatFnArguments } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';
import { getCssVariables } from './utilities';

export async function cssVariableValuesFormatter({
  dictionary,
  options,
  file,
}: FormatFnArguments) {
  const header = await fileHeader({ file });

  const variables = getCssVariables({ dictionary });

  const lines = [
    header,
    `export const ${options.exportName} = {`,
    ...variables.map((variable) => `'${variable.name}': '${variable.value}',`),
    '}',
    '',
  ];

  return lines.join('\n');
}
