import {
  createZodSchema,
  createShadowValueSchema,
  createTokenSchema,
} from '../shared';

export const shadowSchema = createZodSchema({
  name: 'shadow',
  values: ['100', '200', '300', '400', '500', '600'],
  transform: ({ value }) => {
    return createTokenSchema({
      type: 'shadow',
      valueSchema: createShadowValueSchema(value),
      name: value,
    });
  },
});
