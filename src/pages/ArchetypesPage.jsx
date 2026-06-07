import Accordion from "../components/Accordion.jsx";
import Badge from "../components/Badge.jsx";
import CardGallery from "../components/CardGallery.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { T } from "../data/translations.js";
import { ARCHETYPES } from "../data/index.js";

export default function ArchetypesPage({ lang }) {
  const t = T[lang];
  const archetypes = ARCHETYPES[lang];

  return (
    <div>
      <SectionHeader title={t.archetypes.title} subtitle={t.archetypes.subtitle} icon="🧩" />
      {archetypes.map((a) => (
        <Accordion key={a.name} title={`${a.icon} ${a.name}`} icon={null}>
          <div style={{ marginTop: 10 }}>
            <p style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{a.desc}</p>
            <div
              style={{
                background: `${a.color}0f`,
                border: `1px solid ${a.color}28`,
                borderRadius: 10,
                padding: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ color: a.color, fontWeight: 700, fontSize: 11, marginBottom: 4 }}>
                🗺️ {lang === "en" ? "Game Plan" : "Piano di Gioco"}
              </div>
              <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{a.gameplan}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div style={{ background: "#10b98110", border: "1px solid #10b98128", borderRadius: 8, padding: 8 }}>
                <div style={{ color: "#10b981", fontSize: 11, fontWeight: 700, marginBottom: 3 }}>
                  ✅ {lang === "en" ? "Strengths" : "Punti Forti"}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>{a.strengths}</div>
              </div>
              <div style={{ background: "#ef444410", border: "1px solid #ef444428", borderRadius: 8, padding: 8 }}>
                <div style={{ color: "#ef4444", fontSize: 11, fontWeight: 700, marginBottom: 3 }}>
                  ❌ {lang === "en" ? "Weaknesses" : "Punti Deboli"}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>{a.weaknesses}</div>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
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
              {a.examples.map((ex) => (
                <Badge key={ex} color={a.color}>
                  {ex}
                </Badge>
              ))}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#475569",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              {lang === "en" ? "Archetype cards" : "Carte archetipo"}
            </div>
            <CardGallery names={a.repCards} lang={lang} />
          </div>
        </Accordion>
      ))}
    </div>
  );
}
