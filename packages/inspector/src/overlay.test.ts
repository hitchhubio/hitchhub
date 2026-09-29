import type { InspectionResult } from './inspector.js';
import { createTokenOverlay } from './overlay.js';

it('uses the current element geometry when the overlay is shown', () => {
  const appended: Array<{ style: CSSStyleDeclaration }> = [];
  const document = {
    createElement: () => ({
      dataset: {},
      style: {},
      remove() {
        appended.length = 0;
      },
    }),
    body: {
      append: (node: { style: CSSStyleDeclaration }) => appended.push(node),
    },
    defaultView: {
      getComputedStyle: () => ({
        paddingTop: '8px',
        paddingRight: '16px',
        paddingBottom: '8px',
        paddingLeft: '16px',
        borderTopWidth: '1px',
        borderRightWidth: '1px',
        borderBottomWidth: '1px',
        borderLeftWidth: '1px',
        borderRadius: '4px',
        backgroundColor: 'white',
        color: 'black',
      }),
    },
  } as unknown as Document;
  const element = {
    isConnected: true,
    ownerDocument: document,
    getBoundingClientRect: () => ({
      x: 40,
      y: 60,
      width: 120,
      height: 48,
    }),
  } as unknown as Element;
  const result = {
    element,
    geometry: {
      x: 10,
      y: 20,
      width: 100,
      height: 40,
      padding: { top: 4, right: 4, bottom: 4, left: 4 },
      borderRadius: '0',
      backgroundColor: 'transparent',
      color: 'black',
    },
  } as InspectionResult;

  createTokenOverlay(document).show(result, 'paddingInline');

  expect(appended).toHaveLength(2);
  expect(appended[0].style.left).toBe('143px');
  expect(appended[0].style.top).toBe('61px');
  expect(appended[1].style.left).toBe('41px');
  expect(appended[1].style.height).toBe('46px');
});
