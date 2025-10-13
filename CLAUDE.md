# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

gif2webp.com is a client-side web application that converts GIF images to WebP format entirely in the browser using WebAssembly (wasm-vips). No files are uploaded to any server.

## Workspace Structure

This is a Yarn workspaces monorepo with two packages:

- **`packages/frontend`** - React + Vite frontend application
- **`packages/image-converter`** - TypeScript library wrapping wasm-vips for image conversion

The frontend depends on the image-converter package via workspace protocol.

## Commands

### Installation
```bash
yarn install --immutable
```

### Building
The image-converter must be built before the frontend can run:
```bash
# Build image-converter library
yarn workspace @gif2webp/image-converter build

# Build frontend (includes TypeScript compilation and Vite build)
yarn workspace @gif2webp/frontend build
```

### Linting
```bash
# Lint frontend code
yarn workspace @gif2webp/frontend lint
```

### Formatting
```bash
# Format code with Biome
yarn fmt
```

### Storybook
```bash
# Run Storybook development server
yarn workspace @gif2webp/frontend storybook

# Build Storybook for production
yarn workspace @gif2webp/frontend build-storybook
```

## Pre-commit Checklist

Before committing, ensure the following commands run successfully:

1. **Build both packages**:
   ```bash
   yarn workspace @gif2webp/image-converter build
   yarn workspace @gif2webp/frontend build
   ```

2. **Run linting**:
   ```bash
   yarn workspace @gif2webp/frontend lint
   ```

3. **Run formatting**:
   ```bash
   yarn fmt
   ```

## Architecture

### Frontend Architecture

The frontend uses a modern React architecture with the following patterns:

**Context-based State Management:**
- `ThemeContext` and `ThemeProvider` - manages light/dark theme with system preference detection
- `LanguageContext` and `LanguageProvider` - manages i18n with English and Korean support

**Worker-based Conversion:**
Image conversion happens in a Web Worker (`src/workers/conversion.worker.ts`) to prevent blocking the main thread. The worker:
1. Receives image data from the main thread
2. Calls `convertImage()` from `@gif2webp/image-converter`
3. Posts result or error back to main thread

**Custom Hooks:**
- `useImageConversion` - manages conversion state and worker communication
- `useTheme` - provides theme context access
- `useLanguage` - provides language/translation context access
- `usePersistedState` - localStorage-backed state
- `useSystemTheme` - detects system theme preference

**Component Structure:**
- `Main.tsx` - root page component with file management
- `Dropzone.tsx` - file drop/upload interface
- `FileList.tsx` - displays uploaded files
- `Converter.tsx` - handles conversion UI per file
- `Header.tsx`, `Footer.tsx` - layout components
- `ErrorBoundary.tsx` - React error boundary

**Storybook Integration:**
- All UI components have corresponding `.stories.tsx` files for isolated testing
- Mock data available in `src/__mocks__/mockFiles.ts` for file-related components
- Global decorators provide ThemeProvider and LanguageProvider context
- Stories cover multiple states: default, loading, error, and success

### Image Converter Package

A thin wrapper around wasm-vips that:
- Loads WASM binary dynamically
- Preserves animation frame delays from GIF
- Supports quality and lossless options
- Provides progress callbacks for UI updates

Key function: `convertImage(data: ArrayBuffer, options?: ConversionOptions): Promise<Uint8Array>`

### Cross-Origin Isolation

The app requires cross-origin isolation headers for SharedArrayBuffer (needed by wasm-vips):
- Custom Vite plugin at `packages/frontend/.vite/plugins/isolation.ts` adds headers during dev
- `_headers` file (copied during build) provides headers for Cloudflare Pages deployment

Headers required:
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

### Build Configuration

**Vite config** (`packages/frontend/vite.config.ts`):
- Custom asset file naming to preserve WASM files without hash: `vips-es6.js` and `vips.wasm`
- Excludes `wasm-vips` from optimization
- Includes isolation plugin for dev server

**TypeScript**:
- Frontend uses composite project with separate configs for app and node (Vite config)
- Image-converter uses NodeNext module resolution for ESM output

## Important Constraints

1. **Build order matters**: Always build `@gif2webp/image-converter` before working with the frontend
2. **WASM requirements**: The app needs cross-origin isolation headers to function. The custom Vite plugin handles this in dev mode
3. **Client-side only**: All conversion happens in the browser. There is no backend server
4. **File size limits**: Configured in `packages/frontend/src/config/conversion.ts` (200MB max, 100MB recommended)
