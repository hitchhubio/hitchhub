import {
  createCoverageReport,
  createHitch,
  createInstrumentationRegistry,
  createTokenManifest,
  formatCoverageReport,
  type StylingAdapter,
} from './index.js';

const rawTokens = {
  primitive: {
    space: { md: { $type: 'dimension', $value: '16px' } },
    color: { primary: { $type: 'color', $value: '#3366ff' } },
  },
  semantic: {
    color: {
      surface: {
        default: { $type: 'color', $value: '{primitive.color.primary}' },
      },
    },
  },
};
const resolvedTokens = {
  ...rawTokens,
  semantic: {
    color: { surface: { default: { $type: 'color', $value: '#3366ff' } } },
  },
};
const manifest = createTokenManifest(rawTokens, resolvedTokens);
const adapter: StylingAdapter = {
  name: 'test',
  resolve: ({ property, token }) => `${property}:${token}`,
};

describe('core', () => {
  it('normalizes a DTCG tree into a resolved manifest', () => {
    expect(manifest).toContainEqual(
      expect.objectContaining({
        path: 'space.md',
        type: 'dimension',
        resolvedValue: '16px',
      }),
    );
    expect(manifest).toContainEqual(
      expect.objectContaining({
        path: 'surface.default',
        type: 'color',
        resolvedValue: '#3366ff',
      }),
    );
  });

  it('generates one-off styles', () => {
    const hitch = createHitch({ adapter, manifest });
    expect(
      hitch({ padding: 'space.md', backgroundColor: 'surface.default' }),
    ).toBe('padding:space.md backgroundColor:surface.default');
  });

  it('builds multi-part metadata once without instrumentation by default', () => {
    const hitch = createHitch({ adapter, manifest });
    const select = hitch.component('Select', {
      trigger: {
        paddingInline: 'space.md',
        backgroundColor: 'surface.default',
      },
      popup: { padding: 'space.md' },
    });
    expect(select.trigger.className).toContain('paddingInline:space.md');
    expect(select.trigger.meta).toMatchObject({
      component: 'Select',
      part: 'trigger',
    });
    expect(select.popup.meta.relationships).toHaveLength(1);
    expect(select.trigger.attributes).toEqual({});
    expect(hitch.registry).toBeUndefined();
  });

  it('rejects unknown and incompatible tokens with their definition location', () => {
    const hitch = createHitch({ adapter, manifest });
    expect(() => hitch({ padding: 'color.primary' })).toThrow(
      'expects dimension token',
    );
    expect(() => hitch({ padding: 'space.missing' })).toThrow(
      "unknown token 'space.missing'",
    );
  });

  it('only registers DOM identifiers when instrumentation is enabled', () => {
    const registry = createInstrumentationRegistry();
    const hitch = createHitch({
      adapter,
      manifest,
      instrumentation: { registry },
    });
    const button = hitch.component('Button', { root: { padding: 'space.md' } });
    expect(button.root.attributes).toEqual({
      'data-hh-id': button.root.meta.id,
    });
    expect(registry.get(button.root.meta.id)).toBe(button.root.meta);
  });

  it('reports component token coverage in machine and human-readable forms', () => {
    const hitch = createHitch({ adapter, manifest });
    hitch.component('Button', { root: { padding: 'space.md' } });
    const report = createCoverageReport(hitch.components, manifest);
    expect(report).toMatchObject({
      valid: true,
      summary: { total: 1, covered: 1, errors: 0 },
    });
    expect(formatCoverageReport(report)).toContain('✓ root.padding → space.md');

    const invalid = createCoverageReport(
      [
        {
          component: 'Broken',
          parts: {
            root: {
              id: 'broken',
              component: 'Broken',
              part: 'root',
              relationships: [
                {
                  property: 'padding',
                  token: 'color.primary',
                  tokenType: 'color',
                  value: '#3366ff',
                  resolvedValue: '#3366ff',
                  representation: 'p-primary',
                },
                {
                  property: 'gap',
                  token: 'space.missing',
                  tokenType: 'dimension',
                  value: undefined,
                  resolvedValue: undefined,
                  representation: 'gap-missing',
                },
              ],
            },
          },
        },
      ],
      manifest,
    );
    expect(invalid.items.map((item) => item.status)).toEqual([
      'invalid-type',
      'missing-token',
    ]);
  });
});
