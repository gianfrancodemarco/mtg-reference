import { useMemo, useState } from "react";
import "./TurnStructureDiagram.css";

const COL_W = 148;
const COL_GAP = 18;
const STEP_H = 38;
const STEP_GAP = 10;
const PHASE_HDR = 42;
const PAD_X = 24;
const PAD_TOP = 56;
const PAD_BOT = 48;

function truncate(text, max) {
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

function layoutPhases(phases) {
  const maxSteps = Math.max(...phases.map((p) => p.steps.length));
  const colBodyH = maxSteps * STEP_H + (maxSteps - 1) * STEP_GAP;

  return phases.map((phase, pi) => {
    const colX = PAD_X + pi * (COL_W + COL_GAP);
    const stepBlockH = phase.steps.length * STEP_H + (phase.steps.length - 1) * STEP_GAP;
    const yOffset = (colBodyH - stepBlockH) / 2;

    const steps = phase.steps.map((step, si) => ({
      ...step,
      x: colX,
      y: PAD_TOP + PHASE_HDR + yOffset + si * (STEP_H + STEP_GAP),
      w: COL_W,
      h: STEP_H,
      phaseId: phase.id,
      stepIndex: si,
      key: `${phase.id}-${si}`,
    }));

    return { ...phase, colX, colW: COL_W, bodyH: colBodyH, steps };
  });
}

function ArrowRight({ x1, y1, x2 }) {
  return (
    <g className="turn-diagram__connector">
      <line x1={x1} y1={y1} x2={x2 - 6} y2={y1} strokeWidth="2" />
      <polygon points={`${x2},${y1} ${x2 - 8},${y1 - 4} ${x2 - 8},${y1 + 4}`} />
    </g>
  );
}

function ArrowDown({ x, y1, y2 }) {
  return (
    <g className="turn-diagram__connector turn-diagram__connector--inner">
      <line x1={x} y1={y1} x2={x} y2={y2 - 6} strokeWidth="1.5" />
      <polygon points={`${x},${y2} ${x - 3.5},${y2 - 7} ${x + 3.5},${y2 - 7}`} />
    </g>
  );
}

function DetailPanel({ activeStep, lang }) {
  return (
    <div className={`turn-diagram__detail ${activeStep ? "turn-diagram__detail--visible" : ""}`}>
      {activeStep ? (
        <>
          <div className="turn-diagram__detail-header">
            <span
              className="turn-diagram__detail-phase"
              style={{
                color: activeStep.phase.color,
                borderColor: activeStep.phase.color + "44",
                background: activeStep.phase.color + "18",
              }}
            >
              {activeStep.phase.icon} {activeStep.phase.label}
            </span>
            <span className="turn-diagram__detail-step">{activeStep.name}</span>
          </div>
          <p className="turn-diagram__detail-desc">{activeStep.desc}</p>
        </>
      ) : (
        <p className="turn-diagram__detail-placeholder">
          {lang === "en"
            ? "Select a step to read what happens."
            : "Seleziona un passo per leggerne le regole."}
        </p>
      )}
    </div>
  );
}

function TurnTimelineMobile({ phases, lang, activeKey, onSelect }) {
  return (
    <div className="turn-timeline">
      <div className="turn-timeline__banner">
        {lang === "en" ? "Active player's turn" : "Turno del giocatore attivo"}
      </div>

      {phases.map((phase, pi) => (
        <section key={phase.id} className="turn-timeline__phase">
          <div
            className="turn-timeline__phase-head"
            style={{ "--phase-color": phase.color }}
          >
            <span className="turn-timeline__phase-icon">{phase.icon}</span>
            <span className="turn-timeline__phase-label">{phase.label}</span>
            <span className="turn-timeline__phase-count">
              {phase.steps.length} {lang === "en" ? (phase.steps.length === 1 ? "step" : "steps") : (phase.steps.length === 1 ? "passo" : "passi")}
            </span>
          </div>

          <div className="turn-timeline__steps">
            {phase.steps.map((step, si) => {
              const key = `${phase.id}-${si}`;
              const isActive = activeKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  className={`turn-timeline__step ${isActive ? "turn-timeline__step--active" : ""}`}
                  style={{ "--phase-color": phase.color }}
                  onClick={() => onSelect(isActive ? null : key, phase, step)}
                >
                  <span className="turn-timeline__step-index">{si + 1}</span>
                  <span className="turn-timeline__step-name">{step.name}</span>
                </button>
              );
            })}
          </div>

          {pi < phases.length - 1 && (
            <div className="turn-timeline__between" aria-hidden="true">
              <span className="turn-timeline__arrow">↓</span>
            </div>
          )}
        </section>
      ))}

      <p className="turn-timeline__loop">
        {lang === "en" ? "↻ Then the next player's turn begins" : "↻ Poi inizia il turno del prossimo giocatore"}
      </p>
    </div>
  );
}

function TurnFlowDesktop({ phases, lang, layout, totalW, totalH, maxSteps, flowY, activeKey, onSelect }) {
  return (
    <div className="turn-diagram__desktop">
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="turn-diagram__svg"
        role="img"
        aria-label={lang === "en" ? "Magic turn structure flowchart" : "Diagramma struttura turno Magic"}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="turnBanner" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d4a853" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <rect x={PAD_X} y={12} width={totalW - PAD_X * 2} height={32} rx={8} fill="url(#turnBanner)" stroke="rgba(255,255,255,0.1)" />
        <text x={totalW / 2} y={33} textAnchor="middle" className="turn-diagram__banner-text">
          {lang === "en" ? "ACTIVE PLAYER'S TURN" : "TURNO DEL GIOCATORE ATTIVO"}
        </text>

        {layout.map((col) => (
          <g key={col.id}>
            <rect
              x={col.colX - 4}
              y={PAD_TOP - 4}
              width={col.colW + 8}
              height={col.bodyH + PHASE_HDR + 8}
              rx={12}
              className="turn-diagram__phase-bg"
              style={{ "--phase-color": col.color }}
            />
            <text x={col.colX + col.colW / 2} y={PAD_TOP + 26} textAnchor="middle" className="turn-diagram__phase-label" style={{ fill: col.color }}>
              {col.icon} {col.label}
            </text>
          </g>
        ))}

        {layout.slice(0, -1).map((col, i) => {
          const next = layout[i + 1];
          return <ArrowRight key={`between-${col.id}`} x1={col.colX + col.colW + 4} y1={flowY} x2={next.colX - 4} />;
        })}

        {layout.map((col) => (
          <g key={`arrows-${col.id}`} style={{ "--phase-color": col.color }}>
            {col.steps.slice(0, -1).map((step, si) => {
              const next = col.steps[si + 1];
              return (
                <ArrowDown
                  key={`${step.key}-arrow`}
                  x={step.x + step.w / 2}
                  y1={step.y + step.h + 2}
                  y2={next.y - 2}
                />
              );
            })}
          </g>
        ))}

        {layout.flatMap((col) =>
          col.steps.map((step) => {
            const isActive = activeKey === step.key;
            return (
              <g
                key={step.key}
                className={`turn-diagram__step ${isActive ? "turn-diagram__step--active" : ""}`}
                style={{ "--phase-color": col.color }}
                onClick={() => onSelect(isActive ? null : step.key, col, step)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(isActive ? null : step.key, col, step);
                  }
                }}
              >
                <rect
                  x={step.x + 2}
                  y={step.y}
                  width={step.w - 4}
                  height={step.h}
                  rx={8}
                  className="turn-diagram__step-rect"
                  filter={isActive ? "url(#glow)" : undefined}
                />
                <text x={step.x + step.w / 2} y={step.y + step.h / 2 + 4} textAnchor="middle" className="turn-diagram__step-text">
                  {truncate(step.name, 22)}
                </text>
              </g>
            );
          })
        )}

        <path
          d={`M ${totalW - PAD_X - 20} ${totalH - 20} Q ${totalW / 2} ${totalH + 8} ${PAD_X + 20} ${totalH - 20}`}
          fill="none"
          className="turn-diagram__loop"
          strokeDasharray="5 4"
        />
        <text x={totalW / 2} y={totalH - 6} textAnchor="middle" className="turn-diagram__loop-text">
          {lang === "en" ? "↻ next player's turn" : "↻ turno del prossimo giocatore"}
        </text>
      </svg>
    </div>
  );
}

export default function TurnStructureDiagram({ phases, lang }) {
  const [activeKey, setActiveKey] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  const layout = useMemo(() => layoutPhases(phases), [phases]);
  const totalW = PAD_X * 2 + phases.length * COL_W + (phases.length - 1) * COL_GAP;
  const maxSteps = Math.max(...phases.map((p) => p.steps.length));
  const totalH = PAD_TOP + PHASE_HDR + maxSteps * STEP_H + (maxSteps - 1) * STEP_GAP + PAD_BOT;
  const flowY = PAD_TOP + PHASE_HDR + (maxSteps * STEP_H + (maxSteps - 1) * STEP_GAP) / 2;

  function handleSelect(key, phase, step) {
    setActiveKey(key);
    setActiveStep(key ? { ...step, phase } : null);
  }

  return (
    <div className="turn-diagram">
      <p className="turn-diagram__hint">
        {lang === "en" ? "Tap any step to see what happens" : "Tocca un passo per vedere cosa succede"}
      </p>

      <TurnTimelineMobile
        phases={phases}
        lang={lang}
        activeKey={activeKey}
        onSelect={handleSelect}
      />

      <TurnFlowDesktop
        phases={phases}
        lang={lang}
        layout={layout}
        totalW={totalW}
        totalH={totalH}
        maxSteps={maxSteps}
        flowY={flowY}
        activeKey={activeKey}
        onSelect={handleSelect}
      />

      <DetailPanel activeStep={activeStep} lang={lang} />

      <div className="turn-diagram__legend">
        {phases.map((ph) => (
          <span key={ph.id} className="turn-diagram__legend-item">
            <span className="turn-diagram__legend-dot" style={{ background: ph.color }} />
            {ph.label}
          </span>
        ))}
      </div>
    </div>
  );
}
