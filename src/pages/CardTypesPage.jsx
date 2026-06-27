import { useMemo, useState } from "react";
import Accordion from "../components/Accordion.jsx";
import Badge from "../components/Badge.jsx";
import CardGallery from "../components/CardGallery.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { T } from "../data/translations.js";
import { CARD_TYPES, CARD_SUBTYPES } from "../data/index.js";
import "./CardTypesPage.css";

function entryMatches(entry, q) {
  const parts = [entry.name, entry.title, entry.desc, entry.examples, entry.scryfallCards];
  return parts
    .flat()
    .filter(Boolean)
    .some((text) => String(text).toLowerCase().includes(q));
}

function filterEntries(entries, q) {
  if (!q) return entries;
  return entries.filter((entry) => entryMatches(entry, q));
}

function filterSubtypeGroup(group, q) {
  if (!q) return group;

  if (entryMatches(group, q)) return group;

  const subtypes = group.subtypes.filter((s, i) => {
    const en = group.subtypesEn?.[i] || s;
    return s.toLowerCase().includes(q) || en.toLowerCase().includes(q);
  });

  if (subtypes.length === 0) return null;
  return { ...group, subtypes };
}

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

function SubtypeGroupBlock({ group, lang }) {
  return (
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
  );
}

export default function CardTypesPage({ lang }) {
  const t = T[lang];
  const types = CARD_TYPES[lang];
  const details = CARD_SUBTYPES[lang];
  const sections = t.cardsSections;
  const [search, setSearch] = useState("");

  const q = search.trim().toLowerCase();

  const filteredTypes = useMemo(() => filterEntries(types, q), [types, q]);
  const filteredSupertypes = useMemo(() => filterEntries(details.supertypes, q), [details.supertypes, q]);
  const filteredComposites = useMemo(() => filterEntries(details.composites, q), [details.composites, q]);
  const filteredGroups = useMemo(
    () => details.subtypeGroups.map((group) => filterSubtypeGroup(group, q)).filter(Boolean),
    [details.subtypeGroups, q]
  );

  const hasResults =
    filteredTypes.length > 0 ||
    filteredSupertypes.length > 0 ||
    filteredComposites.length > 0 ||
    filteredGroups.length > 0;

  return (
    <div>
      <SectionHeader title={t.cards.title} subtitle={t.cards.subtitle} icon="🃏" />

      <input
        type="text"
        className="input-search card-types__search"
        placeholder={t.cardsSearch}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTypes.length > 0 && (
        <>
          <div className="card-types__section-label">{sections.core}</div>
          {filteredTypes.map((ct) => (
            <TypeBlock key={ct.name} ct={ct} lang={lang} />
          ))}
        </>
      )}

      {filteredSupertypes.length > 0 && (
        <>
          <div className="card-types__section-label">{sections.supertypes}</div>
          {filteredSupertypes.map((st) => (
            <TypeBlock key={st.name} ct={st} lang={lang} />
          ))}
        </>
      )}

      {filteredComposites.length > 0 && (
        <>
          <div className="card-types__section-label">{sections.composites}</div>
          {filteredComposites.map((ct) => (
            <TypeBlock key={ct.name} ct={ct} lang={lang} />
          ))}
        </>
      )}

      {filteredGroups.length > 0 && (
        <>
          <div className="card-types__section-label">{sections.subtypes}</div>
          {filteredGroups.map((group) => (
            <SubtypeGroupBlock key={group.title} group={group} lang={lang} />
          ))}
        </>
      )}

      {q && !hasResults && (
        <div style={{ color: "#64748b", fontSize: 14, padding: "12px 0" }}>{t.cardsNoResults}</div>
      )}
    </div>
  );
}
