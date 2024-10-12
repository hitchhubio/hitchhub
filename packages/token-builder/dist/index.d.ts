type TokenBuilderPlatformConfig = {
    css?: {
        prefix?: string;
        selector: string;
        outputFolder: string;
        outputFilename: string;
    };
    cssVariableObject?: {
        prefix?: string;
        exportName: string;
        exportType?: string;
        outputFolder: string;
        outputFilename: string;
    };
    cssVariableConsts?: {
        prefix?: string;
        camelCase?: boolean;
        outputFolder: string;
        outputFilename: string;
    };
    typeScript?: {
        header?: string;
        exportName: string;
        exportType?: string;
        outputFolder: string;
        outputFilename: string;
        outputReferences: boolean;
    };
    typeScriptConsts?: {
        prefix?: string;
        camelCase?: boolean;
        outputFolder: string;
        outputFilename: string;
    };
    dtcg?: {
        outputFolder: string;
        outputFilename: string;
    };
    figma?: {
        outputFolder: string;
        outputFilename: string;
    };
};
type TokenBuilderOptions = {
    source?: string[];
    tokens?: any;
    platforms: TokenBuilderPlatformConfig;
};
declare function buildTokens({ source, tokens, platforms, }: TokenBuilderOptions): Promise<void>;

export { type TokenBuilderOptions, type TokenBuilderPlatformConfig, buildTokens };
