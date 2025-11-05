import { z } from 'zod';
import {
  createZodSchema,
  createAliasSchema,
  createTokenSchema,
} from '../shared';

export const typeScaleSchema = createZodSchema({
  name: 'typography',
  schema: {
    heading: {
      regular: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        '1000',
        '1100',
        '1200',
      ],
      bold: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        '1000',
        '1100',
        '1200',
      ],
    },
    text: {
      regular: ['100', '200', '300', '400', '500'],
      bold: ['100', '200', '300', '400', '500'],
    },
  },
  transform: ({ value }) => {
    return createTokenSchema({
      type: 'typography',
      valueSchema: z.object({
        fontFamily: createAliasSchema('fontFamily'),
        fontSize: createAliasSchema('fontSize'),
        fontWeight: createAliasSchema('fontWeight'),
        lineHeight: createAliasSchema('lineHeight'),
      }),
      name: value,
    });
  },
});
