# AGENTS.md

## Commands
- **Build**: `yarn workspace @gif2webp/image-converter build && yarn workspace @gif2webp/frontend build`
- **Lint**: `yarn workspace @gif2webp/frontend lint`
- **Format**: `yarn fmt`
- **Dev**: `yarn workspace @gif2webp/frontend dev`
- **Storybook**: `yarn workspace @gif2webp/frontend storybook`

## Architecture
Yarn workspaces monorepo:
- `packages/frontend`: React + Vite app with client-side GIF→WebP conversion
- `packages/image-converter`: TypeScript wrapper around wasm-vips for image processing
No backend; all conversion happens in browser using WebAssembly.

## Code Style
- **TypeScript**: Strict mode, ESNext target, noEmit for frontend, NodeNext for library
- **React**: v19, hooks-based, context for state (Theme, Language)
- **Linting**: ESLint with recommended + React hooks rules
- **Formatting**: Biome (biome.json config)
- **Imports**: ES modules, workspace protocol for internal deps
- **Naming**: camelCase for vars/functions, PascalCase for components/types
- **Error Handling**: Try/catch in async operations, ErrorBoundary for React

## Rules
See CLAUDE.md for detailed project constraints and architecture notes.
