import { __unstable__loadDesignSystem } from 'tailwindcss';
import { CustomThemeConfig } from './types.js';
import { configureThemeKey } from './theme-key.js';
import { get } from './get.js';

// const knownKeys: string[] = ['colors', 'spacing', 'borderRadius'];

// function themeToCSS({
//   prefix,
//   theme,
// }: {
//   prefix?: string;
//   theme: Partial<CustomThemeConfig>;
// }): string {
//   let cssVariables = ':root {\n';

//   const addVariables = (obj: Partial<CustomThemeConfig>, currentKey = '') => {
//     for (const key in obj) {
//       console.log(key);
//       if (typeof obj[key] === 'object') {
//         addVariables(
//           obj[key],
//           currentKey && !knownKeys.includes(currentKey)
//             ? `${currentKey}-${key}`
//             : key,
//         );
//         continue;
//       }

//       cssVariables += currentKey
//         ? `  --${currentKey}-${key}: ${obj[key]};\n`
//         : `  --${key}: ${obj[key]};\n`;
//     }
//   };

//   addVariables(theme, prefix);
//   cssVariables += '}';

//   return cssVariables;
// }

// export async function createCss({
//   classNames = [],
//   theme = {},
//   prefix,
// }: {
//   classNames: string[];
//   theme: Partial<CustomThemeConfig>;
//   prefix?: string;
// }): Promise<string[]> {
//   // const themeString = JSON.stringify(theme);

//   const themeString = themeToCSS({ theme, prefix });
//   console.log({ themeString });
//   const designSystem = await __unstable__loadDesignSystem(themeString);

//   const css = designSystem.candidatesToCss(classNames) ?? [];

//   console.log({ css });

//   return css.filter((value) => value != null);
// }

export function configureThemeCss({
  prefix,
  theme,
}: {
  prefix?: string;
  theme: Partial<CustomThemeConfig>;
}) {
  return function (classNames: string[]) {
    const themeKey = configureThemeKey({ prefix });

    return classNames.reduce((map, className) => {
      const key = themeKey(className);

      if (!key) {
        return map;
      }

      return { ...map, [className]: get({ obj: theme, key }) };
    }, {});
  };
}
