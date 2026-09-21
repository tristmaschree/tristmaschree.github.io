# tristmaschree.github.io

Personal site. Plain HTML and CSS — there is no build step, no dependencies,
and nothing to install. Editing a file and pushing it is the entire workflow.

Live at <https://tristmaschree.github.io>.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Home page — the one people land on |
| `projects.html` | List of things you've built |
| `resume.html` | CV; prints to a clean PDF |
| `contact.html` | Ways to reach you |
| `404.html` | Shown for URLs that don't exist |
| `css/style.css` | All the styling for every page |
| `js/theme.js` | The System / Light / Dark switch in the top right |
| `favicon.ico`, `assets/` | Site icon, in the sizes browsers ask for |
| `.nojekyll` | Tells GitHub not to run Jekyll on these files |

## Editing

Open any `.html` file in a text editor and change the text between the tags.
To preview your changes, double-click the file to open it in your browser, and
hit reload after each save. That's it — no server needed.

To change how things *look* (colours, fonts, spacing), edit `css/style.css`.
The colours are all defined at the very top under `:root`, so changing one
value there restyles the whole site.

## Publishing

```sh
git add -A
git commit -m "Update the about section"
git push
```

Changes go live in roughly 30 seconds. If they don't appear, check the
**Actions** tab on GitHub for a red X.

## One-time setup on GitHub

Go to **Settings → Pages** and confirm the source is set to
**Deploy from a branch → `main` → `/ (root)`**. For a `username.github.io`
repo this is usually the default already.

## Things to know

- **Panels, not cards.** A `<div class="panel">` is a stack of
  `<div class="row">` items separated by hairlines — square corners, flat on
  the page, and the hover fill runs past the text on the left and right while
  the top and bottom edges stay crisp. To add an item, copy a whole `row`.
- **The header and footer are copy-pasted into each page.** If you change a
  nav link, change it in all five HTML files. This is the one real cost of
  skipping a site generator, and it's fine at this size.
- **The `class="here"` in the nav** marks the current page so it shows as
  bold. When you add a page, put it on that page's own nav link only.
- **Dark mode** follows the visitor's system setting by default. The
  System / Light / Dark buttons in the header override that and remember the
  choice in the browser. `js/theme.js` loads in `<head>` without `defer` on
  purpose — it has to run before the page paints, or you get a flash of the
  wrong theme.
- **Square edges everywhere except the tag pills**, which are rounded.
- **Adding a page:** copy an existing `.html` file, rename it, change the
  `<title>`, swap the `class="here"`, and add a link to it in the nav of
  every other page. Copy the whole `<head>` too, so the new page gets the
  favicon links and the theme script.

## If you later want a blog

Hand-writing dated posts in HTML gets tedious quickly. At that point, switch
to [Jekyll](https://jekyllrb.com/), which GitHub Pages builds natively:

1. Delete `.nojekyll`.
2. Add a `_config.yml` and a `_layouts/default.html` holding the shared
   header and footer.
3. Move the page bodies into Markdown files with a bit of front matter.
4. Write posts as `_posts/YYYY-MM-DD-title.md`.

The CSS carries over unchanged, and the existing pages mostly drop straight in.
