# kyleskudlarek.com — Project Notes (source of truth)

**Read this first.** This is a clean slate: a personal website being built fresh.
The repo intentionally contains only this file and an `assets/` folder of images.
Everything you need to start — vision, decisions, content, and deploy target — is here.

---

## ⭐ START HERE

**Build from scratch.** There is no existing code to preserve or extend — scaffold a new
Next.js (App Router) project cleanly. All the content lives in this file; the images live
in `assets/`.

**You own the design.** The direction below is deliberately about *goals and principles*,
not prescribed layouts, components, or color values. Make strong, modern design decisions.

**First milestone:** a fast, beautiful, dark-mode blog/portfolio with instant navigation
(SSG). Ship that simple and excellent before adding anything fancy.

---

## Vision & Direction

This is Kyle's personal site and the front door to his software-engineering brand — a
place that should feel genuinely *cool* and personal, not a template. It anchors his
professional presence (and links out to his side business, **scudlabs.com**) while being a
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
- **Home** + **About** (copy below; keep the substance, redesign freely).
- **Projects** — highlights with live GitHub star counts (details below).
- **Blog** — a genuinely nice reading experience (MDX-style posts). Core, not an afterthought.
- **Links / connect** — scudlabs.com, GitHub, LinkedIn, Instagram (URLs in Content section).
- **Playground / Labs** — interactive browser experiments Kyle builds (some authored with
  the help of Fable as a *build tool*). NOTE: end users do NOT interact with Fable through
  the site — these are just cool self-contained things (mini games, WebGL toys, demos).
- **Reviews** — a small "reviews" idea (scope TBD — e.g. books/film/products or
  testimonials). Loosely held; clarify with Kyle before building.

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

**Brand:** "Kyle Skudlarek" + floppy-disk logo (`assets/floppylogo.png`). Favicon: `assets/icon.png`.

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

**Links:**
- GitHub: https://github.com/kyleskudlarek
- Side business: https://scudlabs.com
- LinkedIn: _[Kyle to add URL]_
- Instagram: _[Kyle to add URL]_

**Assets on hand (`assets/`):** `bitmoji.svg` (home avatar), `kyle.jpg` (about photo),
`floppylogo.png` (brand mark), `icon.png` (favicon), plus `github.png`, `reactIcon.svg`,
`aws.svg` (tech/footer icons — use if useful). Design may replace any of these.

**Dropped:** the old Gatsby blog and its placeholder posts.
