import Accordion from "../components/Accordion.jsx";
import Badge from "../components/Badge.jsx";
import CardGallery from "../components/CardGallery.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { T } from "../data/translations.js";
import { TRIBES } from "../data/index.js";

export default function TribesPage({ lang }) {
  const t = T[lang];
  const tribes = TRIBES[lang];

  return (
    <div>
      <SectionHeader title={t.tribes.title} subtitle={t.tribes.subtitle} icon="🦁" />
      <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{t.tribes.intro}</p>
      {tribes.map((tr) => (
        <Accordion key={tr.name} title={`${tr.icon} ${tr.name}`} icon={null}>
          <div style={{ marginTop: 10 }}>
            <p style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{tr.desc}</p>
            <div
              style={{
                background: `${tr.color}0f`,
                border: `1px solid ${tr.color}28`,
                borderRadius: 10,
                padding: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ color: tr.color, fontWeight: 700, fontSize: 11, marginBottom: 4 }}>
                🔗 {lang === "en" ? "Tribal Synergies" : "Sinergie tribali"}
              </div>
              <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{tr.synergies}</div>
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
                {lang === "en" ? "Example decks" : "Mazzi esempio"}:{" "}
              </span>
              {tr.examples.map((ex) => (
                <Badge key={ex} color={tr.color}>
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
              {lang === "en" ? "Tribe cards" : "Carte tribù"}
            </div>
            <CardGallery names={tr.repCards} lang={lang} />
          </div>
        </Accordion>
      ))}
    </div>
  );
}
