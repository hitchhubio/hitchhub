import type { TokenBuilderPlatform } from './token-builder.js';

function ensureTrailingSlash(path: string) {
  if (!path) {
    return path;
  }

  return path.endsWith('/') ? path : `${path}/`;
}

export function createPlatformCss({
  prefix,
  selector,
  outputFolder,
  outputFilename,
}: {
  prefix?: string;
  selector: string;
  outputFolder: string;
  outputFilename: string;
}): TokenBuilderPlatform {
  return {
    id: 'css',
    configure: () => ({
      transformGroup: 'css/custom',
      buildPath: ensureTrailingSlash(outputFolder),
      prefix,
      files: [
        {
          format: 'css/variables',
          destination: outputFilename,
        },
      ],
      options: {
        showFileHeader: false,
        selector,
        outputReferences: true,
      },
    }),
  };
}

export function createPlatformCssVariableObject({
  prefix,
  exportName,
  exportType,
  outputFolder,
  outputFilename,
}: {
  prefix?: string;
  exportName: string;
  exportType?: string;
  outputFolder: string;
  outputFilename: string;
}) {
  return {
    id: 'cssVariableObject',
    configure: () => ({
      transformGroup: 'css/custom',
      buildPath: ensureTrailingSlash(outputFolder),
      prefix,
      files: [
        {
          format: 'css/variable-object',
          destination: outputFilename,
        },
      ],
      options: {
        fileHeader: 'auto-generated',
        exportName,
        exportType,
      },
    }),
  };
}

export function createPlatformCssVariableConsts({
  prefix,
  camelCase,
  outputFolder,
  outputFilename,
}: {
  prefix?: string;
  camelCase?: boolean;
  outputFolder: string;
  outputFilename: string;
}) {
  return {
    id: 'cssVariableConsts',
    configure: () => ({
      transformGroup: 'css/custom',
      buildPath: ensureTrailingSlash(outputFolder),
      prefix,
      files: [
        {
          format: 'css/variable-consts',
          destination: outputFilename,
        },
      ],
      options: {
        fileHeader: 'auto-generated',
        camelCase,
      },
    }),
  };
}

export function createPlatformTypeScript({
  header,
  exportName,
  exportType,
  outputFolder,
  outputFilename,
  outputReferences,
}: {
  header?: string;
  exportName: string;
  exportType?: string;
  outputFolder: string;
  outputFilename: string;
  outputReferences: boolean;
}) {
  return {
    id: 'typeScript',
    configure: () => ({
      transformGroup: 'js',
      buildPath: ensureTrailingSlash(outputFolder),
      files: [
        {
          format: 'typeScript/object',
          destination: outputFilename,
        },
      ],
      options: {
        fileHeader: 'auto-generated',
        outputReferences,
        header,
        exportName,
        exportType,
      },
    }),
  };
}

export function createPlatformTypeScriptConsts({
  prefix,
  camelCase,
  outputFolder,
  outputFilename,
}: {
  prefix?: string;
  camelCase?: boolean;
  outputFolder: string;
  outputFilename: string;
}) {
  return {
    id: 'typeScriptConsts',
    configure: () => ({
      transformGroup: 'typeScript/consts',
      buildPath: ensureTrailingSlash(outputFolder),
      prefix,
      files: [
        {
          format: 'typeScript/consts',
          destination: outputFilename,
        },
      ],
      options: {
        fileHeader: 'auto-generated',
        camelCase,
      },
    }),
  };
}

export function createPlatformDtcg({
  outputFolder,
  outputFilename,
}: {
  outputFolder: string;
  outputFilename: string;
}) {
  return {
    id: 'dtcg',
    configure: () => ({
      transformGroup: 'js',
      buildPath: ensureTrailingSlash(outputFolder),
      files: [
        {
          format: 'dtcg',
          destination: outputFilename,
        },
      ],
      options: {
        outputReferences: true,
      },
    }),
  };
}

export function createPlatformTailwindTheme({
  prefix,
  outputFolder,
  outputFilename,
}: {
  prefix?: string;
  outputFolder: string;
  outputFilename: string;
}) {
  return {
    id: 'tailwindTheme',
    configure: () => ({
      transformGroup: 'css/custom',
      buildPath: ensureTrailingSlash(outputFolder),
      prefix,
      files: [
        {
          format: 'tailwind/theme',
          destination: outputFilename,
        },
      ],
      options: {
        outputReferences: true,
      },
    }),
  };
}

export function createPlatformFigma({
  outputFolder,
  outputFilename,
}: {
  outputFolder: string;
  outputFilename: string;
}) {
  return {
    id: 'figma',
    configure: () => ({
      transformGroup: 'figma',
      buildPath: ensureTrailingSlash(outputFolder),
      files: [
        {
          format: 'figma',
          destination: outputFilename,
        },
      ],
      options: {
        outputReferences: true,
      },
    }),
  };
}
