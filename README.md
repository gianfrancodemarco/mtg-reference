# MTG Reference

A bilingual (English / Italian) new-player guide for Magic: The Gathering. Covers turn structure, keywords, card types, the color pie, guild pairs, deck archetypes, and Commander rules — with live card images from the [Scryfall API](https://scryfall.com/).

## Project structure

```
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx                 # Shell, nav, language toggle
    ├── main.jsx
    ├── index.css
    ├── components/             # Reusable UI
    │   ├── Accordion.jsx
    │   ├── Badge.jsx
    │   ├── CardGallery.jsx
    │   ├── Mana.jsx
    │   ├── ScryfallCard.jsx
    │   └── SectionHeader.jsx
    ├── constants/
    │   └── navigation.js
    ├── data/                   # Static content (EN + IT)
    │   ├── archetypes.js
    │   ├── cardTypes.js
    │   ├── colorPairs.js
    │   ├── colors.js
    │   ├── commanderRules.js
    │   ├── keywords.js
    │   ├── mulligan.js
    │   ├── phases.js
    │   ├── stackExamples.js
    │   ├── translations.js
    │   └── index.js
    └── pages/                  # One page per nav tab
        ├── ArchetypesPage.jsx
        ├── CardTypesPage.jsx
        ├── ColorsPage.jsx
        ├── FormatsPage.jsx
        ├── MatchPage.jsx
        └── TribesPage.jsx
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |

## External assets

- **Mana symbols** — [mana-font](https://github.com/andrewgioia/mana) via jsDelivr CDN
- **Card images** — [Scryfall](https://scryfall.com/) named-card image endpoint
- **Fonts** — Google Fonts (Cinzel Decorative, Cinzel)

## License

Fan-made reference tool. Magic: The Gathering and card art are © Wizards of the Coast.
