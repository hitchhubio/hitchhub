import { createThemeClasses } from './create-theme-classes.js';

describe('createThemeClasses', () => {
  it('returns empty array with no theme', () => {
    expect(createThemeClasses()).toEqual([]);
  });

  it('returns expected colour classes', () => {
    const result = createThemeClasses({
      colors: {
        red: {
          500: '#ff0000',
        },
      },
    });

    expect(result).toEqual(
      expect.arrayContaining(['text-red-500', 'bg-red-500', 'border-red-500']),
    );
  });

  it('returns the expected spacing classes', () => {
    const result = createThemeClasses({
      spacing: {
        1: '0.25rem',
      },
    });

    expect(result).toEqual(
      expect.arrayContaining([
        'm-1',
        'mx-1',
        'my-1',
        'mt-1',
        'mr-1',
        'mb-1',
        'ml-1',
        'p-1',
        'px-1',
        'py-1',
        'pt-1',
        'pr-1',
        'pb-1',
        'pl-1',
      ]),
    );
  });

  it('returns expected font size classes', () => {
    const result = createThemeClasses({
      fontSize: {
        m: '1rem',
      },
    });

    expect(result).toEqual(expect.arrayContaining(['text-m']));
  });

  it('returns expected border width classes', () => {
    const result = createThemeClasses({
      borderWidth: {
        m: '2px',
      },
    });

    expect(result).toEqual(expect.arrayContaining(['border-m']));
  });

  it('returns expected border radius classes', () => {
    const result = createThemeClasses({
      borderRadius: {
        m: '2px',
      },
    });

    expect(result).toEqual(expect.arrayContaining(['rounded-m']));
  });

  it('returns expected z index classes', () => {
    const result = createThemeClasses({
      zIndex: {
        m: '2',
      },
    });

    expect(result).toEqual(expect.arrayContaining(['z-m']));
  });
});
