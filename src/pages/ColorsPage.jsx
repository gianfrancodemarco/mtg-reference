import Accordion from "../components/Accordion.jsx";
import CardGallery from "../components/CardGallery.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { Mana } from "../components/Mana.jsx";
import { T } from "../data/translations.js";
import { COLORS } from "../data/index.js";

export default function ColorsPage({ lang }) {
  const t = T[lang];
  const colors = COLORS[lang];

  return (
    <div>
      <SectionHeader title={t.colors.title} subtitle={t.colors.subtitle} icon="🌈" />
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
    </div>
  );
}
