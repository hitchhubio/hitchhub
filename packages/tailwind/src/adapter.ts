import type { StyleProperty, StylingAdapter } from '@hitchhub/core';

const utilities: Readonly<Record<StyleProperty, string>> = {
  padding: 'p',
  paddingInline: 'px',
  paddingBlock: 'py',
  paddingTop: 'pt',
  paddingRight: 'pr',
  paddingBottom: 'pb',
  paddingLeft: 'pl',
  margin: 'm',
  marginInline: 'mx',
  marginBlock: 'my',
  marginTop: 'mt',
  marginRight: 'mr',
  marginBottom: 'mb',
  marginLeft: 'ml',
  gap: 'gap',
  rowGap: 'gap-y',
  columnGap: 'gap-x',
  width: 'w',
  height: 'h',
  minWidth: 'min-w',
  minHeight: 'min-h',
  maxWidth: 'max-w',
  maxHeight: 'max-h',
  backgroundColor: 'bg',
  color: 'text',
  borderColor: 'border',
  borderWidth: 'border',
  borderRadius: 'rounded',
  boxShadow: 'shadow',
  fontFamily: 'font',
  fontSize: 'text',
  fontWeight: 'font',
  lineHeight: 'leading',
  letterSpacing: 'tracking',
  opacity: 'opacity',
};

export function normalizeTokenName(token: string): string {
  return token
    .replace(/^(space|color|shadow)\./, '')
    .replaceAll(/([a-z\d])([A-Z])/g, '$1-$2')
    .replaceAll('.', '-')
    .toLowerCase();
}

export type TailwindAdapterOptions = {
  /** Tailwind v4 class prefix, for example `hitch`. */
  prefix?: string;
}

export function tailwind(options: TailwindAdapterOptions = {}): StylingAdapter {
  return {
    name: 'tailwind',
    resolve({ property, token }) {
      const className = `${utilities[property]}-${normalizeTokenName(token)}`;
      return options.prefix ? `${options.prefix}:${className}` : className;
    },
  };
}
