# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal static website for itochan (itochan.jp), built with [Astro](https://astro.build/) v6. Pages are `.astro` components, styles in Sass. The package manager is [aube](https://aube.en.dev) (`aubr` = `aube run`, `aubx` = `aube dlx`); the lockfile is `aube-lock.yaml`.

## Commands

```sh
aube install     # install dependencies (lockfile: aube-lock.yaml)
aubr dev         # local dev server (http://localhost:4321), HMR
aubr build       # build static site into dist/ (asset hashing built in)
aubr preview     # serve the built dist/ locally
```

There is no test suite or linter configured. `aubr astro sync` regenerates content/types after editing collections.

Note: aube blocks dependency build scripts by default. Approved builds are recorded under `aube.allowBuilds` in `package.json` (currently `esbuild`, `sharp`, `@parcel/watcher`); run `aube approve-builds` if a new dependency needs one.

## Architecture

- `astro.config.mjs` — Astro config. Configures the **Fonts API** (`fontProviders.google()` for "Merriweather Sans", exposed as `--font-merriweather-sans`). Build output is the default `dist/` with directory-format clean URLs (`/domains`, not `/domains.html`); assets are hashed automatically.
- `src/`
  - `src/layouts/Layout.astro` — the single shared layout. Takes a `title` prop (sets `<title>` to `"{title} - itochan"`, or just `itochan` when absent) and optional `bodyClass`. Renders the font via `<Font cssVariable="--font-merriweather-sans" />` and imports the global styles.
  - `src/pages/*.astro` — one file per page (`index`, `domains`, `media`, `more`, `profile`). Each imports `Layout` and passes `title`.
  - `src/styles/style.scss` — main stylesheet (plus `normalize.css`). Heading font references `var(--font-merriweather-sans)`.
  - `src/content.config.ts` + `src/data/media.json` — the `media` Content Collection (`file()` loader + Zod schema). `media.astro` reads it via `getCollection('media')`.
- `public/` — served verbatim: `favicon.ico`, `robots.txt`, `keybase.txt`, `images/`, and `_redirects` (301s from the old Middleman `*.html` URLs to the clean URLs).

When adding a page, create `src/pages/<name>.astro` importing `Layout`; link it from `src/pages/index.astro` with a clean URL.

## Deployment

Deployed via Cloudflare Pages (Git integration: push to `master` → auto build), served at the custom domain in `CNAME` (itochan.jp). The deploy is configured in the Cloudflare dashboard, not in this repo:

- **Build command**: `npm install -g --ignore-scripts=false @endevco/aube && aube ci && aube run build` (installs aube in CI, then clean-installs from `aube-lock.yaml` and builds)
- **Build output directory**: `dist`

`public/_redirects` is emitted into `dist/` and applied automatically by Pages. Dependabot config lives in `.github/dependabot.yml`.
