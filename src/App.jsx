import { useState } from "react";
import { ManaFontLoader } from "./components/Mana.jsx";
import { T } from "./data/translations.js";
import { PAGES, PAGE_ICONS } from "./constants/navigation.js";
import MatchPage from "./pages/MatchPage.jsx";
import CardTypesPage from "./pages/CardTypesPage.jsx";
import CommanderPage from "./pages/CommanderPage.jsx";
import ColorsPage from "./pages/ColorsPage.jsx";
import PairsPage from "./pages/PairsPage.jsx";
import ArchetypesPage from "./pages/ArchetypesPage.jsx";

export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("match");
  const t = T[lang];

  const pageMap = {
    match: <MatchPage lang={lang} />,
    cards: <CardTypesPage lang={lang} />,
    formats: <CommanderPage lang={lang} />,
    colors: <ColorsPage lang={lang} />,
    pairs: <PairsPage lang={lang} />,
    archetypes: <ArchetypesPage lang={lang} />,
  };

  return (
    <div className="app">
      <ManaFontLoader />

      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo__mark">✦</div>
          <div>
            <div className="app-logo__title">MTG Reference</div>
            <div className="app-logo__subtitle">New Player Guide</div>
          </div>
        </div>
        <div className="lang-toggle">
          {["en", "it"].map((l) => (
            <button
              key={l}
              className={lang === l ? "active" : ""}
              onClick={() => setLang(l)}
            >
              {l === "en" ? "🇬🇧 EN" : "🇮🇹 IT"}
            </button>
          ))}
        </div>
      </header>

      <nav className="app-nav">
        <div className="app-nav__inner">
          {PAGES.map((p) => (
            <button
              key={p}
              className={`nav-tab ${page === p ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {PAGE_ICONS[p]} {t.nav[p]}
            </button>
          ))}
        </div>
      </nav>

      <main className="app-content">{pageMap[page]}</main>

      <footer className="app-footer">
        ✦ MTG Reference — Fan-made · Card images © Wizards of the Coast via Scryfall API
      </footer>
    </div>
  );
}
