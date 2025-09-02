# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with hot-reload (runs on 0.0.0.0:5173)
- `npm run build` - Type-check, compile and minify for production
- `npm run build-only` - Build without type checking
- `npm run preview` - Preview production build

### Code Quality
- `npm run lint` - Run all linters (oxlint + eslint)
- `npm run lint:oxlint` - Run oxlint with auto-fix
- `npm run lint:eslint` - Run eslint with auto-fix
- `npm run type-check` - Run TypeScript type checking with vue-tsc
- `npm run format` - Format code with Prettier

## Architecture

This is a Vue 3 + TypeScript + Vite AIGC (AI Generated Content) application using Composition API.

### Key Technologies
- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety
- **Vue Router** for client-side routing
- **Pinia** for state management
- **Vite** for build tooling and development server

### Project Structure
- `src/App.vue` - Main application component with layout structure
- `src/layouts/DefaultLayout.vue` - Alternative layout component (currently unused)
- `src/router/index.ts` - Vue Router configuration with AIGC-focused routes
- `src/stores/counter.ts` - Pinia store example
- `src/components/Layout/` - Layout components (Header, Sidebar, MainContent)
- `src/views/` - Page components for AIGC features

### Application Features
The application is designed for AIGC workflows with the following main views:
- **Dashboard** - Main overview page (default route)
- **Image Training** - AI image model training interface
- **Speaker Training** - Voice/speaker model training interface  
- **Video Generation** - AI video generation tools
- **Agent Management** - AI agent configuration and management

### Layout Architecture
The app uses a fixed sidebar + header layout:
- Sidebar (280px width) with navigation for AIGC features
- Fixed header (60px height) at the top
- Main content area with router-view for page switching
- Layout is defined directly in App.vue (DefaultLayout.vue exists but is not used)

### Routing
- Routes are configured for AIGC-specific pages
- Root path `/` redirects to `/dashboard`
- Uses lazy loading for most route components except ImageTraining
- Path aliases: `@` points to `src/` directory

### Development Notes
- Server configured to listen on all addresses (0.0.0.0) for network access
- Uses Vue DevTools plugin for development
- Configured with both oxlint and ESLint for comprehensive linting
- TypeScript strict mode with Vue-specific type support via vue-tsc