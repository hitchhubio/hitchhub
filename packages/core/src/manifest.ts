import type { TokenManifestEntry, TokenType } from './types.js';

type DtcgNode = Record<string, unknown>;

function isRecord(value: unknown): value is DtcgNode {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function publicPath(path: readonly string[]): string {
  const [tier, ...rest] = path;

  if (tier === 'semantic' && rest[0] === 'color')
    {return rest.slice(1).join('.');}
  if (tier === 'primitive' || tier === 'semantic' || tier === 'component') {
    return rest.join('.');
  }

  return path.join('.');
}

function getAtPath(value: unknown, path: readonly string[]): unknown {
  let current = value;
  for (const segment of path) {
    if (!isRecord(current)) {return undefined;}
    current = current[segment];
  }
  return isRecord(current) && '$value' in current ? current.$value : undefined;
}

/** Converts a DTCG object into the small, serialisable format consumed at runtime. */
export function createTokenManifest(
  unresolved: unknown,
  resolved: unknown = unresolved,
): TokenManifestEntry[] {
  const manifest: TokenManifestEntry[] = [];

  function visit(
    node: unknown,
    path: string[],
    inheritedType?: TokenType,
  ): void {
    if (!isRecord(node)) {return;}
    const type = (node.$type as TokenType | undefined) ?? inheritedType;

    if ('$value' in node) {
      if (!type)
        {throw new Error(`Token '${path.join('.')}' has no DTCG $type.`);}
      const normalized = publicPath(path);
      manifest.push({
        path: normalized,
        type,
        value: node.$value,
        resolvedValue: getAtPath(resolved, path) ?? node.$value,
        cssVariable: `--hh-${path
          .slice(1)
          .join('-')
          .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase()}`,
        sourcePath: path.join('.'),
      });
      return;
    }

    for (const [key, child] of Object.entries(node)) {
      if (!key.startsWith('$')) {visit(child, [...path, key], type);}
    }
  }

  visit(unresolved, []);
  return manifest;
}

export function indexTokenManifest(
  manifest: readonly TokenManifestEntry[],
): ReadonlyMap<string, TokenManifestEntry> {
  const index = new Map<string, TokenManifestEntry>();
  for (const token of manifest) {
    if (index.has(token.path))
      {throw new Error(`Duplicate token path '${token.path}'.`);}
    index.set(token.path, token);
  }
  return index;
}
