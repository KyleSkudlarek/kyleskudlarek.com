# kyleskudlarek.com — Project Notes (source of truth)

**Read this first.** Vision, decisions, current state, architecture, and deploy target
are all here. Sections marked "Superseded" reflect earlier thinking — trust the later
sections when they conflict.

---

## ⭐ START HERE

**The site is BUILT and LIVE** at https://kyleskudlarek.com — do *not* scaffold from
scratch. Next.js 16 App Router + static export + Tailwind v4 + TypeScript, deployed to
S3 + CloudFront. See **Current state** for what exists and which design decisions are
already locked (hero treatment, palette, type, heading pattern).

**Design is settled, not open.** The palette, typography, and hero composition were chosen
deliberately (a side-by-side variant lab); match them rather than reinventing. Extend the
system in `app/globals.css`.

**Next milestone:** the **Garden** — the MDX content hub. See **Content architecture**.
Natural first slice: the `/garden` index + MDX pipeline with one placeholder post, then
the timelapse/progress component as its own focused build.

---

## Vision & Direction

This is Kyle's personal site and the front door to his software-engineering brand — a
place that should feel genuinely *cool* and personal, not a template. It anchors his
professional presence (and links out to his side business, **skudlabs.com**) while being a
playground for experiments.

**What it should feel like:** modern, cutting-edge, and a little unexpected — the kind of
site a designer-engineer would be proud of. Tasteful motion and interaction over clutter.
Fast and clean first; delightful in the details.

**Guiding principles (in priority order):**
1. **Dark mode.** A first-class dark aesthetic. (Light mode optional, later.)
2. **Fast & instant.** SSG + client-side navigation so moving between pages feels instant.
3. **Best practices, but not over-engineered.** Start simple and correct. Add complexity
   only when a feature actually needs it — no premature abstractions or infra.
4. **Cutting-edge design, room for wow.** Modern typography/layout; tasteful, high-craft
   motion. Open to something ambitious like a **Three.js / WebGL** hero or a signature
   animation "no one's seen before" — but only where it elevates, not as decoration.
5. **Personal & distinctive.** It should read as *Kyle's*, not a framework demo.

**Planned sections / features (build incrementally — not all at once):**
> ⚠️ Superseded in part — see **Content architecture** below. Blog, Playground/Labs, and
> Reviews are no longer separate destinations; they are all `type`s of post inside
> **Garden**. Links live in the "My Links" section, not a page.

- **Home** + **About** (copy below; keep the substance, redesign freely).
- **Projects** — highlights with live GitHub star counts (details below).
- **Garden** — the one content hub: essays, guides, reviews, travel, multimedia/progress
  posts. MDX so posts can embed interactive components. Core, not an afterthought.
- **My Links** — annotated link section on Home + About (not a page).

LinkedIn: https://www.linkedin.com/in/kyleskudlarek/
Github: https://github.com/KyleSkudlarek
Strava: https://www.strava.com/athletes/133126737
Instagram: https://www.instagram.com/ky_skud/
Skudlabs.com: https://skudlabs.com/

- **Playground / Labs** — interactive browser experiments (mini games, WebGL toys, demos),
  some authored with Fable as a *build tool*. NOTE: end users do NOT interact with Fable
  through the site. → Now published as Garden posts (`type: progress`/`essay`), not a
  separate section.
- **Reviews** — restaurant/product reviews, possibly with affiliate links.
  → Garden posts (`type: review`).

**Explicitly deferring to the designer (Fable 5):** color system, type scale, spacing,
component styling, animation choices, page composition, and how far to push the 3D/motion.
The notes set intent and constraints; the aesthetic execution is yours.

---

## Decisions we aligned on

- **Framework: Next.js (App Router), static export** (`output: 'export'`). Chosen over
  Astro so that adding a backend later is NOT a framework rewrite — same app, new deploy
  target. Three.js/WebGL and client interactivity all work fine in a static export.
- **Hosting: AWS-native, NOT Vercel** — keeps everything in Kyle's AWS account, fully
  inspectable via the AWS CLI/CloudWatch (transparency for debugging), and fits an
  IaC/IAM mindset.
- **Reuse the existing S3 + CloudFront + Route 53** already wired to `kyleskudlarek.com`.
- **"Instant nav" = SSG** — a build step, no backend required.
- **Build iteratively.** Don't architect for features that aren't in view yet.

## Roadmap (each rung only when a real need appears)

1. **Now:** Next.js static export → existing S3 + CloudFront. No backend.
2. **First backend/AI feature** (e.g. a Claude/Fable-powered feature — an API key CANNOT
   live in the browser, so it needs a server endpoint): add a small **separate** AWS
   backend (API Gateway + Lambda) the static site calls. Frontend stays static.
3. **Only if you want Next itself to do SSR / host API routes on AWS:** adopt **OpenNext**
   (runs Next's server on Lambda+CloudFront), optionally via **SST** (one IaC file for the
   site + queues/ECS/IAM). Vercel vs OpenNext are alternatives; SST *includes* OpenNext.
   Rungs 1–2 are 100% standard AWS; OpenNext is later & optional.

---

## AWS deploy target

Live at https://kyleskudlarek.com. Request path:
```
Route53 zone kyleskudlarek.com (Z05530269DSQMEZFF4JP)
  -> CloudFront E6UT2CXQQ2HKW (alias kyleskudlarek.com, HTTPS)
    -> Origin: S3 website endpoint kyleskudlarek.com.s3-website-us-east-1.amazonaws.com
      -> S3 bucket "kyleskudlarek.com" (us-east-1, static website hosting on, public-read)
```
- AWS account 641383114949, IAM user `kyle`. Website config: index=`index.html`, error=`404.html`.

**Deploy (static export):** build to `out/`, then:
```
aws s3 sync out/ s3://kyleskudlarek.com --delete
aws cloudfront create-invalidation --distribution-id E6UT2CXQQ2HKW --paths '/*'
```
Wire this as an `npm run deploy` script. Needs AWS creds (`aws sts get-caller-identity`).
**Always include the CloudFront invalidation** or stale assets get served.

**Next config for static export:** `output: 'export'`, `trailingSlash: true` (so `/about/`
→ `/about/index.html` on S3), `images: { unoptimized: true }` (image optimization needs a
server) — use plain `<img>` or unoptimized `next/image`.

---

## Content to preserve (keep the substance; redesign freely)


**Home:** "Welcome to my digital zen garden. 🌱" / "I'm a full-stack software developer who
works on generative AI, enterprise systems and web design. I like physics, philosophy,
cooking, lifting weights, and stand-up comedy." Avatar: `assets/bitmoji.svg`.

**About:** "Hey I'm Kyle! I'm a software developer working remotely in Austin, TX. Welcome
to my spot on the web for my projects, writing, and anything else I want to show the
world." Photo: `assets/kyle.jpg`.

**Projects:** cards fetching live GitHub star counts from
`api.github.com/users/kyleskudlarek/repos` (client-side, works on static export). Seed
projects: `kyleskudlarek.com` (2023) and `mountvernonpc.com` (2014, demo
http://mountvernonpc.com/). Cards link to `github.com/kyleskudlarek/<slug>`.

**Links** (live; single source of truth is `lib/site.ts`, ordered as shown):
- Skudlabs (consulting): https://skudlabs.com
- LinkedIn: https://www.linkedin.com/in/kyleskudlarek/
- GitHub: https://github.com/kyleskudlarek
- Instagram: https://www.instagram.com/ky_skud/
- Strava: https://www.strava.com/athletes/133126737

**Assets on hand (`assets/`):** `bitmoji.svg` (now the favicon, `app/icon.svg`),
`about_me_selfie.jpeg` (current About photo; supersedes `kyle.jpg`),
`kyleskudlarek_hero_image.png` (hero art).

---

## Current state (built & live at kyleskudlarek.com)

Next.js 16 App Router, static export, Tailwind v4, TypeScript.

**Pages:** `/` (hero + My Links) · `/about` · `/projects` · 404.
**Nav:** About · Projects — intentionally tiny. Garden joins as the 3rd.

**Design decisions already locked:**
- **Hero — "cinematic band."** Full-bleed art, contained height, masked on *both*
  edges (`mask-image`) so it emerges from behind the nav and dissolves into the page.
  A **directional scrim** darkens only the left (text side), leaving the swirls/mountains
  untouched; narrow viewports swap to a vertical scrim since copy spans full width.
  Motion: slow drift, CSS star twinkle, scroll parallax — all `prefers-reduced-motion` aware.
- **Type:** Satoshi (self-hosted, `app/fonts/`) for everything, JetBrains Mono for labels
  and metadata. Chosen over an editorial serif after building a side-by-side lab.
- **Palette** (sampled from the hero art, tokens in `app/globals.css`):
  `--ink #080D12` · `--ground #0B1A24` · `--slate #4A7A9B` · `--mist #9BAEBB` ·
  `--glow #C8F0DC` (mint accent) · `--khaki #8A8A4E` (rare warm).
- **Heading pattern:** white text with the key phrase in `--glow` green
  (`<em>` inside `.display`) — used by every page title. Keep it consistent.
- **My Links:** annotated (one line of context per link) — that annotation is what keeps
  it from reading as a linktree. `prominent` variant on home (display heading, big rows),
  quiet mono label on About.
- **Projects cards:** title → live hosted site, "Source" → GitHub, live star counts
  fetched client-side.
- Footer is copyright only, by choice.

**Gotchas:**
- TypeScript must stay on **5.x**. `typescript@latest` pulls the TS 7 native preview and
  Next's type checker dies with `The "id" argument must be of type string`.
- Metadata routes (`app/robots.ts`, `app/sitemap.ts`) need `export const dynamic = 'force-static'`
  under `output: 'export'`, or the build fails.
- Source hero art is only 1456px wide — there is no useful 2x variant.
- `npm run images` regenerates WebP from `assets/` (hero 2.0MB → 243KB).
- Git remote is **SSH**; HTTPS password auth is dead on GitHub.

---

## Content architecture (decided — build toward this)

**Two hubs, three nav items, forever:**

```
About  ·  Projects  ·  Garden

/projects    code as the artifact — GitHub repos, stars (recruiter-facing)
/garden      everything published to be read/experienced
```

The split is **not** "built with software vs. not" — the weight-loss tracker *is* content;
software is just its medium. The line is: is the artifact **the code**, or is it **the thing
you published for people to consume**?

**Rule that keeps nav minimal: a new content type is a new filter chip, never a new nav item.**

**Garden holds everything:** essays, how-to guides, reviews (incl. affiliate),
travel/vacation posts, and multimedia/progress pieces.

**MDX is the enabler.** A post is markdown that can embed React components, so richness
varies without splitting the system:
- guide → prose + code blocks
- review → prose + `<Verdict/>` + affiliate disclosure
- travel → prose + `<MapTimeline/>` + `<Gallery/>`
- progress → `<Timelapse/>` + `<ProgressChart/>`

**Post frontmatter:**
`title · slug · type · summary · cover · published · updated · tags · featured`
`type: essay | guide | review | travel | progress`

**URLs stay flat — `/garden/[slug]`, type is metadata only.** If a post gets
re-categorized later, the permalink never breaks. Worth more than category-path SEO here.

**Index page:** filter chips (All · Guides · Reviews · Travel · Progress) and **visual
cards with cover images** — the content is mixed-media, the feed should look like it.

**Living posts:** evergreen pieces that keep updating (the tracker) sink in a chronological
feed. Solved by a **`featured` flag** that pins them, and showing **"Updated"** rather than
"Published." Bake both into the data model from the start.

**Affiliate content:** visible FTC disclosure + `rel="sponsored nofollow"`. No separate
site needed.

**Only split to a separate site if:** (1) a distinct brand with its own audience (like
Skudlabs, or a named photography *business*), (2) a different platform need (real
e-commerce, booking, a web app), or (3) legal/entity separation. Content alone is never
a reason.

### The progress/timelapse piece (first big Garden build)

- **Lead with the scrubber**, not a chart — dragging through time morphs the photos.
  Consistent framing (same spot, pose, lighting) is the single biggest quality factor.
- **Sync one timeline to both** the photo and the chart position. That synchronization is
  what makes it feel like software instead of a slideshow.
- Milestone annotations on the timeline; summary stats (total change, duration) up top.
- Data model: a simple JSON array of `{date, weight, photo}`, rendered client-side.
  Fully static-export compatible — no backend.
- **Build it as a reusable template**, not a one-off: dataset + timeline + synced visual
  also gives you a running log, books-read year, or a places-visited map.
- Decide deliberately whether personal body content is public on a recruiter-facing site;
  if yes-but-quiet, keep it behind the Experiments/Progress chip and off the home page.

---

## Prior art worth studying (ranked)

Ranked by how well-known they are *and* how close they sit to what Kyle wants to build.

**1. Bartosz Ciechanowski** — https://ciechanow.ski
The gold standard for interactive explainers (gears, bicycles, GPS, engines). Every diagram
is draggable; you learn by fiddling. *Tech:* hand-written vanilla JS with Canvas/WebGL,
minimal dependencies, static site. Studies best for **interaction design**, not stack.

**2. Josh Comeau** — https://www.joshwcomeau.com
Closest match to *this* site's architecture: a personal blog where posts are MDX with bespoke
interactive React components inline. Playful, high-craft. *Tech:* Next.js + MDX + React +
Framer Motion. **Start here for how to structure the Garden.**

**3. Red Blob Games (Amit Patel)** — https://www.redblobgames.com
Interactive tutorials on pathfinding and hex grids; beloved reference work. *Tech:* SVG +
D3-style custom diagrams, some Vue. Great model for **explain-by-fiddling** teaching.

**4. The Pudding** — https://pudding.cool
Editorial visual essays / data journalism at a professional bar. *Tech:* Svelte + D3.
Study for **scrollytelling** and how visual essays are paced.

**5. Amelia Wattenberger** — https://wattenberger.com
Interactive data-viz essays with a strong personal visual voice. *Tech:* React + D3.
Closest to "cool visual informational things" as a personal brand.

**6. Maggie Appleton** — https://maggieappleton.com
The digital-garden concept, beautifully illustrated. *Tech:* Next.js/MDX-class static stack.
Study for **garden IA** and illustration-as-thinking.

**7. Nicky Case** — https://ncase.me · collection: https://explorabl.es
Explorable explanations as tiny playable games. *Tech:* plain JS + canvas. Study for
**playfulness** and making ideas tactile.

**8. Andy Matuschak** — https://notes.andymatuschak.org
Evergreen notes with the famous stacked-panes UI. Study for **non-chronological** content
structure — directly relevant to the "living post" problem.

**9. Distill.pub** — https://distill.pub (archived)
Interactive ML research; the high-water mark for explanatory rigor. *Tech:* custom web
components + D3.

**10. Bret Victor** — https://worrydream.com
The philosophical origin ("Explorable Explanations", "Ladder of Abstraction"). Read for
**why**, not how.

**Also relevant:** **Gwern** (https://gwern.net) for dense annotated long-form;
**Nicholas Felton** (http://feltron.com) — the Feltron Annual Reports, the ancestor of
personal-data-as-design and the closest prior art to the timelapse tracker;
**Derek Sivers** (https://sive.rs) for the `/now` page convention.

### Core tech to reach for

Already in the stack: **Next.js (App Router, static export) · React · Tailwind v4 · TypeScript**.

| Need | Reach for |
|---|---|
| Posts with embedded interactivity | **MDX** (the single most important addition) |
| UI animation / transitions | **Motion** (formerly Framer Motion) |
| Charts, custom data viz | **D3** for bespoke; Visx or Observable Plot for faster wins |
| Simulation / 3D | **Three.js** via React Three Fiber, or raw Canvas 2D |
| Scroll-driven storytelling | Intersection Observer, Scrollama, or CSS scroll-driven animations |
| Maps (travel posts) | **MapLibre GL** or Leaflet |
| Image pipeline | **sharp** — already wired via `npm run images` |

All of the above run client-side and stay compatible with `output: 'export'` — no backend
required. First backend need is still what the roadmap says: an AI feature, search at scale,
or comments.

**Strategic note:** AI lowers the cost of *building* interactive pieces, so the scarce
things become taste, substance, and finishing. Three polished pieces beat eight abandoned
experiments — which is exactly why `featured` and a visual index matter.
