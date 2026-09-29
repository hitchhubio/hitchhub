import { createInstrumentationRegistry, type PartMeta } from '@hitchhub/core';
import { createInspector } from './inspector.js';

it('resolves registry metadata and live element geometry', () => {
  const registry = createInstrumentationRegistry();
  const meta: PartMeta = {
    id: 'hh-test',
    component: 'Button',
    part: 'root',
    relationships: [
      {
        property: 'paddingInline',
        token: 'space.md',
        tokenType: 'dimension',
        value: '1rem',
        resolvedValue: '16px',
        representation: 'px-md',
      },
    ],
  };
  registry.register(meta);
  const target = {
    dataset: { hhId: 'hh-test' },
    closest: () => target,
    getBoundingClientRect: () => ({ x: 10, y: 20, width: 100, height: 40 }),
    ownerDocument: {
      defaultView: {
        getComputedStyle: () => ({
          paddingTop: '8px',
          paddingRight: '16px',
          paddingBottom: '8px',
          paddingLeft: '16px',
          borderRadius: '4px',
          backgroundColor: 'rgb(1, 2, 3)',
          color: 'white',
        }),
      },
    },
  } as unknown as Element;
  const inspector = createInspector({
    registry,
    manifest: [
      {
        path: 'space.md',
        type: 'dimension',
        value: '1rem',
        resolvedValue: '16px',
      },
    ],
  });
  expect(inspector.inspect(target)).toMatchObject({
    component: 'Button',
    part: 'root',
    tokens: [{ token: 'space.md', resolvedValue: '16px' }],
    geometry: { width: 100, padding: { left: 16 } },
  });
});
