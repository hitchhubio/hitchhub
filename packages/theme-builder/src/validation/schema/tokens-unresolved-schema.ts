import { z } from 'zod';
import { primitiveSchema } from './primitive/primitive-schema';
import { semanticSchema } from './semantic/semantic-schema';
import type { TokenError } from './tokens-validation-error';
import { TokensValidationError } from './tokens-validation-error';

export const tokensUnresolvedSchema = z
  .object({
    primitive: primitiveSchema,
    semantic: semanticSchema,
  })
  .strict();

export function validateDesignTokens({ tokens }: { tokens: unknown }) {
  try {
    return tokensUnresolvedSchema.parse(tokens);
  } catch (error) {
    const zodError = error as z.ZodError;

    const errors: TokenError[] = zodError.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    throw new TokensValidationError(errors);
  }
}
