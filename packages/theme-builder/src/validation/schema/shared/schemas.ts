import { z } from 'zod';

export function createTokenSchema({
  type,
  valueSchema,
  name,
}: {
  type: string;
  valueSchema: z.ZodSchema;
  name: string;
}) {
  return z
    .object(
      {
        $type: z.literal(type, {
          message: `Invalid literal value, expected "${type}".`,
        }),
        $value: valueSchema,
      },
      {
        message: `The path '${name}' is required.`,
      },
    )
    .strict();
}

export function createStringSchema(name: string) {
  return z.string({
    message: `The path '${name}' is required.`,
  });
}

export function createStringArraySchema(name: string) {
  return z
    .array(
      z.string({
        message: `The path '${name}' is required.`,
      }),
    )
    .nonempty();
}

export function createColorHexSchema(name: string) {
  return z
    .string({
      message: `The path '${name}' is required.`,
    })
    .regex(
      /^#[\da-f]{6,8}$/,
      `The path '${name}' must be a full lowercase hex value.`,
    );
}

export function createPixelSchema(name: string) {
  return z
    .string({
      message: `The path '${name}' is required.`,
    })
    .regex(
      /^(-?\d+px|0)$/,
      `The path '${name}' must be a dimension in pixels.`,
    );
}

export function createRemSchema(name: string) {
  return z
    .string({
      message: `The path '${name}' is required.`,
    })
    .regex(
      /^(-?\d+(\.\d+)?rem)$/,
      `The path ${name} must be a dimension in rems.`,
    );
}

export function createEmSchema(name: string) {
  return z
    .string({
      message: `The path '${name}' is required.`,
    })
    .regex(
      /^-?\d+(\.\d+)?em$|^0$/,
      `The path '${name}' must be a dimension in ems or "0".`,
    );
}

export function createIntegerSchema(name: string) {
  return z
    .number({
      message: `The path '${name}' is required.`,
    })
    .int();
}

export function createNumberSchema(name: string) {
  return z
    .number({
      message: `The path '${name}' is required.`,
    })
    .nonnegative();
}

export function createShadowValueSchema(name: string) {
  return z
    .object(
      {
        offsetX: createPixelSchema('offsetX'),
        offsetY: createPixelSchema('offsetY'),
        blur: createPixelSchema('blur'),
        spread: createPixelSchema('spread'),
        color: createColorHexSchema('color'),
      },
      {
        message: `The path '${name}' is required.`,
      },
    )
    .strict();
}

export function createAliasSchema(name: string) {
  return z
    .string({
      message: `The path '${name}' is required.`,
    })
    .regex(/{\w+(?:\.\w+)*}/, `The path '${name}' must be a valid alias.`);
}
