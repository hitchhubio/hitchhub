import { CustomThemeConfig } from './types.js';
import { configureThemeKey } from './theme-key.js';
import { get } from './get.js';

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
