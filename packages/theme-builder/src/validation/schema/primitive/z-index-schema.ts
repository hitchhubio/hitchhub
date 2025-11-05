import {
  createZodSchema,
  createIntegerSchema,
  createTokenSchema,
} from '../shared';

export const zIndexSchema = createZodSchema({
  name: 'zIndex',
  values: [
    '1',
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
  ],
  transform: ({ value }) => {
    return createTokenSchema({
      type: 'number',
      valueSchema: createIntegerSchema(value),
      name: value,
    });
  },
});
