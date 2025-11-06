# 🚧 HitchHub (Work in Progress)

HitchHub is a modern, token-driven design system built to create consistency, accessibility, and agility across digital products.
It provides a unified source of truth for design decisions — from tokens to components — enabling scalable, maintainable front-end architecture.

### ✅ Current Features

- 🔹 DTCG-compliant design tokens (`color`, `spacing`, `typography`, `motion`)
- 🔹 Automated token builds via **Style Dictionary**
- 🔹 **Tailwind** integration with generated theme configuration
- 🔹 **Figma token export** for visual design parity
- 🔹 **React component architecture** with semantic tokens
- 🔹 Accessible, theme-aware primitives (light/dark mode support)

### 🧩 Upcoming / In Progress

- [ ] CI/CD workflow for versioned package releases
- [ ] Box implemenation for token usage discovery
- [ ] Component library expansion  
- [ ] Theming system with brand variants  
- [ ] Testing coverage (Vitest + Playwright)  
- [ ] Documentation site

## Overview

HitchHub integrates **Style Dictionary**, **Tailwind**, and **Figma** token exports to create a seamless workflow between design and development.

It uses **DTCG-compliant tokens** (Design Tokens Community Group format) as the foundation, generating:

- **Figma-ready token exports** for visual design parity
- **Tailwind theme configuration** for development
- **Composable React components** styled with Tailwind utilities and token references

This ensures designers and engineers share the same language of colour, spacing, typography, and motion.

## Core Concepts

All visual primitives are defined as [DTCG JSON](https://www.designtokens.org/) tokens:

```json
{
  "$type": "color",
  "$value": "#34507B"
}
```

These tokens are transformed by Style Dictionary into multiple formats (Figma, CSS variables, Tailwind theme, TypeScript metadata).

The same token source is transformed into a Figma-compatible format, ensuring alignment between design and engineering.
Designers can import tokens via the Microsoft `figma-variables-import` plugin - https://github.com/microsoft/figma-variables-import.

The React components are styled using the generated Tailwind theme, each component:

- Supports dark/light modes
- Supports semantic tokens for theme switching
- Accessibility best practices

## Guiding Principles

- **Single Source of Truth** — One definition for tokens, exported to every consumer
- **Accessibility by Design** — WCAG-compliant colour contrast and interaction states
- **System over Styling** — Scalable abstractions that evolve with the product ecosystem
- **Clarity & Collaboration** — Shared language between design and engineering for agility
