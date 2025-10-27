import React, { useMemo, useState } from "react";
import "./checkout_summary.scss";

// Görselleri type’a göre import et
import blackImg from "../../../assets/images/cards/black_card.png";
import whiteImg from "../../../assets/images/cards/white_card.png";
import silverImg from "../../../assets/images/cards/silver_card.png";

const cardImages = {
  black: blackImg,
  white: whiteImg,
  silver: silverImg,
};

const CheckoutSummary = ({ cards = [] }) => {
  const [discount, setDiscount] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);

  // geçerli kartlar
  const validCards = useMemo(() => {
    if (!Array.isArray(cards)) return [];
    return cards.filter((c) => c?.card?.name);
  }, [cards]);

  // toplam hesaplama
  const subtotal = validCards.reduce(
    (sum, c) => sum + (c.card.count || 1) * getCardPrice(c.card.name),
    0
  );

  const tax = 9;
  const discountAmount = appliedCode ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discountAmount;

  function getCardPrice(name) {
    switch (name) {
      case "black":
      case "white":
        return 99;
      case "silver":
        return 129;
      default:
        return 99;
    }
  }

  const handleApply = () => {
    if (discount.trim().toLowerCase() === "john") {
      setAppliedCode("John Doo");
    } else {
      setAppliedCode(null);
      alert("Invalid discount code!");
    }
  };

  return (
    <div className="checkout_summary">
      <div className="items">
        {validCards.map((item) => {
          const imgSrc = cardImages[item.card.name] || cardImages.black;
          return (
            <div className="item" key={item.id}>
              <div className="item-image">
                <img src={imgSrc} alt={item.card.name} />
                <span className="badge">{item.card.count || 1}</span>
              </div>
              <div className="item-info">
                <p className="item-name">
                  KAVIO {capitalize(item.card.name)} Card
                  {item.layout?.type === "classic"
                    ? " with silver print"
                    : " Edition"}
                </p>
                <p className="item-price">
                  ${getCardPrice(item.card.name).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <hr />

      <div className="discount">
        <label>Discount</label>
        {appliedCode ? (
          <p className="applied">{appliedCode}</p>
        ) : (
          <div className="discount-input">
            <input
              type="text"
              placeholder="Enter code"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <button onClick={handleApply}>Apply</button>
          </div>
        )}
      </div>

      <div className="summary-totals">
        <div className="line">
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <div className="line small">
          <span>Estimated tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {appliedCode && (
          <div className="line small discount-line">
            <span>Discount (10%)</span>
            <span>- ${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="line total">
          <strong>Total</strong>
          <strong>USD ${total.toFixed(2)}</strong>
        </div>
      </div>

      <button className="accept-btn">Accept</button>
    </div>
  );
};

export default CheckoutSummary;

// helper
function capitalize(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1) || "";
}
