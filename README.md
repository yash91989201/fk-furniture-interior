# fk-furniture-interior

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), with React, TanStack Start, and Bun.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - Prerendered public pages with TanStack Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Shared UI package** - shadcn/ui primitives live in `packages/ui`
- **Biome** - Linting and formatting
- **Nx** - Smart monorepo task orchestration and caching

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev:web
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the site.

## UI Customization

React web apps in this stack share shadcn/ui primitives through `packages/ui`.

- Change design tokens and global styles in `packages/ui/src/styles/globals.css`
- Update shared primitives in `packages/ui/src/components/*`
- Adjust shadcn aliases or style config in `packages/ui/components.json` and `apps/web/components.json`

### Add more shared components

Run this from the project root to add more primitives to the shared UI package:

```bash
npx shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

Import shared components like this:

```tsx
import { Button } from "@fk-furniture-interior/ui/components/button";
```

### Add app-specific blocks

If you want to add app-specific blocks instead of shared primitives, run the shadcn CLI from `apps/web`.

## Deployment

Build the public site from the repository root:

```bash
bun install --frozen-lockfile
bun run --cwd apps/web build
```

Publish the contents of `apps/web/.output/public/` to a static web server. See the [MilesWeb deployment guide](output/milesweb-deployment-guide.md) for the expected document root and verification steps.

For Docker, run `bun run docker:up` and open [http://localhost:3001](http://localhost:3001). The image serves the same generated files through nginx.

## Git Hooks and Formatting

- Run checks: `bun run check`

## Project Structure

```
fk-furniture-interior/
├── apps/
│   └── web/         # Public website (React + TanStack Start)
└── packages/
    ├── config/      # Shared TypeScript config
    └── ui/          # Shared shadcn/ui components and styles
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run dev:web`: Start only the web application
- `bun run check-types`: Check TypeScript types across all apps
- `bun run check`: Run Biome formatting and linting
- `bun run docker:build`: Build the Docker Compose images
- `bun run docker:up`: Build and start the Docker Compose stack
- `bun run docker:logs`: Tail logs from the Docker Compose stack
- `bun run docker:down`: Stop the Docker Compose stack
