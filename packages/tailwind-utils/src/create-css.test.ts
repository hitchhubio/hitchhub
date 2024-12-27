import { createCss } from './create-css.js';

describe('createCss', () => {
  it('returns empty array with no theme', async () => {
    const css = await createCss({
      classNames: [],
      theme: {},
    });

    expect(css).toEqual([]);
  });

  it('returns foo', async () => {
    const css = await createCss({
      classNames: ['text-red-500', 'bg-red-500'],
      theme: {
        colors: {
          red: {
            500: '#ff0000',
          },
        },
      },
    });

    expect(css).toEqual(
      'text-red-500 { color: #ff0000; }\nbg-red-500 { background-color: #ff0000; }',
    );
  });
});
