import { z } from 'zod';
import { borderSchema } from './border-schema';
import { breakpointSchema } from './breakpoint-schema';
import { colorSchema } from './color-schema';
import { spaceSchema } from './space-schema';
import { typographySchema } from './typography-schema';

export const semanticSchema = z
  .object(
    {
      color: colorSchema,
      typography: typographySchema,
      breakpoint: breakpointSchema,
      border: borderSchema,
      space: spaceSchema,
    },
    { message: `The path 'semantic' is required.` },
  )
  .strict();
