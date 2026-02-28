# Mimesis Design System

> A UX portfolio exploring what it takes to recreate premium interfaces with minimal, soft aesthetics.

---

## Table of Contents

1. [Principles](#principles)
2. [Color](#color)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Layout](#layout)
6. [Components](#components)
7. [Animation](#animation)
8. [Accessibility](#accessibility)

---

## Principles

### Core Values

| Principle | Description |
|-----------|-------------|
| **Soft & Subtle** | Gentle transitions, muted colors, no harsh contrasts |
| **Content First** | Work takes center stage; UI recedes |
| **Minimal Clutter** | Single-column focus, no navigation sprawl |
| **Breathing Room** | Generous whitespace, relaxed pacing |
| **Polished Details** | Micro-interactions feel considered, not rushed |

### Anti-Patterns to Avoid

- ❌ Heavy drop shadows
- ❌ Bright/vibrant gradients
- ❌ Excessive borders or dividers
- ❌ Aggressive hover animations
- ❌ Complex navigation menus
- ❌ Text-heavy sections

---

## Color

### Color Tokens

```css
:root {
  /* Neutral Palette — Warm-off whites, not pure white */
  --background: #F9F9F7;
  --surface: #FFFFFF;
  --surface-elevated: #FEFEFE;

  /* Text — Warm darks, reduced strain */
  --foreground: #1c1c1c;
  --foreground-muted: rgba(28, 28, 28, 0.60);
  --foreground-subtle: rgba(28, 28, 28, 0.40);

  /* Accents — Single blue for interactions */
  --accent: #2563EB;
  --accent-hover: #1D4ED8;
  --accent-soft: rgba(37, 99, 235, 0.08);

  /* Borders — Visible but gentle */
  --border: rgba(0, 0, 0, 0.06);
  --border-strong: rgba(0, 0, 0, 0.10);

  /* States */
  --focus-ring: #2563EB;
  --error: #EF4444;
  --success: #22C55E;

  /* Overlays */
  --overlay-hover: rgba(0, 0, 0, 0.18);
  --overlay-pressed: rgba(0, 0, 0, 0.24);
}
```

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --background: #121212;
    --surface: #1A1A1A;
    --surface-elevated: #1F1F1F;

    --foreground: #F5F5F3;
    --foreground-muted: rgba(245, 245, 243, 0.60);
    --foreground-subtle: rgba(245, 245, 243, 0.40);

    --border: rgba(255, 255, 255, 0.08);
    --border-strong: rgba(255, 255, 255, 0.12);

    --overlay-hover: rgba(255, 255, 255, 0.12);
    --overlay-pressed: rgba(255, 255, 255, 0.16);
  }
}

[data-theme="dark"] {
  /* Same as dark preference above */
}
```

### Color Usage Guidelines

| Use Case | Token | Example |
|----------|-------|---------|
| Page background | `--background` | Main container |
| Card surface | `--surface` | Project cards, modals |
| Body text | `--foreground` | Paragraphs, descriptions |
| Secondary text | `--foreground-muted` | Metadata, captions |
| Links, buttons | `--accent` | CTAs, interactive elements |
| Dividers | `--border` | Section separators |

### Contrast Requirements

- Normal text: Minimum 4.5:1 contrast ratio
- Large text (18px+): Minimum 3:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast against background

---

## Typography

### Type Scale

```css
--font-heading: var(--font-archivo), sans-serif;
--font-body: var(--font-space-grotesk), sans-serif;
```

| Size | Font | Weight | Line-height | Usage |
|------|------|--------|-------------|-------|
| 2.5rem | Archivo | 600 | 1.15 | Page title |
| 1.875rem | Archivo | 600 | 1.2 | Section title |
| 1.125rem | Archivo | 500 | 1.3 | Card title |
| 1.125rem | Space Grotesk | 400 | 1.7 | Subtitle/lead |
| 0.9375rem | Space Grotesk | 400 | 1.6 | Body text |
| 0.75rem | Archivo | 600 | 1.4 | Labels, badges |

### Font Pairing Rationale

- **Archivo (headings)**: Geometric, confident, excellent for short display text
- **Space Grotesk (body)**: Friendly, highly readable, slightly quirky character

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
```

### Typography Rules

1. **Line Length**: Keep body text to 65-75 characters per line (approx 600px max-width)
2. **Line Height**: 1.6-1.7 for body, 1.15-1.3 for headings
3. **Letter Spacing**: -0.01em to -0.02em on headings for tighter feel
4. **No Orphans**: Avoid single words on last line of paragraphs

---

## Spacing

### Spacing Scale

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
--space-4xl: 6rem;     /* 96px */
```

### Usage Guidelines

| Context | Spacing |
|---------|---------|
| Container padding | `1.5rem` mobile, `6rem` top on desktop |
| Section gap | `4rem` vertical rhythm |
| Card gap | `2rem` (mobile), `3rem` (desktop) |
| Component padding | `1rem` — `1.5rem` |
| Text spacing | `0.4rem` between title and description |

---

## Layout

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

### Grid System

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| Mobile (< 768px) | 1 | 2rem |
| Tablet (768px - 1024px) | 2 | 3rem |
| Desktop (> 1024px) | 2 — 3 | 3rem — 4rem |

### Grid Implementation

```css
.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
}
```

---

## Components

### Project Card

```
┌─────────────────────────────────┐
│                                 │
│         [Image 4:3]             │
│     (hover: scale 1.04)         │
│                                 │
│     [Overlay: "View Details"]   │
├─────────────────────────────────┤
│ Title                           │
│ Description (muted)             │
└─────────────────────────────────┘
```

**Specs:**
- Border radius: 6px
- Image aspect ratio: 4:3
- Overlay opacity: 0 → 1 on hover
- Transition: 300ms cubic-bezier(0.16, 1, 0.3, 1)

### Theme Toggle

```
┌───┐
│ ◐ │  36px circle, centered icon
└───┘
```

**Specs:**
- Size: 2.25rem × 2.25rem
- Position: Fixed top-right
- Border: 1px soft border
- Opacity: 0.7 → 1 on hover
- Icon: 18px SVG

### Back Button

```
← Back to Projects
```

**Specs:**
- Min height: 44px (touch target)
- Gap: 0.4rem between icon and text
- Opacity: 0.75 → 1 on hover

---

## Animation

### Timing Functions

| Purpose | Easing | Duration |
|---------|--------|----------|
| Micro-interactions | `ease-out` | 150ms |
| Hover states | `cubic-bezier(0.16, 1, 0.3, 1)` | 300ms |
| Page transitions | `cubic-bezier(0.16, 1, 0.3, 1)` | 500ms |
| Overlay fade | `ease` | 300ms |

### Motion Values

```css
/* Transitions */
--transition-fast: 150ms ease-out;
--transition-base: 300ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-slow: 500ms cubic-bezier(0.16, 1, 0.3, 1);

/* Animations */
--animation-stagger: 100ms; /* Delay between grid items */
```

### Reduced Motion

Always respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
  border-radius: 2px;
}
```

### Touch Targets

- Minimum: 44px × 44px
- Preferred: 48px × 48px
- Applies to: Buttons, links, cards, toggles

### ARIA Labels

```tsx
// Icon-only buttons
<button aria-label="Switch to light mode">
  <SunIcon aria-hidden="true" />
</button>

// Decorative images
<img src="..." alt="" role="presentation" />

// Informative images
<img src="..." alt="Project title — imitation recreation" />
```

### Screen Readers

- Use semantic HTML (`main`, `header`, `nav`)
- Provide skip links for keyboard navigation
- Ensure logical tab order
- Hide decorative elements with `aria-hidden="true"`

---

## Icon System

### Icon Standards

- Library: Lucide React (or Heroicons)
- Size: 18px (inline), 24px (standalone)
- Stroke width: 2px
- Decorative icons: `aria-hidden="true"`

### Example Icons

```tsx
// Sun (light mode)
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
</svg>

// Moon (dark mode)
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
</svg>

// Arrow left
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M19 12H5M12 19l-7-7 7-7" />
</svg>
```

---

## Responsive Breakpoints

| Name | Value | Target |
|------|-------|--------|
| Mobile | < 768px | Default |
| Tablet | 768px - 1024px | 2-column grid |
| Desktop | > 1024px | Split layout, max-width |

---

## Pre-Delivery Checklist

Before shipping any feature:

- [ ] No emojis as icons (use SVG: Lucide/Heroicons)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode text contrast 4.5:1 minimum
- [ ] Dark mode text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets minimum 44px × 44px
- [ ] Alt text on all meaningful images
- [ ] `aria-label` on icon-only buttons
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2025-02-26 | 1.0 | Initial design system for Mimesis portfolio |
