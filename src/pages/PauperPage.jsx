import Accordion from "../components/Accordion.jsx";
import CardGallery from "../components/CardGallery.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { T } from "../data/translations.js";
import { PAUPER, PAUPER_DECK_CARDS, PAUPER_MATCHUP_CARDS } from "../data/index.js";
import "./PauperPage.css";

function MetaTable({ meta }) {
  const max = meta.rows[0]?.share || 1;

  return (
    <div className="pauper__meta">
      <div className="pauper__meta-head">
        <span>{meta.columns.deck}</span>
        <span>{meta.columns.share}</span>
        <span>{meta.columns.tier}</span>
        <span>{meta.columns.role}</span>
      </div>
      {meta.rows.map((row) => {
        const rising = row.shift.startsWith("+");
        return (
          <div key={row.name} className="pauper__meta-row">
            <div className="pauper__meta-name">
              <span>{row.name}</span>
              <span className="pauper__meta-bar" aria-hidden="true">
                <span style={{ width: `${(row.share / max) * 100}%` }} />
              </span>
            </div>
            <span className="pauper__meta-share">{row.share.toFixed(1)}%</span>
            <span className={`pauper__tier pauper__tier--${row.tier.toLowerCase()}`}>{row.tier}</span>
            <span className="pauper__meta-role">
              {row.role}
              <span className={rising ? "pauper__shift pauper__shift--up" : "pauper__shift"}>{row.shift}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Matchup({ matchup, inLabel, outLabel, lang }) {
  const cards = PAUPER_MATCHUP_CARDS[matchup.opponent];

  return (
    <article className="pauper__matchup">
      <header className="pauper__matchup-head">
        <h3>{matchup.opponent}</h3>
        <span className="pauper__stance">{matchup.stance}</span>
      </header>
      <p>{matchup.plan}</p>
      {cards && <CardGallery names={cards} lang={lang} />}
      {matchup.empty ? (
        <div className="pauper__empty">{matchup.empty}</div>
      ) : (
        <div className="pauper__swap">
          <div>
            <div className="pauper__swap-label pauper__swap-label--in">{inLabel}</div>
            <ul>
              {matchup.inn.map((card) => (
                <li key={card}>{card}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="pauper__swap-label pauper__swap-label--out">{outLabel}</div>
            <ul>
              {matchup.out.map((card) => (
                <li key={card}>{card}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}

function DeckGuide({ lang, data, setSubpage }) {
  return (
    <div className="pauper__decks">
      {data.decks.items.map((deck) => (
        <article key={deck.name} className="pauper__deck">
          <header>
            <h3>{deck.name}</h3>
            <span>{deck.tag}</span>
          </header>
          <p>{deck.text}</p>
          <CardGallery names={PAUPER_DECK_CARDS[deck.name]} lang={lang} />
          {deck.name === "Mono-Red Madness" && (
            <button type="button" className="pauper__guide-link" onClick={() => setSubpage("madness")}>
              {data.guideLink}
            </button>
          )}
        </article>
      ))}
    </div>
  );
}

export default function PauperPage({ lang, subpage, setSubpage }) {
  const t = T[lang];
  const data = PAUPER[lang];
  const onMeta = subpage !== "madness";

  if (!onMeta) {
    return (
      <div>
        <SectionHeader title={t.pauper.madnessTitle} subtitle={t.pauper.madnessSubtitle} icon="🔥" />
        <p className="pauper__intro">{data.intro}</p>
        <p className="pauper__updated">
          {data.updated}
          {" · "}
          <a href={data.deckUrl} target="_blank" rel="noreferrer">
            {data.deckLink}
          </a>
        </p>

        <div className="pauper__section-label">{data.sections.deck}</div>
        <Accordion title={data.yourDeck.title} icon={data.yourDeck.icon} defaultOpen>
          {data.yourDeck.paragraphs.map((paragraph) => (
            <p key={paragraph} className="pauper__prose">
              {paragraph}
            </p>
          ))}
          <div className="pauper__list-line">{data.yourDeck.main}</div>
          <div className="pauper__list-line">{data.yourDeck.side}</div>
          <CardGallery names={data.yourDeck.cards} lang={lang} />
        </Accordion>

        <div className="pauper__section-label">{data.sections.side}</div>
      <Accordion title={data.side.title} icon={data.side.icon} defaultOpen>
        <h3 className="pauper__subhead">{data.side.principlesTitle}</h3>
        <ul className="pauper__principles">
          {data.side.principles.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>

        <h3 className="pauper__subhead">{data.side.cardsTitle}</h3>
        <div className="pauper__sb-cards">
          {data.side.cards.map((card) => (
            <div key={card.name} className="pauper__sb-card">
              <div className="pauper__sb-count">{card.count}</div>
              <div>
                <div className="pauper__sb-name">{card.name}</div>
                <p>{card.role}</p>
              </div>
            </div>
          ))}
        </div>
        <CardGallery names={data.side.cards.map((card) => card.name)} lang={lang} />

        <h3 className="pauper__subhead">{data.side.matchupsTitle}</h3>
        <div className="pauper__matchups">
          {data.side.matchups.map((matchup) => (
            <Matchup
              key={matchup.opponent}
              matchup={matchup}
              inLabel={data.side.inLabel}
              outLabel={data.side.outLabel}
              lang={lang}
            />
          ))}
        </div>
      </Accordion>
    </div>
    );
  }

  return (
    <div>
      <SectionHeader title={t.pauper.title} subtitle={t.pauper.subtitle} icon="🪙" />
      <p className="pauper__intro">{data.metaIntro}</p>
      <p className="pauper__updated">{data.updated}</p>

      <div className="pauper__section-label">{data.sections.meta}</div>
      <Accordion title={data.meta.title} icon={data.meta.icon} defaultOpen>
        <p className="pauper__prose">{data.meta.lead}</p>
        <MetaTable meta={data.meta} />
        <div className="pauper__note">{data.meta.challengeNote}</div>
        <p className="pauper__prose">{data.meta.other}</p>
        <p className="pauper__prose">{data.meta.crosscheck}</p>
        <div className="pauper__sources">
          {data.meta.sources.map((source) => (
            <a key={source.url} className="pauper__source" href={source.url} target="_blank" rel="noreferrer">
              <span className="pauper__source-name">{source.name}</span>
              <span className="pauper__source-detail">{source.detail}</span>
            </a>
          ))}
        </div>
      </Accordion>

      <div className="pauper__section-label">{data.sections.decks}</div>
      <Accordion title={data.decks.title} icon={data.decks.icon} defaultOpen>
        <DeckGuide lang={lang} data={data} setSubpage={setSubpage} />
      </Accordion>
    </div>
  );
}
