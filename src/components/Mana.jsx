export function ManaFontLoader() {
  return (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/mana-font@latest/css/mana.min.css"
      crossOrigin="anonymous"
    />
  );
}

export function Mana({ s, size = 18, shadow = true }) {
  const cls = `ms ms-${s.toLowerCase()} ms-cost${shadow ? " ms-shadow" : ""}`;
  return (
    <i
      className={cls}
      style={{ fontSize: size, verticalAlign: "middle", display: "inline-block" }}
    />
  );
}

export function ManaRow({ symbols = [], size = 20 }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center", flexWrap: "wrap" }}>
      {symbols.map((s, i) => (
        <Mana key={i} s={s} size={size} />
      ))}
    </span>
  );
}
