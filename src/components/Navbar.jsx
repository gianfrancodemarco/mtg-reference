import { PAGES, PAGE_ICONS } from "../constants/navigation.js";
import "./Navbar.css";

export default function Navbar({ page, setPage, lang, setLang, labels }) {
  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          <div className="navbar__brand">
            <div className="navbar__mark">✦</div>
            <div className="navbar__titles">
              <span className="navbar__title">MTG Reference</span>
              <span className="navbar__subtitle">
                {lang === "en" ? "New Player Guide" : "Guida per principianti"}
              </span>
            </div>
          </div>

          <div className="lang-toggle navbar__lang">
            {["en", "it"].map((l) => (
              <button
                key={l}
                type="button"
                className={lang === l ? "active" : ""}
                onClick={() => setLang(l)}
                aria-label={l === "en" ? "English" : "Italiano"}
              >
                {l === "en" ? "EN" : "IT"}
              </button>
            ))}
          </div>
        </div>

        <nav className="navbar__desktop" aria-label="Main">
          {PAGES.map((p) => (
            <button
              key={p}
              type="button"
              className={`navbar__tab ${page === p ? "navbar__tab--active" : ""}`}
              onClick={() => setPage(p)}
            >
              <span className="navbar__tab-icon">{PAGE_ICONS[p]}</span>
              <span>{labels[p]}</span>
            </button>
          ))}
        </nav>
      </header>

      <nav className="navbar__mobile" aria-label="Main">
        {PAGES.map((p) => (
          <button
            key={p}
            type="button"
            className={`navbar__mobile-item ${page === p ? "navbar__mobile-item--active" : ""}`}
            onClick={() => setPage(p)}
          >
            <span className="navbar__mobile-icon">{PAGE_ICONS[p]}</span>
            <span className="navbar__mobile-label">{labels[p]}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
