import get from 'lodash/get.js';

/**
 * Retrieves a value from a nested object using a dot-separated path.
 *
 * @template T - The type of the value to be returned.
 * @param {Object} params - The parameters object.
 * @param {Record<string, unknown>} params.value - The object from which to retrieve the value.
 * @param {string} params.path - The dot-separated path to the value within the object.
 * @param {T} [params.defaultValue] - The default value to return if the path does not exist.
 * @returns {T} - The value found at the specified path, or the default value if the path does not exist.
 */
export function getValue<T>({
  value,
  path,
  defaultValue,
}: {
  value: Record<string, unknown>;
  path: string;
  defaultValue?: T;
}): T {
  return get(value, path, defaultValue) as T;
}
