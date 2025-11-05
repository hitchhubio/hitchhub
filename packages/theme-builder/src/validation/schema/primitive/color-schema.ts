import {
  createZodSchema,
  createColorHexSchema,
  createTokenSchema,
} from '../shared';

function createColorScale() {
  return [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ];
}

export const colorSchema = createZodSchema({
  name: 'color',
  values: ['white', 'black'],
  schema: {
    gray: createColorScale(),
    blue: createColorScale(),
    red: createColorScale(),
    yellow: createColorScale(),
    green: createColorScale(),
  },
  transform: ({ value }) => {
    return createTokenSchema({
      type: 'color',
      valueSchema: createColorHexSchema(value),
      name: value,
    });
  },
});
