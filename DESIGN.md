# Design Brief

## Direction

DukaanBazar — A warm, professional marketplace platform celebrating local Indian clothing craftsmanship through a modern digital interface.

## Tone

Contemporary marketplace with cultural warmth. Confident, inviting, celebratory of local makers without bohemian cliché. Accessible to both sellers and buyers, inspired by the vibrancy and craft of Indian textiles.

## Differentiation

Terracotta and gold color story rooted in traditional Indian textile dyes, paired with elegant serif typography for product hierarchy and distinctly non-generic marketplace positioning.

## Color Palette

| Token          | OKLCH         | Role                              |
| -------------- | ------------- | --------------------------------- |
| background     | 0.968 0.015 75  | Warm cream, light-mode primary    |
| foreground     | 0.18 0.025 45   | Deep brown, high contrast text    |
| card           | 0.99 0.008 75   | Elevated product cards            |
| primary        | 0.48 0.14 30    | Terracotta CTA, craft warmth      |
| accent         | 0.62 0.12 70    | Warm gold, highlights, badges     |
| destructive    | 0.55 0.22 25    | Red/coral for delete/warning      |
| border         | 0.88 0.018 75   | Subtle frame lines                |

## Typography

- Display: Fraunces — elegant serif for product names, category headers, shop names. Creates visual distinction and craft impression.
- Body: General Sans — clean, readable sans-serif for descriptions, labels, CTAs. Modern UI clarity.
- Scale: Hero `text-5xl font-bold`, h2 `text-3xl font-bold tracking-tight`, label `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Card-based hierarchy with subtle borders, no aggressive shadows. Product and shop cards elevated via `bg-card` with `border-border`, creating visual separation from `bg-background` without depth blur.

## Structural Zones

| Zone    | Background      | Border          | Notes                                      |
| ------- | --------------- | --------------- | ------------------------------------------ |
| Header  | bg-primary/card | border-b        | Nav, search, seller login                  |
| Hero    | bg-background   | —               | Hero text + grid intro, no image           |
| Content | bg-background   | —               | Shop cards, product grids, alternating     |
| Cards   | bg-card         | border          | Each shop/product with clear boundaries    |
| Footer  | bg-muted        | border-t        | Links, language, branding                  |

## Spacing & Rhythm

Spacious grid layout (3 cols mobile → 4 cols desktop). Section gaps `gap-8`, card internals `p-6`. Tighter micro-spacing on labels (`gap-2`). Clear visual grouping via consistent padding, no density cramping.

## Component Patterns

- Buttons: Terracotta primary (`bg-primary text-primary-foreground`), gold secondary, white outline for tertiary. Rounded corners `rounded-lg`. Hover via lightness shift.
- Cards: `bg-card border border-border` with `rounded-lg`. Product cards 2:3 ratio for textile imagery. Shop cards square ratio.
- Badges: Category badges in warm gold (`bg-accent text-accent-foreground`), inline with product title.

## Motion

Entrance: fade-in + subtle slide on page load (200ms). Hover: text color shift to primary, border highlight. No bouncy animations. Transitions via `transition-smooth` utility.

## Constraints

- Light mode only (warm Indian marketplace context).
- No dark mode (initial release). Dark mode palette exists for future iterations.
- No gradients on large surfaces (editorial clarity). Accent gradients on CTAs permissible.
- Terracotta primary and gold accent used sparingly — max 2 per viewport. Restraint over visual noise.
- Typography hierarchy mandatory: h1/h2 in Fraunces display, body/labels in General Sans.

## Signature Detail

Warm cream background with deep terracotta + gold color story creates unmistakable Indian-inspired marketplace identity without cliché, differentiating from generic blue-button e-commerce platforms.
