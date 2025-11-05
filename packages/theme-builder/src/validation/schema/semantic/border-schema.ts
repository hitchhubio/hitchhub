import {
  createZodSchema,
  createAliasSchema,
  createTokenSchema,
} from '../shared';

export const borderSchema = createZodSchema({
  name: 'border',
  schema: {
    form: {
      width: ['default', 'invalid'],
      radius: ['default'],
    },
  },
  transform: ({ value }) => {
    return createTokenSchema({
      type: 'dimension',
      valueSchema: createAliasSchema(value),
      name: value,
    });
  },
});
