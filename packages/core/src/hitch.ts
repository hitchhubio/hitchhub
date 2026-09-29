import { indexTokenManifest } from './manifest.js';
import {
  createInstrumentationRegistry,
  defaultInstrumentationRegistry,
  type InstrumentationRegistry,
} from './registry.js';
import { compatibleTokenTypes, isCompatibleTokenType } from './validation.js';
import type {
  ComponentMeta,
  HitchComponent,
  PartMeta,
  StylingAdapter,
  TokenManifestEntry,
  TokenStyle,
} from './types.js';

export type CreateHitchOptions<TokenName extends string = string> = {
  adapter: StylingAdapter;
  manifest: readonly TokenManifestEntry<TokenName>[];
  instrumentation?: boolean | { registry?: InstrumentationRegistry };
};

function stableId(component: string, part: string): string {
  let hash = 2_166_136_261;
  for (const character of `${component}:${part}`) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16_777_619);
  }
  return `hh-${(hash >>> 0).toString(36)}`;
}

export function createHitch<TokenName extends string = string>({
  adapter,
  manifest,
  instrumentation = false,
}: CreateHitchOptions<TokenName>) {
  const tokens = indexTokenManifest(manifest);
  const enabled = Boolean(instrumentation);
  const registry = enabled
    ? typeof instrumentation === 'object'
      ? (instrumentation.registry ?? createInstrumentationRegistry())
      : defaultInstrumentationRegistry
    : undefined;
  const components: ComponentMeta[] = [];

  function resolve(style: TokenStyle<TokenName>, location: string) {
    return Object.entries(style).map(([property, tokenName]) => {
      const token = tokens.get(tokenName);
      if (!token) {
        throw new Error(
          `${location}.${property} references unknown token '${tokenName}'.`,
        );
      }
      const typedProperty = property as keyof typeof compatibleTokenTypes;
      if (!isCompatibleTokenType(typedProperty, token.type)) {
        throw new Error(
          `${location}.${property} expects ${compatibleTokenTypes[typedProperty].join(' or ')} token, but '${tokenName}' is ${token.type}.`,
        );
      }
      const representation = adapter.resolve({
        property: typedProperty,
        token: tokenName,
        manifestToken: token,
      });
      return {
        property: typedProperty,
        token: tokenName as TokenName,
        tokenType: token.type,
        value: token.value,
        resolvedValue: token.resolvedValue,
        representation:
          typeof representation === 'string'
            ? representation
            : representation.join(' '),
      };
    });
  }

  function hitch(style: TokenStyle<TokenName>): string {
    return resolve(style, 'hitch')
      .map((item) => item.representation)
      .join(' ');
  }

  hitch.component = function component<
    Name extends string,
    Parts extends Record<string, TokenStyle<TokenName>>,
  >(name: Name, parts: Parts): HitchComponent<Name, Parts, TokenName> {
    const output: Record<string, unknown> = {};
    const partMetas: Record<string, PartMeta> = {};
    for (const [part, style] of Object.entries(parts)) {
      const relationships = resolve(style, `${name}.${part}`);
      const meta: PartMeta = {
        id: stableId(name, part),
        component: name,
        part,
        relationships,
      };
      partMetas[part] = meta;
      if (registry) {
        registry.register(meta);
      }
      output[part] = {
        className: relationships.map((item) => item.representation).join(' '),
        meta,
        attributes: enabled ? { 'data-hh-id': meta.id } : {},
      };
    }
    const meta = { component: name, parts: partMetas } as ComponentMeta;
    components.push(meta);
    return Object.assign(output, { meta }) as HitchComponent<
      Name,
      Parts,
      TokenName
    >;
  };

  hitch.registry = registry;
  hitch.components = components as readonly ComponentMeta[];
  hitch.manifest = manifest;
  return hitch;
}

export type Hitch = ReturnType<typeof createHitch>;
