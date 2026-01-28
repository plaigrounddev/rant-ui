---
description: Design rules and guidelines for the rant-ui project
---

# Design Rules

## Icons
- **No sparkle icons** - Never use the Sparkles icon from lucide-react or any sparkle/magic wand style icons

## Styling
- No header line separators (border-b on headers)
- No footer line separators (border-t on footers)
- Use design system tokens for all colors (no hardcoded hex values like #FAFAFA)
- Support dark/light mode using CSS variables

## Color Tokens
- Use `bg-background`, `bg-card`, `bg-muted` etc. instead of hardcoded colors
- Use `text-foreground`, `text-muted-foreground`, `text-primary` for text colors
- Use `border-border` for borders
