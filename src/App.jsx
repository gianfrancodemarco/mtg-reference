import { useState, useEffect } from "react";
import { ManaFontLoader } from "./components/Mana.jsx";
import Navbar from "./components/Navbar.jsx";
import { T } from "./data/translations.js";
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

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
      <Navbar page={page} setPage={setPage} lang={lang} setLang={setLang} labels={t.nav} />

      <main className="app-content">{pageMap[page]}</main>

      <footer className="app-footer">
        ✦ MTG Reference — Fan-made · Card images © Wizards of the Coast via Scryfall API
      </footer>
    </div>
  );
}
