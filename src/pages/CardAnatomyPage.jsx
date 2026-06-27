import { useMemo, useState } from "react";
import Accordion from "../components/Accordion.jsx";
import Badge from "../components/Badge.jsx";
import CardGallery from "../components/CardGallery.jsx";
import ScryfallCard from "../components/ScryfallCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { T } from "../data/translations.js";
import { CARD_ANATOMY } from "../data/index.js";
import "./CardAnatomyPage.css";

function entryMatches(entry, q) {
  const parts = [
    entry.name,
    entry.desc,
    entry.location,
    entry.symbolColor,
    entry.packOdds,
    entry.examples,
    entry.scryfallCards,
  ];
  return parts
    .flat()
    .filter(Boolean)
    .some((text) => String(text).toLowerCase().includes(q));
}

function filterEntries(entries, q) {
  if (!q) return entries;
  return entries.filter((entry) => entryMatches(entry, q));
}

function ExamplesLabel({ lang }) {
  return (
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
  );
}

function PartBlock({ entry, lang }) {
  return (
    <Accordion key={entry.name} title={`${entry.icon} ${entry.name}`} icon={null}>
      {entry.location && <div className="anatomy__location">📍 {entry.location}</div>}
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginTop: 0 }}>{entry.desc}</p>
      {entry.scryfallCards?.length > 0 && (
        <>
          <div style={{ marginTop: 10, marginBottom: 6 }}>
            <ExamplesLabel lang={lang} />
            {entry.scryfallCards.map((ex) => (
              <Badge key={ex} color={entry.color}>
                {ex}
              </Badge>
            ))}
          </div>
          <CardGallery names={entry.scryfallCards} lang={lang} />
        </>
      )}
    </Accordion>
  );
}

function SpecialFrameBlock({ entry, lang }) {
  return (
    <Accordion key={entry.name} title={`${entry.icon} ${entry.name}`} icon={null}>
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginTop: 10 }}>{entry.desc}</p>
      {entry.examples?.length > 0 && (
        <div style={{ marginTop: 8, marginBottom: 6 }}>
          <ExamplesLabel lang={lang} />
          {entry.examples.map((ex) => (
            <Badge key={ex} color={entry.color}>
              {ex}
            </Badge>
          ))}
        </div>
      )}
      {entry.scryfallCards?.length > 0 && <CardGallery names={entry.scryfallCards} lang={lang} />}
    </Accordion>
  );
}

function RarityBlock({ entry, lang, swatchClass }) {
  return (
    <Accordion key={entry.name} title={`${entry.icon} ${entry.name}`} icon={null}>
      <div className="anatomy__rarity-meta">
        <div className="anatomy__meta-box">
          <div className="anatomy__meta-label">
            {lang === "en" ? "Set symbol color" : "Colore simbolo set"}
          </div>
          <div className="anatomy__meta-value">
            {swatchClass && <span className={`anatomy__symbol-swatch ${swatchClass}`} />}
            {entry.symbolColor}
          </div>
        </div>
        {entry.packOdds && (
          <div className="anatomy__meta-box">
            <div className="anatomy__meta-label">
              {lang === "en" ? "Typical pull rate" : "Frequenza tipica"}
            </div>
            <div className="anatomy__meta-value">{entry.packOdds}</div>
          </div>
        )}
      </div>
      <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginTop: 0 }}>{entry.desc}</p>
      <div style={{ marginTop: 10, marginBottom: 6 }}>
        <ExamplesLabel lang={lang} />
        {entry.scryfallCards.map((ex) => (
          <Badge key={ex} color={entry.color}>
            {ex}
          </Badge>
        ))}
      </div>
      <CardGallery names={entry.scryfallCards} lang={lang} />
    </Accordion>
  );
}

const RARITY_SWATCHES = {
  Common: "anatomy__symbol-swatch--common",
  Comune: "anatomy__symbol-swatch--common",
  Uncommon: "anatomy__symbol-swatch--uncommon",
  "Non comune": "anatomy__symbol-swatch--uncommon",
  Rare: "anatomy__symbol-swatch--rare",
  Rara: "anatomy__symbol-swatch--rare",
  "Mythic Rare": "anatomy__symbol-swatch--mythic",
  "Mitica rara": "anatomy__symbol-swatch--mythic",
};

export default function CardAnatomyPage({ lang }) {
  const t = T[lang];
  const data = CARD_ANATOMY[lang];
  const [search, setSearch] = useState("");
  const q = search.trim().toLowerCase();

  const filteredParts = useMemo(() => filterEntries(data.parts, q), [data.parts, q]);
  const filteredFrames = useMemo(() => filterEntries(data.specialFrames, q), [data.specialFrames, q]);
  const filteredRarities = useMemo(() => filterEntries(data.rarities, q), [data.rarities, q]);
  const filteredOther = useMemo(() => filterEntries(data.other, q), [data.other, q]);

  const hasResults =
    filteredParts.length > 0 ||
    filteredFrames.length > 0 ||
    filteredRarities.length > 0 ||
    filteredOther.length > 0;

  return (
    <div>
      <SectionHeader title={t.anatomy.title} subtitle={t.anatomy.subtitle} icon="🔍" />

      <div className="anatomy__hero">
        <div className="anatomy__hero-card">
          <ScryfallCard name={data.referenceCard} lang={lang} style={{ width: 220, height: 307, borderRadius: 12 }} />
          <span className="anatomy__hero-label">{t.anatomy.referenceCard}</span>
        </div>
        <p className="anatomy__intro">{data.intro}</p>
      </div>

      <div className="anatomy__legend">
        <span className="anatomy__legend-item">
          <span className="anatomy__symbol-swatch anatomy__symbol-swatch--common" />
          {lang === "en" ? "Common" : "Comune"}
        </span>
        <span className="anatomy__legend-item">
          <span className="anatomy__symbol-swatch anatomy__symbol-swatch--uncommon" />
          {lang === "en" ? "Uncommon" : "Non comune"}
        </span>
        <span className="anatomy__legend-item">
          <span className="anatomy__symbol-swatch anatomy__symbol-swatch--rare" />
          {lang === "en" ? "Rare" : "Rara"}
        </span>
        <span className="anatomy__legend-item">
          <span className="anatomy__symbol-swatch anatomy__symbol-swatch--mythic" />
          {lang === "en" ? "Mythic" : "Mitica"}
        </span>
      </div>

      <input
        type="text"
        className="input-search anatomy__search"
        placeholder={t.anatomySearch}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredParts.length > 0 && (
        <>
          <div className="anatomy__section-label">{data.sections.parts}</div>
          {filteredParts.map((entry) => (
            <PartBlock key={entry.name} entry={entry} lang={lang} />
          ))}
        </>
      )}

      {filteredFrames.length > 0 && (
        <>
          <div className="anatomy__section-label">{data.sections.specialFrames}</div>
          {filteredFrames.map((entry) => (
            <SpecialFrameBlock key={entry.name} entry={entry} lang={lang} />
          ))}
        </>
      )}

      {filteredRarities.length > 0 && (
        <>
          <div className="anatomy__section-label">{data.sections.rarities}</div>
          {filteredRarities.map((entry) => (
            <RarityBlock
              key={entry.name}
              entry={entry}
              lang={lang}
              swatchClass={RARITY_SWATCHES[entry.name]}
            />
          ))}
        </>
      )}

      {filteredOther.length > 0 && (
        <>
          <div className="anatomy__section-label">{data.sections.other}</div>
          {filteredOther.map((entry) => (
            <PartBlock key={entry.name} entry={entry} lang={lang} />
          ))}
        </>
      )}

      {q && !hasResults && (
        <div style={{ color: "#64748b", fontSize: 14, padding: "12px 0" }}>{t.anatomyNoResults}</div>
      )}
    </div>
  );
}
