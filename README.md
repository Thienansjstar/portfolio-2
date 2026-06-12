# Thien-An Tran — Portfolio

A personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Editing content

**Everything lives in one file:** `src/data/content.js`.
Update your bio, experience, projects, skills, and links there — no component changes needed.

The resume PDF is at `public/Thien-An_Tran_Resume.pdf`. Replace that file (keeping the same name) to update the download.

## Theming

Design tokens are CSS variables in `src/index.css` (`:root` for dark, `html.light` for light mode). Change the `--accent` values to re-color the entire site.

## Features

- Dark/light theme (follows system preference, manual toggle)
- Scroll-spy navigation with animated pill indicator
- Letter-by-letter hero reveal + italic-flip hover
- Magnetic CTA buttons, cursor spotlight + 3D tilt on project cards
- Copy-to-clipboard email with morphing feedback
- Easter egg: click the hero name 5 times 🕹
- Fully responsive (mobile-first), keyboard navigable, WCAG AA contrast
- `prefers-reduced-motion` respected throughout

## Deploying

Works anywhere static sites do:

- **Vercel / Netlify:** import the repo, framework preset "Vite", done.
- **GitHub Pages:** `npm run build`, publish the `dist/` folder. (`base: './'` is already set in `vite.config.js`, so it works from a subpath.)
