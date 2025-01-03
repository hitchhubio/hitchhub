import { configureThemeCss } from './theme-css.js';

const theme = {
  colors: {
    red: {
      500: '#ff0000',
    },
  },
};

describe('configureThemeCss', () => {
  it('returns empty object for empty array', () => {
    const themeCss = configureThemeCss({ theme });
    expect(themeCss([])).toEqual({});
  });

  it('returns empty object for empty array with prefix', () => {
    const themeCss = configureThemeCss({ theme, prefix: 'prefix' });
    expect(themeCss([])).toEqual({});
  });

  it('returns expected css value for single classname', () => {
    const themeCss = configureThemeCss({ theme });

    expect(themeCss(['text-red-500'])).toEqual({
      'text-red-500': '#ff0000',
    });
  });

  it('returns expected css value for multiple classnames', () => {
    const themeCss = configureThemeCss({ theme });

    expect(themeCss(['text-red-500', 'bg-red-500'])).toEqual({
      'text-red-500': '#ff0000',
      'bg-red-500': '#ff0000',
    });
  });

  it('returns expected css value for multiple classnames with prefix', () => {
    const themeCss = configureThemeCss({ theme, prefix: 'prefix' });

    expect(themeCss(['prefix-text-red-500', 'prefix-bg-red-500'])).toEqual({
      'prefix-text-red-500': '#ff0000',
      'prefix-bg-red-500': '#ff0000',
    });
  });

  it('returns expected css value for multiple classnames with prefix and other classnames', () => {
    const themeCss = configureThemeCss({ theme, prefix: 'prefix' });

    expect(
      themeCss(['prefix-text-red-500', 'prefix-bg-red-500', 'text-blue-500']),
    ).toEqual({
      'prefix-text-red-500': '#ff0000',
      'prefix-bg-red-500': '#ff0000',
    });
  });
});
