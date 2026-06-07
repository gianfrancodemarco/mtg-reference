export default function Badge({ children, color = "#6366f1" }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        background: color + "28",
        color,
        border: `1px solid ${color}44`,
        marginRight: 4,
        marginBottom: 4,
      }}
    >
      {children}
    </span>
  );
}
