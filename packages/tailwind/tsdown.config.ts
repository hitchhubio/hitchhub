import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/compiler.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  fixedExtension: false,
  deps: { neverBundle: ['@hitchhub/token-builder'] },
});
