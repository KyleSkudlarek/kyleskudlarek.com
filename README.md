# kyleskudlarek.com

My personal site, live at [kyleskudlarek.com](https://kyleskudlarek.com). A digital
zen garden: home base for projects, writing, and whatever I'm currently curious
about.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) with `output: 'export'` — the whole
  site builds to static HTML in `out/`
- [Tailwind CSS v4](https://tailwindcss.com) with design tokens in `app/globals.css`
- TypeScript
- Hosted on AWS: S3 behind CloudFront, DNS via Route 53

There is no server. Anything dynamic (like the GitHub star counts on the Projects
page) is fetched client-side.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Static export to `out/` |
| `npm run deploy` | Build, sync `out/` to S3, invalidate CloudFront (needs AWS credentials) |
| `npm run images` | Regenerate optimized WebP in `public/` from the originals in `assets/` |

Always deploy through `npm run deploy` — the CloudFront invalidation is part of it,
and skipping it serves stale assets.

## Structure

```
app/            Pages (App Router) + components
  globals.css   Design tokens and the component layer — the design system lives here
lib/site.ts     Site metadata and links — single source of truth
lib/projects.ts Project cards for the Projects page
assets/         Original images (not served)
public/         Static files, including WebP generated from assets/
scripts/        Image optimization (sharp)
```

## Content and design docs

- **PROJECT_NOTES.md** — the source of truth: design vision, tone-of-voice
  standard, locked decisions, content architecture.
- **CLAUDE.md** — operational notes for working sessions: constraints, gotchas,
  verification workflow.
- The [/garden](https://kyleskudlarek.com/garden/) page doubles as a colophon —
  how the site is made, palette, and type.
