# Jewish Journey

**Live:** [jewishjourney.kerryclements.com](https://jewishjourney.kerryclements.com)

A small, growing collection of tools built while studying for conversion to Judaism through Liberal Judaism (BWPJC). What started as a single blessing lookup tool has grown into four sections:

- **Berakhot** — a blessing lookup tool: pick a blessing and reveal as much or as little as you need (Hebrew with or without nikkud, transliteration, translation, a recorded pronunciation video)
- **Tefillot** — longer prayer texts, with an optional transliteration view alongside the Hebrew
- **Shorashim** — an exploration of common Hebrew roots. On mobile, a bubble grid links out to each root's own page; on desktop, it switches to a "Talmud mode" layout, echoing the way commentary surrounds a page of Gemara — clicking a root opens its detail in a position pinwheeling clockwise around the centre instead of navigating away
- **Mekorot** — resources and further reading (niqqud guides, reference tables, articles)

More is planned as the project grows (a quiz, downloadable PDFs, and eventually real per-root cross-referencing on the Shorashim pages, tying each root back to every place it appears across the Tefillot).

## Tech stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for navigation
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for testing

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints in the terminal.

To build for production:

```bash
npm run build
```

## Testing

```bash
npm run test      # watch mode
npm run test:ui   # Vitest's browser-based dashboard
```

Tests run automatically on pull requests via GitHub Actions (`.github/workflows/test.yml`). Pure logic — like the Shorashim ring's clockwise fill/evict rotation in `src/utils/ring.js` — is unit tested directly, without rendering anything; see `ring.test.js` alongside it for an example of the pattern.

## Project structure

- `src/App.jsx` — routing, layout, and per-route width wrappers
- `src/components/Nav.jsx` — top navigation; shows the current page's Hebrew name, larger, on desktop
- `src/components/BlessingLookup.jsx` — the Berakhot feature: dropdown, show/hide toggles, and the YouTube embed
- `src/pages/Tefillot.jsx` — prayer texts with the transliteration toggle
- `src/pages/Shorashim.jsx` — the roots overview page, including desktop "Talmud mode"
- `src/pages/RootDetail.jsx` — an individual root's own page at `/shorashim/:slug`
- `src/pages/Mekorot.jsx` — resources and further reading
- `src/data/blessings.json` — Berakhot content (Hebrew, transliteration, translation, optional video ID)
- `src/data/shorashim.js` — root content (Hebrew, transliteration, meaning, example, detail), shared by `Shorashim.jsx` and `RootDetail.jsx`
- `src/utils/ring.js` — the pure ring-rotation logic behind Shorashim's Talmud mode, kept framework-free and unit tested

## Adding a blessing

Add a new entry to `src/data/blessings.json` following the existing shape:

```json
{
  "name": "Display name",
  "hebrewPlain": "Hebrew without nikkud",
  "hebrewNikkud": "Hebrew with nikkud",
  "transliteration": "Transliteration",
  "translation": "English translation",
  "youtubeId": "optional YouTube video ID"
}
```

## Adding a root

Add a new entry to the relevant category in `src/data/shorashim.js`:

```js
{
  slug: "url-friendly-id",
  hebrew: "ה.ל.ך",
  translit: "transliteration",
  meaning: "brief meaning",
  example: { hebrew: "...", translit: "...", gloss: "..." }, // optional
  detail: "longer notes for the root's own page", // optional
  talmudDetail: "short preview text for the ring's margin card", // optional
}
```

## Custom theme tokens

`src/index.css` defines a small custom palette via Tailwind v4's `@theme` directive, rather than using Tailwind's default colors, so the look stays consistent and intentional:

| Token                | Value                                                        | Used for                           |
| -------------------- | ------------------------------------------------------------ | ---------------------------------- |
| `bg-base`            | `#8fbdec`                                                    | Page background                    |
| `text-ink`           | `#000250`                                                    | Primary text                       |
| `bg-surface`         | `#f5ffff`                                                    | Card / surface background          |
| `border-line`        | `#5c8bb8`                                                    | Default border                     |
| `text-ink-soft`      | `#001e68`                                                    | Secondary text (tagline)           |
| `text-accent`        | `#005eb8`                                                    | Tertiary text (placeholder)        |
| `bg-nav`             | `#e3edf7`                                                    | Nav background                     |
| `text-parchment-ink` | `#3b2f1f`                                                    | Text on the parchment-styled boxes |
| `bg-parchment`       | gradient (plain CSS, not a `@theme` token — see `index.css`) | Shorashim ring / root page boxes   |
| `font-hebrew`        | Frank Ruhl Libre                                             | Hebrew text                        |

## License

See [LICENSE](./LICENSE).
