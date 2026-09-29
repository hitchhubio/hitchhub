# HitchHub

HitchHub is an open-source, design-token-aware component system. It records the machine-readable relationship between a component part, a styling property, and a DTCG token, then delegates styling output to an adapter.

```text
DTCG token sources ──→ normalized manifest ──→ Tailwind v4 theme
                                                ↑
component definitions ──→ styling adapter ──→ generated classes
          │
          └── opt-in registry ──→ DOM inspector ──→ overlays/docs/devtools
```

## Packages

- `@hitchhub/core` — framework-agnostic definitions, validation, instrumentation registry, and coverage reports.
- `@hitchhub/tailwind` — Tailwind utility adapter and exports for the existing Style Dictionary compiler.
- `@hitchhub/components` — ready-made React `Button`, `Avatar`, and `Select` examples.
- `@hitchhub/theme-default` — DTCG source contract plus generated light/dark CSS, Tailwind theme, raw tokens, and normalized manifest.
- `@hitchhub/inspector` — explicit DOM inspection and visual token overlays.

The existing `@hitchhub/token-builder`, `@hitchhub/token-utils`, and `@hitchhub/theme-builder` packages remain the build foundation. The older `@hitchhub-react/ds` package remains available for migration, but new work should use `@hitchhub/components`.

## Public API

Create a configured Hitch instance once. One-off styling returns a class string:

```ts
import { createHitch } from '@hitchhub/core';
import { tailwind } from '@hitchhub/tailwind';
import { manifest } from '@hitchhub/theme-default';

const hitch = createHitch({ adapter: tailwind(), manifest });

hitch({
  padding: 'space.4',
  backgroundColor: 'surface.primary',
  borderRadius: 'border.form.radius.default',
});
// p-4 bg-surface-primary rounded-border-form-radius-default
```

Component definitions resolve and validate once at module initialisation:

```ts
const select = hitch.component('Select', {
  trigger: {
    paddingInline: 'space.4',
    paddingBlock: 'space.2',
    backgroundColor: 'surface.secondary',
  },
  icon: { color: 'text.muted' },
});

select.trigger.className; // px-4 py-2 bg-surface-secondary
select.trigger.meta; // component → part → property → token
select.trigger.attributes; // {} unless instrumentation was enabled
```

Unknown tokens and incompatible DTCG types throw useful definition-time errors. No token files are parsed and no aliases are resolved during rendering.

## Components and existing libraries

Import the generated component CSS and a theme once:

```tsx
import '@hitchhub/theme-default/theme.css';
import '@hitchhub/components/styles.css';
import { Button } from '@hitchhub/components';

<Button>Save</Button>;
```

HitchHub does not require its component package. Apply a generated string to Base UI, Radix, shadcn, or a custom component through its existing `className` API:

```tsx
import { Select } from '@base-ui-components/react/select';

const styles = hitch.component('AccountSelect', {
  trigger: {
    paddingInline: 'space.4',
    backgroundColor: 'surface.secondary',
  },
});

<Select.Trigger
  className={styles.trigger.className}
  {...styles.trigger.attributes}
/>;
```

## Themes

`@hitchhub/theme-default/theme.css` makes light values the root default and provides a dark override:

```html
<section data-theme="default-dark">…</section>
```

Component code refers only to the semantic token contract. Another theme can supply compatible DTCG paths and the same generated Tailwind namespaces without changing components. `tokens.json`, `manifest.json`, `theme.css`, and `tailwind.css` are generated package exports.

## Inspector

Instrumentation is explicit. With it disabled there are no `data-hh-*` attributes, registry entries, observers, or geometry work.

```ts
const registry = createInstrumentationRegistry();
const hitch = createHitch({
  adapter: tailwind({ prefix: 'hitch' }),
  manifest,
  instrumentation: { registry },
});

const inspector = createInspector({ manifest, registry });
const result = inspector.inspect(element);
```

Use `createTokenOverlay(document).show(result, property)` to highlight live padding, colour, radius, or part bounds. The Storybook proof of concept renders actual components and provides component-to-token and token-to-overlay interaction.

## Coverage

`createCoverageReport(hitch.components, manifest)` returns structured existence/type coverage. `formatCoverageReport(report)` produces a terminal-friendly report such as `✓ root.paddingInline → space.4`.

## Development

```sh
pnpm install
pnpm test
pnpm types:check
pnpm lint
pnpm build
pnpm --dir packages/components storybook
```

Open Storybook at `http://localhost:6006` and choose **Inspector / Token overlay**. Click a rendered part and hover its token rows to see overlays based on actual DOM geometry.
