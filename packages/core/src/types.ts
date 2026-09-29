export type TokenType =
  | 'color'
  | 'dimension'
  | 'number'
  | 'duration'
  | 'cubicBezier'
  | 'fontFamily'
  | 'fontWeight'
  | 'strokeStyle'
  | 'border'
  | 'transition'
  | 'shadow'
  | 'gradient'
  | 'typography'
  | (string & {});

export type StyleProperty =
  | 'padding'
  | 'paddingInline'
  | 'paddingBlock'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'margin'
  | 'marginInline'
  | 'marginBlock'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'gap'
  | 'rowGap'
  | 'columnGap'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'minHeight'
  | 'maxWidth'
  | 'maxHeight'
  | 'backgroundColor'
  | 'color'
  | 'borderColor'
  | 'borderWidth'
  | 'borderRadius'
  | 'boxShadow'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'letterSpacing'
  | 'opacity';

export type TokenStyle<TokenName extends string = string> = Partial<
  Record<StyleProperty, TokenName>
>;

export type TokenManifestEntry<Path extends string = string> = {
  path: Path;
  type: TokenType;
  value: unknown;
  resolvedValue: unknown;
  cssVariable?: string;
  sourcePath?: string;
};

export type StyleRelationship<TokenName extends string = string> = {
  property: StyleProperty;
  token: TokenName;
  tokenType: TokenType;
  value: unknown;
  resolvedValue: unknown;
  representation: string;
};

export type PartMeta<
  Component extends string = string,
  Part extends string = string,
  TokenName extends string = string,
> = {
  id: string;
  component: Component;
  part: Part;
  relationships: readonly StyleRelationship<TokenName>[];
};

export type ComponentMeta<
  Component extends string = string,
  Part extends string = string,
  TokenName extends string = string,
> = {
  component: Component;
  parts: Readonly<Record<Part, PartMeta<Component, Part, TokenName>>>;
};

export type InstrumentationAttributes = Readonly<Record<'data-hh-id', string>>;

export type HitchPart<
  Component extends string,
  Part extends string,
  TokenName extends string,
> = {
  readonly className: string;
  readonly meta: PartMeta<Component, Part, TokenName>;
  readonly attributes:
    | InstrumentationAttributes
    | Readonly<Record<string, never>>;
};

export type HitchComponent<
  Component extends string,
  Parts extends Record<string, TokenStyle<TokenName>>,
  TokenName extends string,
> = {
  readonly [Part in keyof Parts]: HitchPart<
    Component,
    Extract<Part, string>,
    TokenName
  >;
} & {
  readonly meta: ComponentMeta<
    Component,
    Extract<keyof Parts, string>,
    TokenName
  >;
};

export type AdapterContext = {
  property: StyleProperty;
  token: string;
  manifestToken: TokenManifestEntry;
};

export type StylingAdapter = {
  readonly name: string;
  resolve(context: AdapterContext): string | readonly string[];
};
