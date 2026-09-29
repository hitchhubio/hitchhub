import {
  defaultInstrumentationRegistry,
  indexTokenManifest,
  type InstrumentationRegistry,
  type StyleProperty,
  type TokenManifestEntry,
} from '@hitchhub/core';

export type InspectedToken = {
  property: StyleProperty;
  token: string;
  type: string;
  value: unknown;
  resolvedValue: unknown;
  representation: string;
}

export type ElementGeometry = {
  x: number;
  y: number;
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  borderRadius: string;
  backgroundColor: string;
  color: string;
}

export type InspectionResult = {
  id: string;
  component: string;
  part: string;
  element: Element;
  tokens: readonly InspectedToken[];
  geometry: ElementGeometry;
}

function pixels(value: string): number {
  return Number.parseFloat(value) || 0;
}

export function createInspector(options: {
  manifest: readonly TokenManifestEntry[];
  registry?: InstrumentationRegistry;
}) {
  const registry = options.registry ?? defaultInstrumentationRegistry;
  const manifest = indexTokenManifest(options.manifest);

  return {
    inspect(element: Element): InspectionResult | undefined {
      const target = element.closest<HTMLElement>('[data-hh-id]');
      const id = target?.dataset.hhId;
      if (!target || !id) {return undefined;}
      const meta = registry.get(id);
      if (!meta) {return undefined;}
      const rect = target.getBoundingClientRect();
      const view = target.ownerDocument.defaultView;
      if (!view) {return undefined;}
      const style = view.getComputedStyle(target);
      return {
        id,
        component: meta.component,
        part: meta.part,
        element: target,
        tokens: meta.relationships.map((relationship) => {
          const token = manifest.get(relationship.token);
          return {
            property: relationship.property,
            token: relationship.token,
            type: token?.type ?? relationship.tokenType,
            value: token?.value ?? relationship.value,
            resolvedValue: token?.resolvedValue ?? relationship.resolvedValue,
            representation: relationship.representation,
          };
        }),
        geometry: {
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
          borderRadius: style.borderRadius,
          backgroundColor: style.backgroundColor,
          color: style.color,
        },
      };
    },
  };
}

export type Inspector = ReturnType<typeof createInspector>;
