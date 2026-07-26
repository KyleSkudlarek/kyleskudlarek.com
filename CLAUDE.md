# CLAUDE.md

Kyle's personal site, live at https://kyleskudlarek.com.
Next.js 16 App Router · static export · Tailwind v4 · TypeScript.

**PROJECT_NOTES.md is the source of truth.** Read it before any design, copy,
or content-architecture work — it holds the vision, tone-of-voice standard,
locked design decisions, content architecture, and prior art.

## Commands

- `npm run dev` — local dev server
- `npm run build` — static export to `out/`
- `npm run deploy` — build + S3 sync + CloudFront invalidation (needs AWS creds)
- `npm run images` — regenerate WebP from `assets/` via sharp

Never deploy without the CloudFront invalidation (`npm run deploy` includes it) —
otherwise stale assets get served.

## Hard constraints

- **Static export.** `output: 'export'`, `trailingSlash: true`, unoptimized images.
  No server-side anything; client-side fetch is fine (that's how star counts work).
- **TypeScript stays on 5.x.** `typescript@latest` pulls the TS 7 native preview
  and Next's type checker dies with `The "id" argument must be of type string`.
- Metadata routes (`app/robots.ts`, `app/sitemap.ts`) need
  `export const dynamic = 'force-static'` or the build fails.

## Locked decisions — extend, don't reinvent

- Design is settled (palette, Satoshi + JetBrains Mono type, hero composition).
  Design tokens live in `app/globals.css`; extend the system there.
- Nav is About · Projects · Garden, permanently. A new content type becomes a
  Garden filter chip, never a nav item.
- Every page title uses the heading pattern: white text with the key phrase in
  `--glow` (`<em>` inside `.display`).
- All copy follows the tone-of-voice standard in PROJECT_NOTES.md — plainspoken,
  short declarative sentences, no marketing language.

## Gotchas

- Git remote is SSH; HTTPS auth is dead on GitHub.
- Source hero art is only 1456px wide — there is no useful 2x variant.
- `lib/site.ts` is the single source of truth for links and site metadata.
- **Never hardcode a hue near the accent.** Anything accent-adjacent must derive
  from `--color-glow` via `color-mix` (mix toward `#000`/`#fff`/other tokens only).
  A hardcoded green mix in the CTA gradient survived an accent swap and left a
  green cast that had to be diagnosed later.
- **`app/garden/colophon/page.tsx` (colophon) hardcodes palette hexes, the contrast ratio,
  and the accent's origin story.** Changing any design token means updating the
  colophon too. It also deliberately omits AWS account/distribution IDs — keep it that way.
- **Headless Chrome clamps `--window-size` to ~500px wide.** Screenshots at
  mobile widths render the layout at 500px and crop it, which looks like horizontal
  overflow that isn't real. For mobile verification, drive system Chrome with
  puppeteer-core and `setViewport({ isMobile: true })`, and check
  `document.documentElement.scrollWidth`.


## Verifying changes

Build, serve the export, screenshot with system Chrome:
`npx next build`, `python3 -m http.server 8931` in `out/`, then
`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new
--screenshot=... --window-size=1440,900 http://localhost:8931/<page>/` — fine for
desktop widths; see the headless-Chrome gotcha before trusting mobile shots.

## Code style

- Prefer the simplest design that satisfies the current requirement. No premature
  abstraction, indirection, or generalization for hypothetical futures — a little
  duplication beats the wrong abstraction. Code should read top-to-bottom.
- Comments and docs are permanent artifacts written for a future maintainer with
  no knowledge of any conversation. Document the why, invariants, and edge cases;
  never reference the request, the change history, or restate the code.

## Auto-commit at the end of each work tranche (durable authorization)

At the **end of a tranche of work** (a prompt → response cycle that produced file
changes forming a coherent unit), **proactively commit and push without waiting to
be asked.** Specifically:

1. Briefly summarize what changed in the chat.
2. Stage the related files, write a clear commit message in the repo's style
   (short descriptive subject, body only when the why isn't obvious; end with the
   `Co-Authored-By` trailer), and **commit + `git push origin master`.**
3. Confirm the push in the response.

Rules:

- **Target branch = `master`.** Solo repo — no separate branch/PR unless Kyle asks.
- **Pushing does not deploy.** Production only changes via `npm run deploy`
  (S3 sync + CloudFront invalidation), so a push is always safe to make. Deploy
  when the tranche changed the site and is ready to be public — or when Kyle says
  `/ship` — and confirm the invalidation ran. Docs-only changes (README, CLAUDE.md,
  PROJECT_NOTES.md) never need a deploy.
- **Skip** trivial/no-op turns, pure Q&A/strategy chats with no file changes, and
  anything Kyle says to keep local. Never commit secrets.
- Kyle can always override per-change: "don't commit this" / "keep it local."

## Keeping this file current

When a session hits a real gotcha (something that broke and cost time to diagnose)
or locks a decision, record it **immediately** — don't wait for a wrap-up. Rule of
thumb: would a fresh session make a mistake without knowing this? Short operational
facts go here; long-form rationale and design decisions go in PROJECT_NOTES.md with
a one-line pointer here if needed. Keep this file lean — cut entries that stop
being true.
