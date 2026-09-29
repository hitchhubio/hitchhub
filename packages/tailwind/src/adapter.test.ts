import { tailwind, normalizeTokenName } from './index.js';

describe('Tailwind adapter', () => {
  const adapter = tailwind();
  const manifestToken = {
    path: 'space.4',
    type: 'dimension',
    value: '16px',
    resolvedValue: '16px',
  } as const;

  it('normalizes DTCG token paths to existing Tailwind names', () => {
    expect(normalizeTokenName('space.form.paddingX.default')).toBe(
      'form-padding-x-default',
    );
    expect(normalizeTokenName('surface.primary')).toBe('surface-primary');
  });

  it.each([
    ['padding', 'space.4', 'p-4'],
    ['paddingInline', 'space.4', 'px-4'],
    ['backgroundColor', 'surface.primary', 'bg-surface-primary'],
    [
      'borderRadius',
      'border.form.radius.default',
      'rounded-border-form-radius-default',
    ],
  ] as const)('maps %s + %s to %s', (property, token, expected) => {
    expect(adapter.resolve({ property, token, manifestToken })).toBe(expected);
  });
});
