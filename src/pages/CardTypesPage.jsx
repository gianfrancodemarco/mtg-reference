import { useMemo, useState } from "react";
import Accordion from "../components/Accordion.jsx";
import Badge from "../components/Badge.jsx";
import CardGallery from "../components/CardGallery.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { T } from "../data/translations.js";
import { CARD_TYPES, CARD_SUBTYPES } from "../data/index.js";
import "./CardTypesPage.css";

function TypeBlock({ ct, lang }) {
  return (
    <Accordion key={ct.name} title={`${ct.icon} ${ct.name}`} icon={null}>
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginTop: 10 }}>{ct.desc}</p>
      <div style={{ marginTop: 8, marginBottom: 6 }}>
        <span
          style={{
            color: "#475569",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {lang === "en" ? "Examples" : "Esempi"}:{" "}
        </span>
        {ct.examples.map((ex) => (
          <Badge key={ex} color={ct.color}>
            {ex}
          </Badge>
        ))}
      </div>
      {ct.scryfallCards?.length > 0 && <CardGallery names={ct.scryfallCards} lang={lang} />}
    </Accordion>
  );
}

export default function CardTypesPage({ lang }) {
  const t = T[lang];
  const types = CARD_TYPES[lang];
  const details = CARD_SUBTYPES[lang];
  const sections = t.cardsSections;
  const [subtypeSearch, setSubtypeSearch] = useState("");

  const filteredGroups = useMemo(() => {
    const q = subtypeSearch.trim().toLowerCase();
    if (!q) return details.subtypeGroups;
    return details.subtypeGroups
      .map((group) => {
        const titleMatch = group.title.toLowerCase().includes(q);
        const subtypes = group.subtypes.filter((s, i) => {
          const en = group.subtypesEn?.[i] || s;
          return s.toLowerCase().includes(q) || en.toLowerCase().includes(q);
        });
        if (!titleMatch && subtypes.length === 0) return null;
        return { ...group, subtypes: titleMatch ? group.subtypes : subtypes };
      })
      .filter(Boolean);
  }, [details.subtypeGroups, subtypeSearch]);

  return (
    <div>
      <SectionHeader title={t.cards.title} subtitle={t.cards.subtitle} icon="🃏" />

      <div className="card-types__section-label">{sections.core}</div>
      {types.map((ct) => (
        <TypeBlock key={ct.name} ct={ct} lang={lang} />
      ))}

      <div className="card-types__section-label">{sections.supertypes}</div>
      {details.supertypes.map((st) => (
        <TypeBlock key={st.name} ct={st} lang={lang} />
      ))}

      <div className="card-types__section-label">{sections.composites}</div>
      {details.composites.map((ct) => (
        <TypeBlock key={ct.name} ct={ct} lang={lang} />
      ))}

      <div className="card-types__section-label">{sections.subtypes}</div>
      <input
        type="text"
        className="input-search card-types__search"
        placeholder={lang === "en" ? "Search subtypes…" : "Cerca sottotipi…"}
        value={subtypeSearch}
        onChange={(e) => setSubtypeSearch(e.target.value)}
      />
      {filteredGroups.map((group) => (
        <Accordion key={group.title} title={`${group.icon} ${group.title}`} icon={null}>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginTop: 10 }}>{group.desc}</p>
          <div className="card-types__subtype-grid">
            {group.subtypes.map((sub, i) => (
              <span key={`${sub}-${i}`} className="card-types__subtype-pill" style={{ borderColor: `${group.color}33` }}>
                {sub}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 10, marginBottom: 6 }}>
            <span
              style={{
                color: "#475569",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {lang === "en" ? "Examples" : "Esempi"}:{" "}
            </span>
            {group.examples.map((ex) => (
              <Badge key={ex} color={group.color}>
                {ex}
              </Badge>
            ))}
          </div>
          {group.scryfallCards?.length > 0 && <CardGallery names={group.scryfallCards} lang={lang} />}
        </Accordion>
      ))}
      {filteredGroups.length === 0 && (
        <div style={{ color: "#64748b", fontSize: 14, padding: "12px 0" }}>
          {lang === "en" ? "No subtypes match your search." : "Nessun sottotipo corrisponde alla ricerca."}
        </div>
      )}
    </div>
  );
}
