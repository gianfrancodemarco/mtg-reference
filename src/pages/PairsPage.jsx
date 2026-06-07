import Accordion from "../components/Accordion.jsx";
import Badge from "../components/Badge.jsx";
import ScryfallCard from "../components/ScryfallCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { ManaRow } from "../components/Mana.jsx";
import { T } from "../data/translations.js";
import { COLOR_PAIRS } from "../data/index.js";

export default function PairsPage({ lang }) {
  const t = T[lang];
  const pairs = COLOR_PAIRS[lang];

  return (
    <div>
      <SectionHeader title={t.pairs.title} subtitle={t.pairs.subtitle} icon="🤝" />
      {pairs.map((p) => (
        <Accordion key={p.names} title={`${p.symbol} ${p.names}`} icon={null}>
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <ManaRow symbols={p.colors} size={22} />
              <Badge color="#6366f1">{p.identity}</Badge>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
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
              {lang === "en" ? "Representative card" : "Carta rappresentativa"}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ textAlign: "center" }}>
                <ScryfallCard name={p.repCard} lang={lang} style={{ width: 130, height: 181 }} />
                <div style={{ fontSize: 10, color: "#475569", marginTop: 5 }}>{p.repCard}</div>
              </div>
            </div>
          </div>
        </Accordion>
      ))}
    </div>
  );
}
