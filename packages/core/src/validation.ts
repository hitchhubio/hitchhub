import type { StyleProperty, TokenType } from './types.js';

const dimension = ['dimension'] as const;
const color = ['color'] as const;

export const compatibleTokenTypes: Readonly<
  Record<StyleProperty, readonly TokenType[]>
> = {
  padding: dimension,
  paddingInline: dimension,
  paddingBlock: dimension,
  paddingTop: dimension,
  paddingRight: dimension,
  paddingBottom: dimension,
  paddingLeft: dimension,
  margin: dimension,
  marginInline: dimension,
  marginBlock: dimension,
  marginTop: dimension,
  marginRight: dimension,
  marginBottom: dimension,
  marginLeft: dimension,
  gap: dimension,
  rowGap: dimension,
  columnGap: dimension,
  width: dimension,
  height: dimension,
  minWidth: dimension,
  minHeight: dimension,
  maxWidth: dimension,
  maxHeight: dimension,
  backgroundColor: color,
  color,
  borderColor: color,
  borderWidth: dimension,
  borderRadius: dimension,
  boxShadow: ['shadow'],
  fontFamily: ['fontFamily'],
  fontSize: dimension,
  fontWeight: ['fontWeight', 'number'],
  lineHeight: ['number', 'dimension'],
  letterSpacing: dimension,
  opacity: ['number'],
};

export function isCompatibleTokenType(
  property: StyleProperty,
  tokenType: TokenType,
): boolean {
  return compatibleTokenTypes[property].includes(tokenType);
}
