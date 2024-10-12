import { cssVariableConstsFormatter } from './css-variable-consts.js';
import { testFormatter } from './test-formatter.js';

describe('cssVariableConstsFormatter', () => {
  const { formatArray } = testFormatter({
    formatter: cssVariableConstsFormatter,
  });

  it('should return autogenerated message with no tokens', async () => {
    const formatted = await formatArray({ allTokens: [] });

    expect(formatted).toContain(
      ' * Do not edit directly, this file was auto-generated.',
    );
  });

  it('should return css variable const with token value', async () => {
    const formatted = await formatArray({
      allTokens: [
        {
          name: 'color-gray-500',
          type: 'color',
          value: '#333333',
        },
      ],
    });

    expect(formatted).toContain(
      `export const colorGray500 = 'var(--color-gray-500)';`,
    );
  });
});
