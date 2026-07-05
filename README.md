# The Dessert Lab — View-Only Prototype

Premium single-page prototype site for The Dessert Lab, Liverpool.
No backend, no CMS, no cart/checkout — pure static HTML/CSS/JS.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```
npx serve .
```

## Files

| File | Purpose |
|------|---------|
| `index.html` | All content and structure |
| `styles.css` | Design tokens + full styling |
| `main.js` | Nav state, mobile menu, reveals, hero 3D parallax, card tilt |

3D effects (card tilt + glare, hero depth rotation) run only on
mouse/trackpad devices and are disabled for `prefers-reduced-motion`.

## Editing real business details

Search `index.html` for `EDIT:` comments — every placeholder business
detail is marked:

- **Address** — Visit section + footer (currently 36–38 Allerton Road, L25 7RG placeholder)
- **Phone** — `tel:` links in Visit + footer (placeholder `0151 000 0000`)
- **Email** — `mailto:` links (placeholder `hello@thedessertlab.co.uk`)
- **Opening hours** — Visit section table + footer summary
- **Transport note** — Visit section "Getting here"
- **Delivery partners** — pill labels in Visit section (visual only)
- **Social links** — footer `href="#"` placeholders
- **Map link** — the map card links to the real Google Maps listing

## Design tokens

All colors, fonts, spacing live at the top of `styles.css` under `:root`.
Change the palette in one place.

Fonts (Google Fonts): Fraunces (display), Manrope (body), Ephesis (script accents).

## Imagery

Photos are hotlinked from Unsplash as placeholders. Replace with real
shop photography before client delivery — swap the `src` URLs in
`index.html`. All images are lazy-loaded except the hero.
