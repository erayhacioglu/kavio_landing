import { RefreshCw } from "lucide-react";
import "./card_preview.scss";
import logoImg from "../../../../assets/images/kavio_logo.png";
import { useMemo } from "react";

const swatchTextColor = (v) =>
  v === "BLACK"
    ? "#111"
    : v === "WHITE"
    ? "#fff"
    : v === "GOLD"
    ? "#D4AF37"
    : "#fff";


    const swatchColor = (value) => {
  if (!value) return "#E5E7EB";

  if (value.includes("SIYAH")) return "#262626";
  if (value.includes("BEYAZ")) return "#E5E7EB";
  if (value.includes("MAVI")) return "#2563EB";
  if (value.includes("YESIL")) return "#16A34A";
  if (value.includes("MOR")) return "#7C3AED";
  if (value.includes("SEFFAF")) return "#CBD5E1";
  if (value.includes("GOLD")) return "#D4AF37";
  if (value.includes("GUMUS") || value.includes("SILVER")) return "#9CA3AF";
  if (value.includes("ROSE")) return "#F43F5E";

  return "#E5E7EB";
};

const CardPreview = ({
  cardFace,
  setCardFace,
  selectedCard,
  cards,
  cardData,
}) => {
  const toggleCard = () => {
    setCardFace((prev) => (prev === "front" ? "back" : "front"));
  };

  const { currentCard, logo } = useMemo(() => {
    if (!Array.isArray(cards) || !selectedCard)
      return { currentCard: null, logo: logoImg };

    const current = cards.find((el) => el?.item?.id === selectedCard);
    const img = current?.item?.logo;

    let logoUrl = logoImg;
    if (img instanceof File || img instanceof Blob) {
      logoUrl = URL.createObjectURL(img);
    } else if (typeof img === "string" && img.trim() !== "") {
      logoUrl = img;
    }

    return { currentCard: current, logo: logoUrl };
  }, [cards, selectedCard]);

  const cardName = cardData?.find(
    (el) => el?.value === currentCard?.item?.product
  )?.label;
  const cardLayout = currentCard?.item?.layout;
  const cardLayoutColor =
    cardLayout?.split("_")[cardLayout?.split("_")?.length - 1];
  const cardLayoutType = cardLayout?.split("_")?.includes("TWO")
    ? "TWO_LINE"
    : "ONE_LINE";

  const fullName = `${currentCard?.userInfo?.name ?? ""} ${
    currentCard?.userInfo?.surname ?? ""
  }`.trim();

  return (
    <div className="card_preview_container">
      <button className="card_change_button" onClick={toggleCard}>
        <RefreshCw size={20} />
      </button>

      <div className={`nfc_card ${cardFace === "back" ? "is-back" : ""}`}>
        {/* Ön Yüz */}
        <div
          className={`nfc_card_face nfc_card_front ${
            currentCard?.item?.product ?? ""
          }`}
          style={{ color: swatchTextColor(cardLayoutColor),background:swatchColor(currentCard?.item?.product) }}
        >
          <img src={logo} alt="logo" className="card_logo" />
        </div>

        {/* Arka Yüz */}
        <div
          className={`nfc_card_face nfc_card_back `}
          style={{ color: swatchTextColor(cardLayoutColor),background:swatchColor(currentCard?.item?.product) }}
        >
          <div className="qr_zone">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
              alt="QR"
              className="qr_image"
            />
          </div>
          <div className="card_info">
            <h2 className="card_name">{fullName || "Ad Soyad"}</h2>
            {cardLayoutType === "TWO_LINE" && (
              <p className="card_title">
                {currentCard?.userInfo?.title ?? "Unvan | Şirket"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
