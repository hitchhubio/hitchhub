import { tailwindThemeFormatter } from './tailwind-theme';
import { testFormatter } from './test-formatter';

describe('tailwindThemeFormatter', () => {
  const { formatArray } = testFormatter({
    formatter: tailwindThemeFormatter,
  });

  it('should return empty theme with no tokens', async () => {
    const formatted = await formatArray({ allTokens: [] });
    expect(formatted).toEqual(['@theme {', '}']);
  });

  it('should return color configuration with token value', async () => {
    const formatted = await formatArray({
      allTokens: [
        {
          name: 'color-surface-primary',
          type: 'color',
          value: '#333333',
          attributes: {
            category: 'semantic',
            type: 'color',
          },
        },
      ],
    });

    expect(formatted).toEqual([
      '@theme {',
      '--color-surface-primary: #333333;',
      '}',
    ]);
  });

  it('should convert composite typography token to font size and line height', async () => {
    const formatted = await formatArray({
      unfilteredTokens: {
        primitive: {
          typeScale: {
            heading: {
              bold: {
                700: {
                  type: 'typography',
                  name: 'primitive-type-scale-heading-bold-700',
                  value: {
                    fontSize: '16px',
                    lineHeight: '24px',
                  },
                },
              },
            },
          },
        },
      },
      allTokens: [
        {
          name: 'typography-body',
          type: 'typography',
          value: {
            fontSize: '16px',
            lineHeight: '24px',
          },
          original: {
            type: 'typography',
            value: '{primitive.typeScale.heading.bold.700}',
          },
          attributes: {
            category: 'semantic',
            type: 'typography',
          },
        },
      ],
    });

    expect(formatted).toEqual([
      '@theme {',
      '--text-typography-body: var(--primitive-type-scale-heading-bold-700-font-size);',
      '--text-typography-body--line-height: var(--primitive-type-scale-heading-bold-700-line-height);',
      '}',
    ]);
  });

  describe('with prefix', () => {
    const { formatArray } = testFormatter({
      formatter: tailwindThemeFormatter,
      platformConfig: {
        prefix: 'prefix',
      },
    });

    it('should return color configuration with token value and without prefix', async () => {
      const formatted = await formatArray({
        allTokens: [
          {
            name: 'prefix-color-surface-primary',
            type: 'color',
            value: '#333333',
            attributes: {
              category: 'semantic',
              type: 'color',
            },
          },
        ],
      });

      expect(formatted).toEqual([
        '@theme {',
        '--color-surface-primary: #333333;',
        '}',
      ]);
    });
  });
});
