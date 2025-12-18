import React, { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "./card_tabs.scss";

/* -----------------------------
   RENK SWATCH (VALUE ÜZERİNDEN)
----------------------------- */
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

const getTextColor = (bg) => {
  if (!bg) return "#111827";

  // koyu renkler
  if (
    bg === "#262626" || // siyah
    bg === "#7C3AED" || // mor
    bg === "#2563EB"    // mavi
  ) {
    return "#FFFFFF";
  }

  // açık renkler
  return "#111827";
};


const CardTab = ({ cards, setCards, selectedType, cardData }) => {
  const [openId, setOpenId] = useState(null);

  /* -----------------------------
     OUTSIDE CLICK
  ----------------------------- */
  useEffect(() => {
    const close = () => setOpenId(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  /* -----------------------------
     ADD CARD
  ----------------------------- */
  const handleAddCard = () => {
    setCards((prev) => [
      ...prev,
      {
        item: {
          id: (prev?.[prev.length - 1]?.item?.id ?? 0) + 1,
          product: "",
          amount: null,
          quantity: 1,
          layout: "BOTTOM_LEFT_TWO_LINE_NAME_TITLE_BLACK",
          logo: "",
        },
        userInfo: {
          name: "",
          surname: "",
          title: null,
        },
      },
    ]);
  };

  /* -----------------------------
     REMOVE
  ----------------------------- */
  const handleRemove = (id) => {
    setCards((prev) => prev.filter((c) => c.item.id !== id));
    if (openId === id) setOpenId(null);
  };

  /* -----------------------------
     SELECT PRODUCT
  ----------------------------- */
  const handleSelect = (id, productValue) => {
    const selectedProduct = cardData.find((x) => x.value === productValue);

    setCards((prev) =>
      prev.map((c) =>
        c.item.id === id
          ? {
              ...c,
              item: {
                ...c.item,
                product: productValue,
                amount: selectedProduct?.price ?? null,
              },
            }
          : c
      )
    );

    setOpenId(null);
  };

  /* -----------------------------
     COUNT
  ----------------------------- */
  const handleCount = (id, value) => {
    const n = Math.max(1, Number(value) || 1);
    setCards((prev) =>
      prev.map((c) =>
        c.item.id === id
          ? {
              ...c,
              item: {
                ...c.item,
                quantity: n,
              },
            }
          : c
      )
    );
  };

  /* -----------------------------
     SORT
  ----------------------------- */
  const viewCards = useMemo(() => {
  if (!Array.isArray(cards)) return [];
  return cards; // eklediğin sıra neyse o
}, [cards]);


  return (
    <div className="card_tab">
      {viewCards.map((c) => {
        const selectedValue = c.item.product;
        const isOpen = openId === c.item.id;

        const selectedProduct = cardData.find((x) => x.value === selectedValue);

        /* -----------------------------
           LABEL
        ----------------------------- */
        let label = selectedProduct
          ? selectedProduct.label
          : "Kart Tipi Seçiniz";

        if (selectedProduct && selectedType !== "institutional") {
          const sameIds = viewCards
            .filter((x) => x.item.product === selectedValue)
            .map((x) => x.item.id);

          if (sameIds.length > 1) {
            const pos = sameIds.indexOf(c.item.id) + 1;
            label = `${selectedProduct.label} ${pos}`;
          }
        }

        /* -----------------------------
           OPTIONS (INSTITUTIONAL)
        ----------------------------- */
        const usedByOthers = new Set(
          viewCards
            .filter((x) => x.item.id !== c.item.id)
            .map((x) => x.item.product)
            .filter(Boolean)
        );

        const optionsForRow =
          selectedType === "institutional"
            ? cardData.filter(
                (opt) =>
                  opt.value === selectedValue || !usedByOthers.has(opt.value)
              )
            : cardData;

        return (
          <div className="card_group" key={c.item.id}>
            {/* DROPDOWN */}
            <div className="card_dropdown" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className={`dropdown_btn ${isOpen ? "is-open" : ""}`}
                onClick={() => setOpenId(isOpen ? null : c.item.id)}
                aria-expanded={isOpen}
              >
                <span className="dropdown_label">{label}</span>
                <span
                  className="swatch"
                  style={{
                    background: swatchColor(selectedValue),
                  }}
                />
                <span className="caret">▾</span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="dropdown_menu"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                  >
                    <div className="menu_scroll">
                      {optionsForRow.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          className={`option_row ${
                            selectedValue === opt.value ? "is-active" : ""
                          }`}
                          onClick={() => handleSelect(c.item.id, opt.value)}
                        >
                          <span className="option_label">{opt.label}</span>

                          <span className="variant_preview">
                            <span
                              className="mini_card"
                              style={{ background: swatchColor(opt.value),color: getTextColor(swatchColor(opt.value)), }}
                            >
                              <span className="mini_brand">KAVIO</span>
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ADET */}
            <div className="card_counter">
              <input
                type="number"
                min="1"
                value={c.item.quantity}
                onChange={(e) => handleCount(c.item.id, e.target.value)}
                className="qty_input"
              />
            </div>

            {/* REMOVE */}
            <div className="card_trash">
              <button
                type="button"
                className="trash_btn"
                onClick={() => handleRemove(c.item.id)}
                title="Kaldır"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        );
      })}

      {/* ADD */}
      <div className="card_add_button_container">
        <button
          className="card_add_button"
          onClick={handleAddCard}
          title="Kart ekle"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardTab;
