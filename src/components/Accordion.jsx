import { useState } from "react";

export default function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion">
      <button className="accordion__trigger" onClick={() => setOpen(!open)}>
        <span className="accordion__title">
          {icon && <span className="accordion__icon">{icon}</span>}
          {title}
        </span>
        <span className={`accordion__chevron ${open ? "open" : ""}`}>▾</span>
      </button>
      {open && <div className="accordion__body">{children}</div>}
    </div>
  );
}
