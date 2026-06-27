import Accordion from "../components/Accordion.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { T } from "../data/translations.js";
import { FARMING } from "../data/index.js";
import "./FarmingPage.css";

function CurrencyCards({ items }) {
  return (
    <div className="farming__currencies">
      {items.map((item) => (
        <div key={item.name} className="farming__currency-card">
          <div className="farming__currency-header">
            <span>{item.icon}</span>
            <span className="farming__currency-name" style={{ color: item.color }}>
              {item.name}
            </span>
          </div>
          <p className="farming__prose" style={{ marginTop: 0 }}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

function GoldSources({ sources }) {
  return (
    <>
      {sources.map((src) => (
        <div key={src.name} className="farming__source">
          <div className="farming__source-header">
            <span className="farming__source-icon">{src.icon}</span>
            <div>
              <div className="farming__source-name">{src.name}</div>
              <div className="farming__source-payout">{src.payout}</div>
              <span className="farming__source-highlight">{src.highlight}</span>
            </div>
          </div>
          <p className="farming__prose" style={{ marginTop: 8 }}>
            {src.desc}
          </p>
          <div className="farming__source-tip">💡 {src.tip}</div>
        </div>
      ))}
    </>
  );
}

function DraftEntries({ entries }) {
  return (
    <>
      {entries.map((entry) => (
        <div key={entry.name} className="farming__draft-entry">
          <div className="farming__draft-name">{entry.name}</div>
          <div className="farming__draft-costs">
            <span className="farming__cost-badge farming__cost-badge--gold">🪙 {entry.gold}</span>
            <span className="farming__cost-badge farming__cost-badge--gem">💎 {entry.gems}</span>
          </div>
          <div className="farming__draft-meta">{entry.format}</div>
          <div className="farming__draft-baseline">{entry.baseline}</div>
          <p className="farming__prose" style={{ marginTop: 8, marginBottom: 0 }}>
            {entry.note}
          </p>
        </div>
      ))}
    </>
  );
}

export default function FarmingPage({ lang }) {
  const t = T[lang];
  const data = FARMING[lang];
  const { general, loop } = data;

  return (
    <div>
      <SectionHeader title={t.farming.title} subtitle={t.farming.subtitle} icon="🌾" />

      <p className="farming__intro">{data.intro}</p>

      <div className="farming__section-label">{data.sections.general}</div>

      <Accordion title={general.farmingConcept.title} icon={general.farmingConcept.icon} defaultOpen>
        <p className="farming__prose">{general.farmingConcept.desc}</p>
        <div className="farming__note">{general.farmingConcept.note}</div>
      </Accordion>

      <Accordion title={general.currencies.title} icon={general.currencies.icon}>
        <p className="farming__prose">{general.currencies.desc}</p>
        <CurrencyCards items={general.currencies.items} />
        <div className="farming__ratio">{general.currencies.ratio}</div>
      </Accordion>

      <Accordion title={general.goldSources.title} icon={general.goldSources.icon}>
        <GoldSources sources={general.goldSources.sources} />
      </Accordion>

      <Accordion title={general.draftEconomy.title} icon={general.draftEconomy.icon}>
        <p className="farming__prose">{general.draftEconomy.desc}</p>
        <DraftEntries entries={general.draftEconomy.entries} />
        <ul className="farming__tips-list">
          {general.draftEconomy.draftingTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </Accordion>

      <Accordion title={general.keyRules.title} icon={general.keyRules.icon}>
        <div className="farming__rules">
          {general.keyRules.rules.map((rule) => (
            <div key={rule.text} className="farming__rule">
              <span className="farming__rule-icon">{rule.icon}</span>
              <span className="farming__rule-text">{rule.text}</span>
            </div>
          ))}
        </div>
      </Accordion>

      <div className="farming__section-label">{data.sections.loop}</div>

      <div className="farming__goal">🎯 {loop.goal}</div>

      <Accordion title={lang === "en" ? "Step-by-Step Loop" : "Loop passo per passo"} icon="🔄" defaultOpen>
        <div className="farming__loop">
          {loop.steps.map((step, i) => (
            <div key={step.n}>
              <div className="farming__loop-step">
                <div className="farming__loop-num">{step.n}</div>
                <div className="farming__loop-body">
                  <div className="farming__loop-title">{step.title}</div>
                  <div className="farming__loop-desc">{step.desc}</div>
                  <div className="farming__loop-detail">{step.detail}</div>
                </div>
              </div>
              {i < loop.steps.length - 1 && (
                <div className="farming__loop-arrow" aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          ))}
          <div className="farming__loop-repeat">
            <span className="farming__loop-repeat-icon" aria-hidden="true">↺</span>
            {loop.repeatLabel}
          </div>
        </div>
      </Accordion>

      <Accordion title={loop.dailyBudget.title} icon="📈">
        <div className="farming__budget">
          {loop.dailyBudget.rows.map((row) => (
            <div key={row.label} className="farming__budget-row">
              <span className="farming__budget-label">{row.label}</span>
              <span className="farming__budget-value">{row.value}</span>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion title={loop.compounding.title} icon="📈">
        <ul className="farming__compounding">
          {loop.compounding.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Accordion>
    </div>
  );
}
