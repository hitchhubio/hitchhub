const utilityToThemeKey = new Map<string, string>([
  ['text', 'colors'],
  ['bg', 'colors'],
  ['border', 'colors'],
  ['font', 'fontSize'],
  ['p', 'spacing'],
  ['m', 'spacing'],
  ['w', 'spacing'],
  ['h', 'spacing'],
]);

export function configureThemeKey({
  prefix: configuredPrefix = '',
}: {
  prefix?: string;
} = {}) {
  return function (className: string) {
    if (!className) {
      throw new Error(
        'Expected tailwind class name when converting to theme key.',
      );
    }

    // Remove responsive or state prefixes (e.g., sm:, hover:)
    const coreClass = className.split(':').pop();
    if (!coreClass) {
      return;
    }

    // Core class, e.g. prefix-text-blue-500 or text-blue-500
    const parts = coreClass.split('-');
    if (
      (configuredPrefix && parts.length < 3) ||
      (!configuredPrefix && parts.length < 2)
    ) {
      throw new Error('Expected at least two parts in tailwind class name.');
    }

    const prefix = configuredPrefix ? parts[0] : undefined;

    if (configuredPrefix && prefix !== configuredPrefix) {
      return;
    }

    const utility = configuredPrefix ? parts[1] : parts[0];
    const themeKey = utilityToThemeKey.get(utility);

    if (!themeKey) {
      return;
    }

    const keys = configuredPrefix
      ? parts.slice(2).join('.')
      : parts.slice(1).join('.');

    return `${themeKey}.${keys}`;
  };
}
