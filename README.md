Terraflux Global — Static Site

This repository is a simple static website (HTML/CSS/JS). Quick notes to preview and deploy.

Preview locally

- Start a simple static server from the repository root:

```bash
python3 -m http.server 8000
# or, using Node.js
npx http-server -p 8000
```

Open: http://localhost:8000

Deploy options

1) GitHub Pages (recommended for simple static hosting)
- Push this repo to GitHub.
- In repository Settings → Pages, choose branch `main` and directory `/ (root)`.
- Save. The site will be published at `https://<your-username>.github.io/<repo>`.
- If using a custom domain, add a `CNAME` file with the domain and configure DNS.

2) Netlify
- Drag & drop the site folder on https://app.netlify.com/drop, or connect the GitHub repo.
- Build settings: no build required for static HTML (leave blank).

3) Vercel
- Import the repository in Vercel and deploy as a static site.

Files added to help deploy

- `robots.txt` — allows crawling
- `.nojekyll` — prevents GitHub Pages from ignoring files starting with an underscore

Notes & recommendations

- The site uses inline styles and scripts on the HTML pages. External `css/styles.css` and `js/main.js` may still exist but are optional.
- Theme and accent preferences are persisted in `localStorage` across pages.
- For production, consider minifying assets and using a CDN for images.

If you want, I can:
- Add a `CNAME` file for a custom domain.
- Create a simple GitHub Actions workflow to build/publish to `gh-pages` branch.
- Convert the site to a templated workflow (Jekyll/Eleventy) to share header/footer.
