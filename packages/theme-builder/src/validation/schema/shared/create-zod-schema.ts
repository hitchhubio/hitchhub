import { z, type ZodTypeAny } from 'zod';

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export type SchemaShape = Record<string, unknown>;

export function createZodSchema({
  name,
  values,
  schema,
  transform,
}: {
  name: string;
  values?: string[];
  schema?: SchemaShape;
  transform: ({ value, path }: { value: string; path: string[] }) => ZodTypeAny;
}) {
  function walk(node: unknown, path: string[] = []): ZodTypeAny {
    if (isStringArray(node)) {
      const objectShape: Record<string, ZodTypeAny> = {};

      for (const item of node) {
        objectShape[item] = transform({ value: item, path: [...path, item] });
      }

      return z
        .object(objectShape, {
          message: `The path '${path.join('.')}' is required.`,
        })
        .strict();
    }

    if (isRecord(node)) {
      const shape: Record<string, ZodTypeAny> = {};

      for (const [key, value] of Object.entries(node)) {
        shape[key] = walk(value, [...path, key]);
      }

      return z
        .object(shape, {
          message: `The path '${path.join('.') || name}' is required.`,
        })
        .strict();
    }

    if (node === null || node === undefined) {
      const last = path.at(-1);

      if (!last) {
        throw new Error(
          `Missing value for transform at path '${path.join('.') || name}'`,
        );
      }

      return transform({ value: last, path });
    }

    throw new Error(
      `Invalid schema value at path '${path.join('.') || name}': expected string[] or object.`,
    );
  }

  const rootShape: Record<string, ZodTypeAny> = {};

  Object.assign(
    rootShape,
    schema ? (walk(schema) as z.ZodObject<z.ZodRawShape>).shape : {},
  );

  if (values?.length) {
    for (const value of values) {
      rootShape[value] = transform({ value, path: [value] });
    }
  }

  return z
    .object(rootShape, {
      message: `The path '${name}' is required.`,
    })
    .strict();
}
