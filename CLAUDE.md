# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal static website for itochan (itochan.jp), built with [Middleman](https://middlemanapp.com/). Pages are written in Slim templates, styles in Sass. Ruby 3.0.7 (see `.ruby-version`).

## Commands

```sh
bundle install              # install gems
bundle exec middleman serve # local dev server (http://localhost:4567), live reload
bundle exec middleman build # build static site into build/ (asset hashing enabled)
```

There is no test suite or linter configured.

## Architecture

- `config.rb` — Middleman configuration. Autoprefixer is active (last 2 browser versions); asset hashing runs only on `build`. XML/JSON/TXT pages render without a layout.
- `source/` — all site content. Built output goes to `build/` (gitignored).
  - `source/layouts/layout.slim` — the single shared layout (sets `<title>` from page frontmatter `title`, loads Google Analytics).
  - `source/*.html.slim` — one file per page (`index`, `domains`, `media`, `profile`, `more`). YAML frontmatter at the top sets `title` and optional `page_classes` (applied to `<body>`).
  - `source/stylesheets/style.css.sass` — main stylesheet (plus `normalize.css`).
- `data/media.yml` — structured data loaded in templates via `data.media.*` (see `source/media.html.slim` iterating `data.media.lists`).

When adding a page, create `source/<name>.html.slim` with frontmatter; link it from `source/index.html.slim`.

## Deployment

Deployed via Cloudflare Pages (`bundle exec middleman build` → `build/`), served at the custom domain in `CNAME` (itochan.jp). The deploy is configured in the Cloudflare dashboard, not in this repo. Dependabot updates Bundler dependencies daily (`.github/dependabot.yml`); the bulk of recent history is these dependency-bump PRs.
