import { configureThemeKey } from './theme-key.js';

describe('configureThemeKey', () => {
  it('should throw for empty string', () => {
    expect(() => configureThemeKey()('')).toThrow(
      'Expected tailwind class name when converting to theme key.',
    );
  });

  it('should throw for empty string with configured prefix', () => {
    expect(() => configureThemeKey({ prefix: 'prefix' })('')).toThrow(
      'Expected tailwind class name when converting to theme key.',
    );
  });

  it('should throw for less than two parts with no configured prefix', () => {
    expect(() => configureThemeKey()('text')).toThrow(
      'Expected at least two parts in tailwind class name.',
    );
  });

  it('should throw for less than three parts with configured prefix', () => {
    expect(() =>
      configureThemeKey({ prefix: 'prefix' })('prefix-text'),
    ).toThrow('Expected at least two parts in tailwind class name.');
  });

  it('returns expected theme key with no prefix', () => {
    const themeKey = configureThemeKey();
    expect(themeKey('text-blue-500')).toEqual('colors.blue.500');
  });

  it('returns undefined theme key with configured prefix and no prefix', () => {
    const themeKey = configureThemeKey({ prefix: 'prefix' });
    expect(themeKey('text-blue-500')).toBeUndefined();
  });

  it('returns expected theme key with configured prefix', () => {
    const themeKey = configureThemeKey({ prefix: 'prefix' });
    expect(themeKey('prefix-text-blue-500')).toEqual('colors.blue.500');
  });
});
