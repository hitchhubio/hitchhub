declare function pathToAlias(path: string): string;
declare function aliasToPath(alias: string): string;

type Token = {
    $type: string;
    $value: unknown;
};
type CompositeToken = {
    $type: string;
    $value: Record<string, unknown>;
};
declare function isObject(value: unknown): value is Record<string, unknown>;
declare function isToken(value: unknown): value is Token;
declare function isCompositeToken(value: unknown): value is CompositeToken;

declare function flattenCompositeAlias({ alias, aliasedValue, resolveType, }: {
    alias: string;
    aliasedValue: CompositeToken;
    resolveType: (key: string) => string | undefined;
}): Record<string, Token>;

declare function flattenComposite({ value, resolveType, }: {
    value: CompositeToken;
    resolveType: (key: string) => string | undefined;
}): Record<string, Token>;

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
declare function getValue<T>({ value, path, defaultValue, }: {
    value: Record<string, unknown>;
    path: string;
    defaultValue?: T;
}): T;

/**
 * Checks if the given value contains an alias.
 * An alias is defined as a string pattern enclosed in curly braces `{}`.
 *
 * @param value - The value to check, which can be of any type.
 * @returns `true` if the value is a string containing an alias or an object with any property containing an alias; otherwise, `false`.
 */
declare function isAlias(value: unknown): boolean;

export { type CompositeToken, type Token, aliasToPath, flattenComposite, flattenCompositeAlias, getValue, isAlias, isCompositeToken, isObject, isToken, pathToAlias };
