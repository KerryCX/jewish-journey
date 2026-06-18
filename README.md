# Jewish Journey

**Live:** [jewishjourney.kerryclements.com](https://jewishjourney.kerryclements.com)

A small, growing collection of tools built while studying for conversion to Judaism through Liberal Judaism (BWPJC). The first piece, **Berakhot**, is a blessing lookup tool — pick a blessing and reveal as much or as little as you need: Hebrew with or without nikkud, transliteration, translation, and a recorded pronunciation video.

More sections (a quiz, study guides, downloadable PDFs) are planned as the project grows beyond just blessings.

## Tech stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) for styling

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

## Project structure

- `src/components/BlessingLookup.jsx` — the blessing lookup feature: dropdown, show/hide toggles, and the YouTube embed
- `src/data/blessings.json` — the blessing content itself (Hebrew, transliteration, translation, optional video ID)
- `src/App.jsx` — page layout and header

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

## License

See [LICENSE](./LICENSE).
