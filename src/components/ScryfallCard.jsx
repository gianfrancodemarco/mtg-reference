import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { fetchCardImages } from "../utils/scryfall.js";
import "./ScryfallCard.css";

export default function ScryfallCard({ name, lang = "en", style: extraStyle = {} }) {
  const [status, setStatus] = useState("loading");
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(null);
  const [displayName, setDisplayName] = useState(name);

  const width = extraStyle.width ?? 130;
  const height = extraStyle.height ?? 181;
  const borderRadius = extraStyle.borderRadius ?? 10;

  const canOpen = status === "ok" && images;

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setImages(null);
    setDisplayName(name);
    setOpen(false);

    fetchCardImages(name, lang)
      .then((result) => {
        if (cancelled) return;
        setImages(result);
        setDisplayName(result.displayName);
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("err");
      });

    return () => {
      cancelled = true;
    };
  }, [name, lang]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleOpen(e) {
    e.stopPropagation();
    if (canOpen) setOpen(true);
  }

  return (
    <>
      <div
        className={`scryfall-card ${canOpen ? "scryfall-card--interactive" : ""}`}
        style={{ width, height, borderRadius }}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && canOpen) {
            e.preventDefault();
            handleOpen(e);
          }
        }}
        role={canOpen ? "button" : undefined}
        tabIndex={canOpen ? 0 : undefined}
        aria-label={canOpen ? `View ${displayName} fullscreen` : undefined}
      >
        {status === "loading" && (
          <div className="scryfall-card__placeholder">
            <div className="scryfall-card__spinner" />
            <span className="scryfall-card__placeholder-text">Loading…</span>
          </div>
        )}
        {status === "err" && (
          <div className="scryfall-card__placeholder scryfall-card__placeholder--err">
            <span style={{ fontSize: 26 }}>🃏</span>
            <span className="scryfall-card__placeholder-text">{displayName}</span>
          </div>
        )}
        {images && (
          <img
            key={images.normal}
            src={images.normal}
            alt={displayName}
            draggable={false}
            onLoad={() => setStatus("ok")}
            onError={() => setStatus("err")}
            className={`scryfall-card__img ${status === "ok" ? "scryfall-card__img--visible" : ""}`}
            style={{ borderRadius }}
          />
        )}
      </div>

      {open && images &&
        createPortal(
          <div
            className="card-modal"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={displayName}
          >
            <button
              type="button"
              className="card-modal__close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="card-modal__content" onClick={(e) => e.stopPropagation()}>
              <img src={images.large} alt={displayName} className="card-modal__img" draggable={false} />
              <p className="card-modal__name">{displayName}</p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
