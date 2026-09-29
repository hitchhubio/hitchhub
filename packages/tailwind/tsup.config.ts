import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/compiler.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['@hitchhub/token-builder'],
});
