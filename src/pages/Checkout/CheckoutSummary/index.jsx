import React, { useMemo, useState } from "react";
import "./checkout_summary.scss";

import blackImg from "../../../assets/images/cards/black.png";
import whiteImg from "../../../assets/images/cards/white.png";
import silverImg from "../../../assets/images/cards/silver.png";

const CheckoutSummary = ({ cards = [], onAccept }) => {
  const [discount, setDiscount] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);

  const validCards = useMemo(() => {
    if (!Array.isArray(cards)) return [];
    return cards.filter((c) => c?.item?.product);
  }, [cards]);

  const subtotal = validCards.reduce((sum, c) => {
    const price = Number(c?.item?.amount || 0);
    const qty = Number(c?.item?.quantity || 1);
    return sum + price * qty;
  }, 0);

  const tax = 9;
  const discountAmount = appliedCode ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discountAmount;

  const handleApply = () => {
    if (discount.trim().toLowerCase() === "john") {
      setAppliedCode("John Doo");
    } else {
      setAppliedCode(null);
      alert("Geçersiz indirim kodu!");
    }
  };

  const getImg = (product) => {
    if (!product) return blackImg;
    if (product.includes("BEYAZ")) return whiteImg;
    if (product.includes("SILVER") || product.includes("GUMUS")) return silverImg;
    if (product.includes("SIYAH")) return blackImg;
    return blackImg;
  };

  const formatLabel = (str) =>
    (str || "")
      .toLowerCase()
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <div className="checkout_summary">
      <div className="items">
        {validCards.map((item) => {
          const imgSrc = getImg(item.item.product);
          const qty = Number(item.item.quantity || 1);
          const price = Number(item.item.amount || 0);

          return (
            <div className="item" key={item.item.id ?? `${item.item.product}-${Math.random()}`}>
              <div className="item-image">
                <img src={imgSrc} alt={item.item.product} />
                <span className="badge">{qty}</span>
              </div>
              <div className="item-info">
                <p className="item-name">{formatLabel(item.item.product)}</p>
                <p className="item-price">₺{price.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <hr />

      <div className="discount">
        <label>İndirim</label>
        {appliedCode ? (
          <p className="applied">{appliedCode}</p>
        ) : (
          <div className="discount-input">
            <input
              type="text"
              placeholder="Kod girin"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            {/* <button onClick={handleApply}>Uygula</button> */}
          </div>
        )}
      </div>

      <div className="summary-totals">
        <div className="line">
          <span>Ara Toplam</span>
          <strong>₺{subtotal.toFixed(2)}</strong>
        </div>
        <div className="line small">
          <span>Tahmini vergi</span>
          <span>₺{tax.toFixed(2)}</span>
        </div>
        {appliedCode && (
          <div className="line small discount-line">
            <span>İndirim (10%)</span>
            <span>- ₺{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="line total">
          <strong>Toplam</strong>
          <strong>TL ₺{total.toFixed(2)}</strong>
        </div>
      </div>

      <button className="accept-btn" type="button" onClick={onAccept}>
        Ödemeyi Tamamla
      </button>
    </div>
  );
};

export default CheckoutSummary;
