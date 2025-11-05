import { z } from 'zod';
import { borderSchema } from './border-schema';
import { colorSchema } from './color-schema';
import { fontSchema } from './font-schema';
import { opacitySchema } from './opacity-schema';
import { screenSchema } from './screen-schema';
import { shadowSchema } from './shadow-schema';
import { sizeSchema } from './size-schema';
import { spaceSchema } from './space-schema';
import { typeScaleSchema } from './type-scale-schema';
import { zIndexSchema } from './z-index-schema';

export const primitiveSchema = z
  .object(
    {
      color: colorSchema,
      font: fontSchema,
      typeScale: typeScaleSchema,
      screen: screenSchema,
      space: spaceSchema,
      size: sizeSchema,
      border: borderSchema,
      shadow: shadowSchema,
      opacity: opacitySchema,
      zIndex: zIndexSchema,
    },
    { message: `The path 'primitive' is required.` },
  )
  .strict();
