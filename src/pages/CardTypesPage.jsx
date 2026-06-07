import Accordion from "../components/Accordion.jsx";
import Badge from "../components/Badge.jsx";
import CardGallery from "../components/CardGallery.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { T } from "../data/translations.js";
import { CARD_TYPES } from "../data/index.js";

export default function CardTypesPage({ lang }) {
  const t = T[lang];
  const types = CARD_TYPES[lang];

  return (
    <div>
      <SectionHeader title={t.cards.title} subtitle={t.cards.subtitle} icon="🃏" />
      {types.map((ct) => (
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
          <CardGallery names={ct.scryfallCards} lang={lang} />
        </Accordion>
      ))}
    </div>
  );
}
