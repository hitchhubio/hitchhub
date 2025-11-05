import { mergeDesignTokens } from './merge-tokens';
import { validateDesignTokens } from './schema/index';

export async function validateDesignTokensSchema({
  source = [],
  tokens,
}: {
  source?: string[];
  tokens?: unknown;
}) {
  const mergedTokens = await mergeDesignTokens({ source, tokens });
  validateDesignTokens({ tokens: mergedTokens });
}
