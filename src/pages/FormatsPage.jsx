import { useMemo, useState } from "react";
import Accordion from "../components/Accordion.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { ManaRow } from "../components/Mana.jsx";
import { T } from "../data/translations.js";
import { FORMATS, FORMAT_CATEGORIES, FORMAT_CATEGORY_INFO, CATEGORY_ORDER, COMMANDER_RULES } from "../data/index.js";
import "./FormatsPage.css";

function CategoryIntro({ catKey, lang, categories, categoryInfo }) {
  const info = categoryInfo[catKey];
  if (!info) return null;
  return (
    <div className="formats-page__category-intro">
      <div className="formats-page__category-intro-title">
        {info.icon} {categories[catKey]}
      </div>
      <p className="formats-page__category-intro-desc">{info.desc}</p>
    </div>
  );
}

function FormatAccordion({ f, lang, categories }) {
  return (
    <Accordion key={f.id} title={`${f.icon} ${f.name}`} icon={null}>
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginTop: 10 }}>{f.desc}</p>
      <div className="formats-page__meta">
        <span className="formats-page__meta-item">
          {lang === "en" ? "Players" : "Giocatori"}: {f.players}
        </span>
        <span className="formats-page__meta-item">
          {lang === "en" ? "Deck" : "Mazzo"}: {f.deckSize}
        </span>
        <span className="formats-page__meta-item" style={{ borderColor: `${f.color}44`, color: f.color }}>
          {categories[f.category]}
        </span>
      </div>
      <ul className="formats-page__details">
        {f.details.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </Accordion>
  );
}

export default function FormatsPage({ lang }) {
  const t = T[lang];
  const formats = FORMATS[lang];
  const categories = FORMAT_CATEGORIES[lang];
  const categoryInfo = FORMAT_CATEGORY_INFO[lang];
  const commanderRules = COMMANDER_RULES[lang];
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categoryKeys = ["all", ...CATEGORY_ORDER];

  const filtered = useMemo(
    () =>
      formats.filter((f) => {
        const catMatch = category === "all" || f.category === category;
        const q = search.trim().toLowerCase();
        const searchMatch =
          !q ||
          f.name.toLowerCase().includes(q) ||
          f.desc.toLowerCase().includes(q) ||
          f.details.some((d) => d.toLowerCase().includes(q)) ||
          categories[f.category]?.toLowerCase().includes(q) ||
          categoryInfo[f.category]?.desc.toLowerCase().includes(q);
        return catMatch && searchMatch;
      }),
    [formats, category, search, categories, categoryInfo]
  );

  const grouped = useMemo(() => {
    if (category !== "all") return null;
    const groups = CATEGORY_ORDER.map((key) => ({
      key,
      formats: filtered.filter((f) => f.category === key),
    })).filter((g) => g.formats.length > 0);
    return groups.length ? groups : null;
  }, [category, filtered]);

  return (
    <div>
      <SectionHeader title={t.formats.title} subtitle={t.formats.subtitle} icon="🏆" />

      <input
        type="text"
        className="input-search"
        placeholder={t.formatsSearch}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="formats-page__filters">
        {categoryKeys.map((key) => (
          <button
            key={key}
            type="button"
            className={`formats-page__filter ${category === key ? "formats-page__filter--active" : ""}`}
            onClick={() => setCategory(key)}
          >
            {key === "all" ? (lang === "en" ? "All" : "Tutti") : categories[key]}
          </button>
        ))}
      </div>

      {category !== "all" && (
        <CategoryIntro catKey={category} lang={lang} categories={categories} categoryInfo={categoryInfo} />
      )}

      {grouped ? (
        grouped.map(({ key, formats: groupFormats }) => (
          <div key={key}>
            <div className="formats-page__section-label">{categories[key]}</div>
            <CategoryIntro catKey={key} lang={lang} categories={categories} categoryInfo={categoryInfo} />
            {groupFormats.map((f) => (
              <FormatAccordion key={f.id} f={f} lang={lang} categories={categories} />
            ))}
          </div>
        ))
      ) : (
        filtered.map((f) => <FormatAccordion key={f.id} f={f} lang={lang} categories={categories} />)
      )}

      {filtered.length === 0 && (
        <div style={{ color: "#64748b", fontSize: 14, padding: "12px 0" }}>
          {lang === "en" ? "No formats match your search." : "Nessun formato corrisponde alla ricerca."}
        </div>
      )}

      <div className="formats-page__section-label">
        {lang === "en" ? "Commander — detailed rules" : "Commander — regole dettagliate"}
      </div>
      <div className="formats-page__commander-banner">
        {lang === "en" ? (
          <>
            👑 Commander (EDH) — 100-card singleton format led by a legendary creature.{" "}
            <strong>Multiplayer, political, powerful.</strong>
          </>
        ) : (
          <>
            👑 Commander (EDH) — formato singleton da 100 carte guidato da una creatura leggendaria.{" "}
            <strong>Multigiocatore, politico, potente.</strong>
          </>
        )}
      </div>
      {commanderRules.map((r) => (
        <Accordion key={r.title} title={r.title} icon={r.icon}>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginTop: 10 }}>{r.content}</p>
          {r.mana && (
            <div style={{ marginTop: 8 }}>
              {lang === "en" ? "Tax cost" : "Tassa"}: <ManaRow symbols={r.mana} />
            </div>
          )}
        </Accordion>
      ))}
    </div>
  );
}
