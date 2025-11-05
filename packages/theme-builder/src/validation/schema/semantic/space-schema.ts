import {
  createZodSchema,
  createAliasSchema,
  createTokenSchema,
  createEmSchema,
} from '../shared';

export const spaceSchema = createZodSchema({
  name: 'space',
  schema: {
    heading: {
      marginTop: ['default'],
      marginBottom: ['default'],
    },
    body: {
      marginTop: ['default'],
      marginBottom: ['default'],
    },
    form: {
      paddingX: ['default', 'sm'],
      paddingY: ['default', 'sm'],
      gapY: ['default'],
    },
  },
  transform: ({ path, value }) => {
    if (['heading', 'body'].includes(path[0])) {
      return createTokenSchema({
        type: 'dimension',
        valueSchema: createEmSchema(value),
        name: value,
      });
    }

    return createTokenSchema({
      type: 'dimension',
      valueSchema: createAliasSchema(value),
      name: value,
    });
  },
});
