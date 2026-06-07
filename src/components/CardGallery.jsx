import ScryfallCard from "./ScryfallCard.jsx";
import "./CardGallery.css";

export default function CardGallery({ names, lang = "en" }) {
  return (
    <div className="card-gallery">
      <div className="card-gallery__track">
        {names.map((n) => (
          <div key={n} className="card-gallery__item">
            <ScryfallCard name={n} lang={lang} />
            <div className="card-gallery__label">{n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
