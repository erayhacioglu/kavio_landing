import { RefreshCw } from "lucide-react";
import "./card_preview.scss";
import logoImg from "../../../../assets/images/kavio_logo.png";
import { useMemo } from "react";

const swatchTextColor = (v) =>
  v === "black" ? "#111" :
  v === "white" ? "#fff" :
  v === "gold" ? "#D4AF37" : "#fff";

const CardPreview = ({ cardFace, setCardFace, selectedCard, cards }) => {
  const toggleCard = () => {
    setCardFace((prev) => (prev === "front" ? "back" : "front"));
  };

  const { currentCard, logo } = useMemo(() => {
    if (!Array.isArray(cards) || !selectedCard)
      return { currentCard: null, logo: logoImg };

    const current = cards.find((el) => el?.id === selectedCard);
    const img = current?.logo?.img;

    let logoUrl = logoImg;
    if (img instanceof File || img instanceof Blob) {
      logoUrl = URL.createObjectURL(img);
    } else if (typeof img === "string" && img.trim() !== "") {
      logoUrl = img;
    }

    return { currentCard: current, logo: logoUrl };
  }, [cards, selectedCard]);

  return (
    <div className="card_preview_container">
      <button className="card_change_button" onClick={toggleCard}>
        <RefreshCw size={20} />
      </button>

      <div className={`nfc_card ${cardFace === "back" ? "is-back" : ""}`}>
        {/* Ön Yüz */}
        <div
          className={`nfc_card_face nfc_card_front ${
            currentCard?.card?.name ?? ""
          }`}
          style={{ color: swatchTextColor(currentCard?.layout?.color) }}
        >
          <img src={logo} alt="logo" className="card_logo" />
        </div>

        {/* Arka Yüz */}
        <div
          className={`nfc_card_face nfc_card_back ${
            currentCard?.card?.name ?? ""
          }`}
          style={{ color: swatchTextColor(currentCard?.layout?.color) }}
        >
          <div className="qr_zone">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
              alt="QR"
              className="qr_image"
            />
          </div>
          <div className="card_info">
             <h2 className="card_name">
                  {currentCard?.layout?.name ?? "Ad Soyad"}
                </h2>
                {
                  currentCard?.layout?.type === "classic" && 
                <p className="card_title">
                  {currentCard?.layout?.title ?? "Unvan | Şirket"}
                </p>
                }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
