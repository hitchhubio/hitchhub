import { z } from 'zod';
import {
  createZodSchema,
  createStringArraySchema,
  createTokenSchema,
  createIntegerSchema,
  createNumberSchema,
  createRemSchema,
} from '../shared';

export const fontSchema = z
  .object(
    {
      family: createZodSchema({
        name: 'family',
        values: ['primary', 'secondary', 'tertiary'],
        transform: ({ value }) => {
          return createTokenSchema({
            type: 'fontFamily',
            valueSchema: createStringArraySchema(value),
            name: value,
          });
        },
      }),
      size: createZodSchema({
        name: 'size',
        values: [
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
          '1000',
          '1100',
          '1200',
          '1300',
          '1400',
        ],
        transform: ({ value }) => {
          return createTokenSchema({
            type: 'dimension',
            valueSchema: createRemSchema(value),
            name: value,
          });
        },
      }),
      weight: createZodSchema({
        name: 'weight',
        values: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        transform: ({ value }) => {
          return createTokenSchema({
            type: 'fontWeight',
            valueSchema: createIntegerSchema(value),
            name: value,
          });
        },
      }),
      lineHeight: createZodSchema({
        name: 'lineHeight',
        values: [
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
          '1000',
          '1100',
          '1200',
          '1300',
        ],
        transform: ({ value }) => {
          return createTokenSchema({
            type: 'number',
            valueSchema: createNumberSchema(value),
            name: value,
          });
        },
      }),
      letterSpacing: createZodSchema({
        name: 'letterSpacing',
        values: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        transform: ({ value }) => {
          return createTokenSchema({
            type: 'dimension',
            valueSchema: createRemSchema(value),
            name: value,
          });
        },
      }),
    },
    {
      message: `The path 'font' is required.`,
    },
  )
  .strict();
