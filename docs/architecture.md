# Architecture

## Data flow

The Style Dictionary pipeline remains responsible for reading and resolving DTCG sources. Its Tailwind formatter generates CSS v4 theme namespaces, while the theme build also emits a compact manifest with `path`, `type`, `value`, `resolvedValue`, and CSS-variable metadata.

`@hitchhub/core` receives that prebuilt manifest. `hitch()` validates each property/token pair and asks a `StylingAdapter` for a representation. `hitch.component()` performs the same work once for every named part and retains immutable relationship metadata beside the generated class string. A future compile-time transform can replace either call because definitions have no render-time state.

Core has no React, browser, Tailwind, or theme dependency. The Tailwind adapter turns normalized names into utility strings; the existing formatter independently turns the same token paths into matching Tailwind theme variables.

## Instrumentation boundary

Instrumentation is disabled by default. Enabling it registers each component-part definition and exposes only a short stable identifier for the DOM. React components spread that attribute only when created with an instrumented Hitch instance. The inspector resolves the identifier, joins it to the supplied manifest, and samples geometry/computed styles on demand.

There is intentionally no observer or global DOM scan. Overlay creation is a separate imperative call, so normal application bundles can omit the inspector entirely.

## Theme contract

Ready-made components validate against semantic names and DTCG types rather than importing default values. The default theme fulfils that contract. A replacement theme must provide compatible paths/types and generate the same Tailwind namespaces; values, aliases, selectors, and light/dark switching remain theme concerns.

## Extension points

- Implement `StylingAdapter.resolve()` for CSS variables, static class maps, or another utility framework.
- Generate a manifest with `createTokenManifest()` during any DTCG build pipeline.
- Render inspector results in Storybook, documentation, a browser panel, or future DevTools.
- Add wireframe labels by consuming `InspectionResult.geometry`; the first overlay intentionally uses the real DOM and never reconstructs components.
