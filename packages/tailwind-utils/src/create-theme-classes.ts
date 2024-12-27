import { CustomThemeConfig } from './types.js';

export function createThemeClasses(
  theme: Partial<CustomThemeConfig> = {},
): string[] {
  const classNames: string[] = [];

  // TODO: ts object entries
  if (theme.colors) {
    for (const [colorName, shades] of Object.entries(theme.colors)) {
      for (const shade of Object.keys(shades as Record<string, string>)) {
        classNames.push(
          `bg-${colorName}-${shade}`,
          `text-${colorName}-${shade}`,
          `border-${colorName}-${shade}`,
        );
      }
    }
  }

  if (theme.spacing) {
    for (const size of Object.keys(theme.spacing)) {
      classNames.push(
        `p-${size}`,
        `px-${size}`,
        `py-${size}`,
        `pt-${size}`,
        `pr-${size}`,
        `pb-${size}`,
        `pl-${size}`,
        `m-${size}`,
        `mx-${size}`,
        `my-${size}`,
        `mt-${size}`,
        `mr-${size}`,
        `mb-${size}`,
        `ml-${size}`,
      );
    }
  }

  if (theme.fontSize) {
    for (const size of Object.keys(theme.fontSize)) {
      classNames.push(`text-${size}`);
    }
  }

  if (theme.borderWidth) {
    for (const width of Object.keys(theme.borderWidth)) {
      classNames.push(`border-${width}`);
    }
  }

  if (theme.borderRadius) {
    for (const radius of Object.keys(theme.borderRadius)) {
      classNames.push(`rounded-${radius}`);
    }
  }

  if (theme.zIndex) {
    for (const zIndex of Object.keys(theme.zIndex)) {
      classNames.push(`z-${zIndex}`);
    }
  }

  return classNames;
}
