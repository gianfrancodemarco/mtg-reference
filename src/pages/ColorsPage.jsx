import Accordion from "../components/Accordion.jsx";
import Badge from "../components/Badge.jsx";
import CardGallery from "../components/CardGallery.jsx";
import ScryfallCard from "../components/ScryfallCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { Mana, ManaRow } from "../components/Mana.jsx";
import { T } from "../data/translations.js";
import { COLORS, COLOR_PAIRS, COLOR_TRIADS, COLOR_QUADS, COLOR_FIVE } from "../data/index.js";

function SectionLabel({ children }) {
  return (
    <h2
      style={{
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: "#6366f1",
        margin: "28px 0 12px",
        paddingBottom: 8,
        borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
      }}
    >
      {children}
    </h2>
  );
}

function ColorComboAccordion({ entry, lang, repLabel }) {
  return (
    <Accordion
      key={entry.names}
      title={entry.names}
      icon={<ManaRow symbols={entry.colors} size={18} />}
    >
      <div style={{ marginTop: 10 }}>
        <div style={{ marginBottom: 10 }}>
          <Badge color="#6366f1">{entry.identity}</Badge>
        </div>
        <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{entry.desc}</p>
        <div
          style={{
            fontSize: 11,
            color: "#475569",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 6,
          }}
        >
          {repLabel}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{ textAlign: "center" }}>
            <ScryfallCard name={entry.repCard} lang={lang} style={{ width: 130, height: 181 }} />
            <div style={{ fontSize: 10, color: "#475569", marginTop: 5 }}>{entry.repCard}</div>
          </div>
        </div>
      </div>
    </Accordion>
  );
}

export default function ColorsPage({ lang }) {
  const t = T[lang];
  const ct = t.colors;
  const colors = COLORS[lang];
  const pairs = COLOR_PAIRS[lang];
  const triads = COLOR_TRIADS[lang];
  const quads = COLOR_QUADS[lang];
  const five = COLOR_FIVE[lang];
  const shards = triads.filter((t) => t.type === "shard");
  const wedges = triads.filter((t) => t.type === "wedge");

  return (
    <div>
      <SectionHeader title={ct.title} subtitle={ct.subtitle} icon="🌈" />
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        {colors.map((c) => (
          <div key={c.mana} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: c.hex + "33",
                border: `3px solid ${c.hex}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Mana s={c.mana} size={28} shadow={false} />
            </div>
            <div style={{ fontSize: 11, color: c.hex, fontWeight: 700 }}>{c.name}</div>
          </div>
        ))}
      </div>

      <SectionLabel>{ct.sections.mono}</SectionLabel>
      {colors.map((c) => (
        <Accordion key={c.name} title={c.name} icon={<Mana s={c.mana} size={18} />}>
          <p
            style={{
              color: "#e2e8f0",
              fontStyle: "italic",
              fontSize: 14,
              lineHeight: 1.6,
              borderLeft: `3px solid ${c.hex}`,
              paddingLeft: 12,
              margin: "10px 0 12px",
            }}
          >
            {c.philosophy}
          </p>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>🗺 {c.flavor}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
            <div style={{ background: "#10b98112", border: "1px solid #10b98130", borderRadius: 8, padding: 10 }}>
              <div style={{ color: "#10b981", fontWeight: 700, fontSize: 11, marginBottom: 4 }}>
                ✅ {lang === "en" ? "Strengths" : "Punti di Forza"}
              </div>
              <div style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>{c.strengths}</div>
            </div>
            <div style={{ background: "#ef444412", border: "1px solid #ef444430", borderRadius: 8, padding: 10 }}>
              <div style={{ color: "#ef4444", fontWeight: 700, fontSize: 11, marginBottom: 4 }}>
                ❌ {lang === "en" ? "Weaknesses" : "Punti Deboli"}
              </div>
              <div style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>{c.weaknesses}</div>
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#64748b",
              marginBottom: 6,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {lang === "en" ? "Iconic cards" : "Carte iconiche"}
          </div>
          <CardGallery names={c.repCards} lang={lang} />
        </Accordion>
      ))}

      <SectionLabel>{ct.sections.pairs}</SectionLabel>
      {pairs.map((p) => (
        <ColorComboAccordion key={p.names} entry={p} lang={lang} repLabel={ct.repCard} />
      ))}

      <SectionLabel>{ct.sections.shards}</SectionLabel>
      {shards.map((t) => (
        <ColorComboAccordion key={t.names} entry={t} lang={lang} repLabel={ct.repCard} />
      ))}

      <SectionLabel>{ct.sections.wedges}</SectionLabel>
      {wedges.map((t) => (
        <ColorComboAccordion key={t.names} entry={t} lang={lang} repLabel={ct.repCard} />
      ))}

      <SectionLabel>{ct.sections.quads}</SectionLabel>
      {quads.map((q) => (
        <ColorComboAccordion key={q.names} entry={q} lang={lang} repLabel={ct.repCard} />
      ))}

      <SectionLabel>{ct.sections.five}</SectionLabel>
      <ColorComboAccordion entry={five} lang={lang} repLabel={ct.repCard} />
    </div>
  );
}
