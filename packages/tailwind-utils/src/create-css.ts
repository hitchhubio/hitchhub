import { __unstable__loadDesignSystem } from 'tailwindcss';
import { CustomThemeConfig } from './types.js';

export async function createCss({
  classNames = [],
  theme = {},
}: {
  classNames: string[];
  theme: Partial<CustomThemeConfig>;
}): Promise<Record<string, unknown>> {
  const themeString = JSON.stringify(theme);
  const designSystem = await __unstable__loadDesignSystem(themeString);

  const css = designSystem.candidatesToCss(classNames);

  console.log({ css });

  return {};
}
