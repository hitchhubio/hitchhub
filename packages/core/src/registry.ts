import type { PartMeta } from './types.js';

export type InstrumentationRegistry = {
  register(meta: PartMeta): void;
  get(id: string): PartMeta | undefined;
  clear(): void;
}

export function createInstrumentationRegistry(): InstrumentationRegistry {
  const entries = new Map<string, PartMeta>();
  return {
    register(meta) {
      entries.set(meta.id, meta);
    },
    get(id) {
      return entries.get(id);
    },
    clear() {
      entries.clear();
    },
  };
}

export const defaultInstrumentationRegistry = createInstrumentationRegistry();
