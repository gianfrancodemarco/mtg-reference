export default function SectionHeader({ title, subtitle, icon }) {
  return (
    <div className="section-header">
      <h1>
        {icon} {title}
      </h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
