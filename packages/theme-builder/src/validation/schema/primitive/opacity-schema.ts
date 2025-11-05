import {
  createZodSchema,
  createNumberSchema,
  createTokenSchema,
} from '../shared';

export const opacitySchema = createZodSchema({
  name: 'opacity',
  values: [
    '0',
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
    '60',
    '65',
    '70',
    '75',
    '80',
    '85',
    '90',
    '95',
    '100',
  ],
  transform: ({ value }) => {
    return createTokenSchema({
      type: 'number',
      valueSchema: createNumberSchema(value),
      name: value,
    });
  },
});
