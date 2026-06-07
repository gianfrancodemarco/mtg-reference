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

    return {
      ...phase,
      colX,
      colW: COL_W,
      headerY: PAD_TOP,
      bodyTop: PAD_TOP + PHASE_HDR,
      bodyH: colBodyH,
      steps,
      lastStep: steps[steps.length - 1],
      firstStep: steps[0],
    };
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

export default function TurnStructureDiagram({ phases, lang }) {
  const [activeKey, setActiveKey] = useState(null);

  const layout = useMemo(() => layoutPhases(phases), [phases]);
  const totalW = PAD_X * 2 + phases.length * COL_W + (phases.length - 1) * COL_GAP;
  const maxSteps = Math.max(...phases.map((p) => p.steps.length));
  const totalH = PAD_TOP + PHASE_HDR + maxSteps * STEP_H + (maxSteps - 1) * STEP_GAP + PAD_BOT;

  const activeStep = useMemo(() => {
    if (!activeKey) return null;
    for (const col of layout) {
      const found = col.steps.find((s) => s.key === activeKey);
      if (found) return { ...found, phase: col };
    }
    return null;
  }, [activeKey, layout]);

  const flowY = PAD_TOP + PHASE_HDR + (maxSteps * STEP_H + (maxSteps - 1) * STEP_GAP) / 2;

  return (
    <div className="turn-diagram">
      <div className="turn-diagram__hint">
        {lang === "en"
          ? "Tap any step to see what happens"
          : "Tocca un passo per vedere cosa succede"}
      </div>

      <div className="turn-diagram__scroll">
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

          {/* Turn banner */}
          <rect x={PAD_X} y={12} width={totalW - PAD_X * 2} height={32} rx={8} fill="url(#turnBanner)" stroke="rgba(255,255,255,0.1)" />
          <text x={totalW / 2} y={33} textAnchor="middle" className="turn-diagram__banner-text">
            {lang === "en" ? "ACTIVE PLAYER'S TURN" : "TURNO DEL GIOCATORE ATTIVO"}
          </text>

          {/* Phase columns */}
          {layout.map((col) => (
            <g key={col.id}>
              <rect
                x={col.colX - 4}
                y={col.headerY - 4}
                width={col.colW + 8}
                height={col.bodyH + PHASE_HDR + 8}
                rx={12}
                className="turn-diagram__phase-bg"
                style={{ "--phase-color": col.color }}
              />
              <text x={col.colX + col.colW / 2} y={col.headerY + 26} textAnchor="middle" className="turn-diagram__phase-label" style={{ fill: col.color }}>
                {col.icon} {col.label}
              </text>
            </g>
          ))}

          {/* Inter-phase arrows */}
          {layout.slice(0, -1).map((col, i) => {
            const next = layout[i + 1];
            const x1 = col.colX + col.colW;
            const x2 = next.colX;
            return <ArrowRight key={`between-${col.id}`} x1={x1 + 4} y1={flowY} x2={x2 - 4} />;
          })}

          {/* Intra-phase arrows */}
          {layout.map((col) => (
            <g key={`arrows-${col.id}`} style={{ "--phase-color": col.color }}>
              {col.steps.slice(0, -1).map((step, si) => {
                const next = col.steps[si + 1];
                const cx = step.x + step.w / 2;
                return (
                  <ArrowDown
                    key={`${step.key}-arrow`}
                    x={cx}
                    y1={step.y + step.h + 2}
                    y2={next.y - 2}
                  />
                );
              })}
            </g>
          ))}

          {/* Step nodes */}
          {layout.flatMap((col) =>
            col.steps.map((step) => {
              const isActive = activeKey === step.key;
              return (
                <g
                  key={step.key}
                  className={`turn-diagram__step ${isActive ? "turn-diagram__step--active" : ""}`}
                  style={{ "--phase-color": col.color }}
                  onClick={() => setActiveKey(isActive ? null : step.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveKey(isActive ? null : step.key);
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

          {/* Loop indicator */}
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

      {/* Detail panel */}
      <div className={`turn-diagram__detail ${activeStep ? "turn-diagram__detail--visible" : ""}`}>
        {activeStep ? (
          <>
            <div className="turn-diagram__detail-header">
              <span className="turn-diagram__detail-phase" style={{ color: activeStep.phase.color, borderColor: activeStep.phase.color + "44", background: activeStep.phase.color + "18" }}>
                {activeStep.phase.icon} {activeStep.phase.label}
              </span>
              <span className="turn-diagram__detail-step">{activeStep.name}</span>
            </div>
            <p className="turn-diagram__detail-desc">{activeStep.desc}</p>
          </>
        ) : (
          <p className="turn-diagram__detail-placeholder">
            {lang === "en"
              ? "Select a step in the diagram above to read its rules."
              : "Seleziona un passo nel diagramma per leggerne le regole."}
          </p>
        )}
      </div>

      {/* Legend */}
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
