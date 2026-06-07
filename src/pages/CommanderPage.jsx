import Accordion from "../components/Accordion.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { ManaRow } from "../components/Mana.jsx";
import { T } from "../data/translations.js";
import { COMMANDER_RULES } from "../data/index.js";

export default function CommanderPage({ lang }) {
  const t = T[lang];
  const rules = COMMANDER_RULES[lang];

  return (
    <div>
      <SectionHeader title={t.formats.title} subtitle={t.formats.subtitle} icon="👑" />
      <div
        style={{
          background: "rgba(234,179,8,0.07)",
          border: "1px solid rgba(234,179,8,0.22)",
          borderRadius: 14,
          padding: 14,
          marginBottom: 18,
          fontSize: 14,
          color: "#fde68a",
          lineHeight: 1.6,
        }}
      >
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
      {rules.map((r) => (
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
