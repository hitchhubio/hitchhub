import {
  createZodSchema,
  createAliasSchema,
  createTokenSchema,
} from '../shared';

export const colorSchema = createZodSchema({
  name: 'color',
  schema: {
    surface: ['primary', 'secondary', 'warning', 'muted'],
    text: ['default', 'muted', 'error'],
    ring: ['focus'],
    form: {
      text: ['default', 'placeholder'],
      border: ['default', 'hover', 'readOnly', 'disabled', 'error'],
    },
    button: {
      primary: {
        background: ['default', 'hover', 'active', 'disabled'],
        text: ['default', 'disabled'],
      },
      secondary: {
        background: ['hover'],
        text: ['default', 'disabled'],
        border: ['default', 'active'],
      },
      tertiary: {
        background: ['hover', 'active'],
        text: ['default', 'disabled', 'disabled'],
      },
      destructive: {
        background: ['default', 'hover', 'active', 'disabled'],
        text: ['default', 'disabled'],
      },
      inverted: {
        background: ['hover'],
        border: ['default', 'active', 'disabled'],
        text: ['default', 'disabled'],
      },
    },
  },
  transform: ({ value }) => {
    return createTokenSchema({
      type: 'color',
      valueSchema: createAliasSchema(value),
      name: value,
    });
  },
});
