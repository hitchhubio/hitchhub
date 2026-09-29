import type { TokenManifestEntry } from '@hitchhub/core';

export const componentTokenContract = [
  ['space.1', 'dimension'],
  ['space.2', 'dimension'],
  ['space.3', 'dimension'],
  ['space.4', 'dimension'],
  ['size.lg', 'dimension'],
  ['surface.secondary', 'color'],
  ['surface.muted', 'color'],
  ['text.default', 'color'],
  ['text.muted', 'color'],
  ['form.text.default', 'color'],
  ['form.border.default', 'color'],
  ['button.primary.background.default', 'color'],
  ['button.primary.text.default', 'color'],
  ['border.form.width.default', 'dimension'],
  ['border.form.radius.default', 'dimension'],
  ['border.radius.full', 'dimension'],
].map(([path, type]) => ({
  path,
  type,
  value: undefined,
  resolvedValue: undefined,
})) as TokenManifestEntry[];

export type ComponentToken = (typeof componentTokenContract)[number]['path'];
