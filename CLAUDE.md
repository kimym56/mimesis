# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Mimesis is a UX portfolio that displays original visual works side-by-side with their imitations. It's a study in recreating premium interfaces with minimal, soft aesthetics.

## Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Next.js 16** with App Router (not Pages Router)
- **React 19** with TypeScript
- **Styling**: CSS Modules (`.module.css`) + global CSS variables in `globals.css`
- **Animations**: Framer Motion for page transitions and hover effects
- **Icons**: Lucide React
- **Fonts**: Inter via `next/font/google`

## Architecture

### Path Aliases

`@/*` maps to `./src/*` — use this for all internal imports.

### Data Layer

Projects are defined in `src/data/projects.ts` as a simple TypeScript array. When adding a new project:
1. Add to the `projects` array with `id`, `title`, `description`, `originalImage`, `imitationImage`
2. The dynamic route at `app/project/[id]/page.tsx` uses `generateStaticParams()` to pre-render all project pages

### Styling Approach

- **Global styles**: CSS variables for colors in `globals.css` — supports light/dark mode via `prefers-color-scheme`
- **Component styles**: CSS Modules (co-located `.module.css` files)
- No Tailwind utility classes in component code — use the CSS Modules or globals.css utilities (`.container`, `.title`, `.subtitle`)

### Page Structure

- `app/page.tsx` - Home page with project grid
- `app/project/[id]/page.tsx` - Dynamic route using `generateStaticParams()` for static generation
- `app/project/[id]/ProjectDetailClient.tsx` - Client component with Framer Motion animations (split-pane comparison view)

### Key Patterns

- **Server vs Client**: App router pages are server components by default. Only `ProjectDetailClient.tsx` and `ProjectGrid.tsx` are client components (marked with `"use client"`) for Framer Motion animations.
- **Images**: Next.js `Image` component with `fill` prop for responsive images. Remote images from Unsplash are whitelisted in `next.config.ts`.
