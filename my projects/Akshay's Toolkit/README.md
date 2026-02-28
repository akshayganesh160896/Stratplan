# Akshay's Toolkit

A polished project hub to showcase your apps and websites with summaries, custom thumbnails, and one-click launch buttons.

## Customize projects

Edit `script.js` and update each item in the `projects` array:

- `name`: project title
- `category`: Web App, Website, Tool, etc.
- `description`: short summary
- `tech`: technologies used
- `url`: live project URL
- `thumbnail`: local image path (current thumbnails are in `assets/thumbnails/`)

## Visual assets

- Favicon: `assets/favicon/favicon.svg`
- Thumbnails:
  - `assets/thumbnails/gift-chart.svg`
  - `assets/thumbnails/memo-builder.svg`
  - `assets/thumbnails/stratplan.svg`

## Run locally

Open `index.html` directly in your browser.

## Deploy to GitHub Pages (this repo)

A workflow is already added at:

- `.github/workflows/deploy-akshay-toolkit.yml`

It deploys only this folder: `my projects/Akshay's Toolkit`.

Steps:

1. Commit and push your changes to the `main` branch.
2. In GitHub repo settings, open **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Wait for the workflow run to finish.

Your site will be published on your GitHub Pages URL.

## Deploy as a separate repo (optional)

If you want `Akshay's Toolkit` as its own repository, copy the contents of this folder to a new repo root and use the same GitHub Actions Pages flow.
