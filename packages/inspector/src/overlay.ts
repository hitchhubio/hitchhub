import type { InspectionResult } from './inspector.js';

function pixels(value: string): number {
  return Number.parseFloat(value) || 0;
}

type OverlayGeometry = InspectionResult['geometry'] & {
  border: { top: number; right: number; bottom: number; left: number };
};

function liveGeometry(result: InspectionResult): OverlayGeometry {
  const { element } = result;
  const view = element.ownerDocument.defaultView;
  if (element.isConnected === false || !view) {
    return {
      ...result.geometry,
      border: { top: 0, right: 0, bottom: 0, left: 0 },
    };
  }

  const rect = element.getBoundingClientRect();
  const style = view.getComputedStyle(element);
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    padding: {
      top: pixels(style.paddingTop),
      right: pixels(style.paddingRight),
      bottom: pixels(style.paddingBottom),
      left: pixels(style.paddingLeft),
    },
    border: {
      top: pixels(style.borderTopWidth),
      right: pixels(style.borderRightWidth),
      bottom: pixels(style.borderBottomWidth),
      left: pixels(style.borderLeftWidth),
    },
    borderRadius: style.borderRadius,
    backgroundColor: style.backgroundColor,
    color: style.color,
  };
}

function box(
  document: Document,
  styles: Partial<CSSStyleDeclaration>,
): HTMLElement {
  const node = document.createElement('div');
  node.dataset.hhOverlay = '';
  Object.assign(node.style, {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: '2147483647',
    boxSizing: 'border-box',
    ...styles,
  });
  document.body.append(node);
  return node;
}

/** A deliberately small overlay renderer. It only touches the DOM when explicitly called. */
export function createTokenOverlay(document: Document = globalThis.document) {
  let nodes: HTMLElement[] = [];
  const clear = () => {
    for (const node of nodes) {
      node.remove();
    }
    nodes = [];
  };

  return {
    clear,
    show(result: InspectionResult, property: string): void {
      clear();
      const { x, y, width, height, padding, border, borderRadius } =
        liveGeometry(result);
      const base = {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
      if (property.startsWith('padding')) {
        const color = 'rgba(59, 130, 246, 0.38)';
        const add = (
          left: number,
          top: number,
          boxWidth: number,
          boxHeight: number,
        ) =>
          nodes.push(
            box(document, {
              left: `${left}px`,
              top: `${top}px`,
              width: `${boxWidth}px`,
              height: `${boxHeight}px`,
              background: color,
            }),
          );
        const innerX = x + border.left;
        const innerY = y + border.top;
        const innerWidth = width - border.left - border.right;
        const innerHeight = height - border.top - border.bottom;
        if (['padding', 'paddingBlock', 'paddingTop'].includes(property)) {
          add(innerX, innerY, innerWidth, padding.top);
        }
        if (['padding', 'paddingInline', 'paddingRight'].includes(property)) {
          add(
            innerX + innerWidth - padding.right,
            innerY,
            padding.right,
            innerHeight,
          );
        }
        if (['padding', 'paddingBlock', 'paddingBottom'].includes(property)) {
          add(
            innerX,
            innerY + innerHeight - padding.bottom,
            innerWidth,
            padding.bottom,
          );
        }
        if (['padding', 'paddingInline', 'paddingLeft'].includes(property)) {
          add(innerX, innerY, padding.left, innerHeight);
        }
      } else if (property === 'borderRadius') {
        nodes.push(
          box(document, {
            ...base,
            border: '3px solid #e11d48',
            borderRadius,
            background: 'transparent',
          }),
        );
      } else if (property === 'backgroundColor' || property === 'color') {
        nodes.push(
          box(document, {
            ...base,
            borderRadius,
            background: 'rgba(250, 204, 21, 0.35)',
            border: '2px solid #ca8a04',
          }),
        );
      } else {
        nodes.push(
          box(document, {
            ...base,
            border: '2px solid #2563eb',
            background: 'rgba(59, 130, 246, 0.12)',
          }),
        );
      }
    },
  };
}
