import {
  createAliasSchema,
  createTokenSchema,
  createZodSchema,
} from '../shared';

export const breakpointSchema = createZodSchema({
  name: 'breakpoint',
  values: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
  transform: ({ value }) => {
    return createTokenSchema({
      type: 'dimension',
      valueSchema: createAliasSchema(value),
      name: value,
    });
  },
});
