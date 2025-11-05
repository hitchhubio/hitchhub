import {
  createZodSchema,
  createPixelSchema,
  createTokenSchema,
} from '../shared';

export const sizeSchema = createZodSchema({
  name: 'size',
  values: ['sm', 'md', 'lg', 'xl'],
  transform: ({ value }) => {
    return createTokenSchema({
      type: 'dimension',
      valueSchema: createPixelSchema(value),
      name: value,
    });
  },
});
