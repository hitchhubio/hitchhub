import { indexTokenManifest } from './manifest.js';
import { isCompatibleTokenType } from './validation.js';
import type { ComponentMeta, TokenManifestEntry } from './types.js';

export type CoverageStatus = 'covered' | 'missing-token' | 'invalid-type';

export type CoverageItem = {
  component: string;
  part: string;
  property: string;
  token: string;
  status: CoverageStatus;
  message?: string;
};

export type CoverageReport = {
  items: readonly CoverageItem[];
  valid: boolean;
  summary: { total: number; covered: number; errors: number };
};

export function createCoverageReport(
  components: readonly ComponentMeta[],
  manifest: readonly TokenManifestEntry[],
): CoverageReport {
  const tokens = indexTokenManifest(manifest);
  const items = components.flatMap((component) =>
    Object.values(component.parts).flatMap((part) =>
      part.relationships.map((relationship): CoverageItem => {
        const token = tokens.get(relationship.token);
        if (!token) {
          return {
            ...relationship,
            component: component.component,
            part: part.part,
            status: 'missing-token',
          };
        }
        if (!isCompatibleTokenType(relationship.property, token.type)) {
          return {
            ...relationship,
            component: component.component,
            part: part.part,
            status: 'invalid-type',
            message: `Expected ${relationship.property} to use ${relationship.tokenType}, received ${token.type}.`,
          };
        }
        return {
          ...relationship,
          component: component.component,
          part: part.part,
          status: 'covered',
        };
      }),
    ),
  );
  const covered = items.filter((item) => item.status === 'covered').length;
  return {
    items,
    valid: covered === items.length,
    summary: { total: items.length, covered, errors: items.length - covered },
  };
}

export function formatCoverageReport(report: CoverageReport): string {
  const byComponent = new Map<string, CoverageItem[]>();
  for (const item of report.items) {
    byComponent.set(item.component, [
      ...(byComponent.get(item.component) ?? []),
      item,
    ]);
  }
  return [...byComponent]
    .flatMap(([component, items]) => [
      component,
      ...items.map(
        (item) =>
          `${item.status === 'covered' ? '✓' : '✗'} ${item.part}.${item.property} → ${item.token}${item.message ? ` (${item.message})` : ''}`,
      ),
    ])
    .join('\n');
}
