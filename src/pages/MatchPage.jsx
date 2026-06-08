import { useState, useMemo } from "react";
import Accordion from "../components/Accordion.jsx";
import CardGallery from "../components/CardGallery.jsx";
import ScryfallCard from "../components/ScryfallCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import TurnStructureDiagram from "../components/TurnStructureDiagram.jsx";
import { T } from "../data/translations.js";
import { PHASES, KEYWORDS, STACK_EXAMPLES, MULLIGAN } from "../data/index.js";
import "./MatchPage.css";

export default function MatchPage({ lang }) {
  const t = T[lang];
  const phases = PHASES[lang];
  const keywords = KEYWORDS[lang];
  const stacks = STACK_EXAMPLES[lang];
  const mulligan = MULLIGAN[lang];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [expandedKw, setExpandedKw] = useState(null);

  const categoryLabels = lang === "en"
    ? { all: "All", combat: "Combat", evasion: "Evasion", protection: "Protection", casting: "Casting", cost: "Cost", alternate: "Alternate cast", trigger: "Triggers", landwalk: "Landwalk", cycling: "Cycling", mechanic: "Mechanics" }
    : { all: "Tutte", combat: "Combattimento", evasion: "Evasione", protection: "Protezione", casting: "Lancio", cost: "Costo", alternate: "Lancio alternativo", trigger: "Innesco", landwalk: "Passa-terra", cycling: "Ciclo", mechanic: "Meccaniche" };

  const categories = useMemo(() => {
    const set = new Set(keywords.map((k) => k.category).filter(Boolean));
    return ["all", ...[...set].sort()];
  }, [keywords]);

  const filtered = useMemo(
    () =>
      [...keywords]
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((k) => category === "all" || k.category === category)
        .filter(
          (k) =>
            k.name.toLowerCase().includes(search.toLowerCase()) ||
            k.def.toLowerCase().includes(search.toLowerCase())
        ),
    [keywords, search, category]
  );

  return (
    <div>
      <SectionHeader title={t.match.title} subtitle={t.match.subtitle} icon="🎮" />

      <Accordion
        title={lang === "en" ? "Turn Structure" : "Struttura del Turno"}
        icon="🗂️"
        defaultOpen={true}
      >
        <TurnStructureDiagram phases={phases} lang={lang} />
      </Accordion>

      <Accordion
        title={lang === "en" ? "The Stack — How It Works" : "La pila — come funziona"}
        icon="📚"
      >
        <p className="prose" style={{ marginTop: 10 }}>
          {lang === "en"
            ? "Spells and abilities pile up on the stack and resolve last-in, first-out. After each spell is added, both players get priority to respond before it resolves."
            : "Le magie e le abilità vanno in pila e si risolvono in ordine LIFO (l'ultima entrata è la prima a uscire). Dopo ogni aggiunta, entrambi i giocatori hanno la priorità per rispondere prima che si risolva."}
        </p>
        {stacks.map((ex, ei) => (
          <div key={ei} className="match-page__stack-example">
            <div className="match-page__stack-title">📖 {ex.title}</div>
            {ex.steps.map((step, si) => (
              <div key={si} className="match-page__stack-row">
                <span className="match-page__stack-actor">{step.actor}</span>
                <div style={{ flex: 1 }}>
                  <div className="match-page__stack-action">{step.action}</div>
                  {step.stack.length > 0 && (
                    <div className="match-page__stack-pile">
                      {step.stack.map((s, i) => (
                        <div
                          key={i}
                          className={`match-page__stack-item ${i === 0 ? "match-page__stack-item--top" : "match-page__stack-item--rest"}`}
                        >
                          <span style={{ fontSize: 9, opacity: 0.5 }}>{i === 0 ? "⬆ TOP" : "↓"}</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {ex.cards.length > 0 && <CardGallery names={ex.cards} lang={lang} />}
          </div>
        ))}
      </Accordion>

      <Accordion title={mulligan.title} icon={mulligan.icon}>
        <ol className="match-page__mulligan">
          {mulligan.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </Accordion>

      <Accordion
        title={`${lang === "en" ? "Keywords A–Z" : "Parole Chiave A–Z"} (${keywords.length})`}
        icon="🔤"
      >
        <input
          type="text"
          className="input-search"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginTop: 10, marginBottom: 12 }}
        />
        <div className="match-page__kw-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`match-page__kw-filter ${category === cat ? "match-page__kw-filter--active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
        <div className="match-page__keywords">
          {filtered.map((kw) => (
            <div
              key={kw.name}
              className={`match-page__keyword ${expandedKw === kw.name ? "match-page__keyword--open" : ""}`}
              onClick={() => setExpandedKw(expandedKw === kw.name ? null : kw.name)}
            >
              <div className="match-page__keyword-row">
                <span className="match-page__keyword-symbol">{kw.symbol}</span>
                <div style={{ flex: 1 }}>
                  <div className="match-page__keyword-name">{kw.name}</div>
                  <div className="match-page__keyword-def">{kw.def}</div>
                </div>
              </div>
              {expandedKw === kw.name && kw.card && (
                <div className="match-page__keyword-card">
                  <div style={{ textAlign: "center" }}>
                    <ScryfallCard name={kw.card} lang={lang} style={{ width: 140, height: 195 }} />
                    <div style={{ fontSize: 10, color: "#475569", marginTop: 5 }}>
                      {lang === "en" ? "Example card" : "Carta esempio"}: {kw.card}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="match-page__empty">
              {lang === "en" ? "No results" : "Nessun risultato"}
            </div>
          )}
        </div>
      </Accordion>
    </div>
  );
}
