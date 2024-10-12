import { isObject } from './types.js';

/**
 * Checks if the given value contains an alias.
 * An alias is defined as a string pattern enclosed in curly braces `{}`.
 *
 * @param value - The value to check, which can be of any type.
 * @returns `true` if the value is a string containing an alias or an object with any property containing an alias; otherwise, `false`.
 */
export function isAlias(value: unknown) {
  const regex = /{([^}]+)}/g;

  if (typeof value === 'string') {
    return regex.test(value);
  }

  if (isObject(value)) {
    let hasAlias = false;

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        const alias = isAlias(element);

        if (alias) {
          hasAlias = true;
          break;
        }
      }
    }

    return hasAlias;
  }

  return false;
}
