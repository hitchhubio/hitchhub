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

declare function getValue<T>({ value, path, defaultValue, }: {
    value: Record<string, unknown>;
    path: string;
    defaultValue?: T;
}): T;

declare function isAlias(value: unknown): boolean;

export { type CompositeToken, type Token, aliasToPath, flattenComposite, flattenCompositeAlias, getValue, isAlias, isCompositeToken, isObject, isToken, pathToAlias };
