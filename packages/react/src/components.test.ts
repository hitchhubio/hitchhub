import { createHitch, createInstrumentationRegistry } from '@hitchhub/core';
import { tailwind } from '@hitchhub/tailwind';
import { createComponents } from './components.js';
import { componentTokenContract } from './contract.js';
import { definitions } from './definitions.js';

describe('components', () => {
  it('defines representative single and multi-part components', () => {
    expect(definitions.button.root.meta.relationships.length).toBeGreaterThan(
      1,
    );
    expect(Object.keys(definitions.avatar.meta.parts)).toEqual([
      'root',
      'initials',
    ]);
    expect(Object.keys(definitions.select.meta.parts)).toEqual([
      'root',
      'trigger',
      'icon',
    ]);
  });

  it('can create instrumented variants without affecting defaults', () => {
    const registry = createInstrumentationRegistry();
    const hitch = createHitch({
      adapter: tailwind({ prefix: 'hitch' }),
      manifest: componentTokenContract,
      instrumentation: { registry },
    });
    const instrumented = createComponents(hitch);
    expect(
      instrumented.definitions.button.root.attributes['data-hh-id'],
    ).toBeTruthy();
    expect(definitions.button.root.attributes).toEqual({});
  });
});
