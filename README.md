# Personal Site

Personal academic site of Yuriel Ryan. Jekyll 3.10 on GitHub Pages (the `github-pages` gem), with a custom theme that replaces academicpages. The design is recorded in [DESIGN.md](DESIGN.md); read it before changing anything under `_layouts/`, `_includes/`, `_sass/site/` or `assets/`.

`master` is what GitHub Pages publishes. Preview locally before pushing.

## Running locally

Ruby 3.4 and Bundler.

    bundle install
    bundle exec jekyll serve --livereload

The site is at <http://localhost:4000/>. Changes to `_config.yml` are not picked up by the watcher; stop and restart the server. `jekyll serve` rewrites `url` to localhost, but a plain `bundle exec jekyll build` bakes in the production `url` (assets resolve to yurielryan.com), so serve `_site` from another server only with a config override.

## Where things live

Content, all Markdown with front matter:

- `_pages/about.md` is the home page (`permalink: /`); the Updates table lives in it
- `_pages/publications.md` (`/research/`), `_pages/cv.md` (`/cv/`) and the other pages in `_pages/`
- `_publications/`, `_portfolio/`, `_posts/`, `_service/`, `_teaching/`: one file per entry
- `_data/navigation.yml`: the masthead links
- `files/` (the resume PDF) and `images/`

Presentation:

- `_layouts/`: `default.html` (the shell), `single.html`, `archive.html`
- `_includes/`: masthead, byline, contact line, footer, publication and list entries, citation block, Contents (`toc_auto.html`), the channel figure
- `_sass/site/`: the whole stylesheet as partials, imported in order by `assets/css/site.scss`
- `assets/js/site.js`: one deferred script (theme toggle, clipboard, Contents scroll-spy, the channel)
- `assets/fonts/`: three self-hosted woff2 subsets and `OFL.txt`

There is no `_sass/` outside `_sass/site/`, no `_talks/`, no `markdown_generator/`, no icon font, no jQuery, no `manifest.json`.

`_includes/channel.html` is generated. Do not edit it by hand; regenerate it from the repository root:

    python3 _tools/channel_svg.py --include

## Licence

Site content (text, publications, images, the resume) is © Yuriel Ryan. The theme code is MIT (`LICENSE`, inherited from the Minimal Mistakes / academicpages lineage). The fonts are under the SIL Open Font License; see `assets/fonts/OFL.txt`.
