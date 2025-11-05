import {
  createZodSchema,
  createAliasSchema,
  createTokenSchema,
} from '../shared';

function createTypographyValueSchema(name: string) {
  return createTokenSchema({
    type: 'typography',
    valueSchema: createAliasSchema(name),
    name,
  });
}

function createTypographySchema() {
  return {
    caption: null,
    button: null,
    input: null,
    label: null,
    display: ['md'],
    heading: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    body: ['sm', 'md', 'lg'],
  };
}

export const typographySchema = createZodSchema({
  name: 'typography',
  schema: {
    default: createTypographySchema(),
    xs: createTypographySchema(),
    md: createTypographySchema(),
    xl: createTypographySchema(),
  },
  transform: ({ value }) => {
    return createTypographyValueSchema(value);
  },
});
