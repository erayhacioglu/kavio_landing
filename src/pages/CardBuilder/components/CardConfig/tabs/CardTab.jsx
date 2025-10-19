import React, { useEffect, useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import "./card_tabs.scss";

const OPTIONS = [
  { value: "black",  label: "Black"  },
  { value: "silver", label: "Silver" },
  { value: "white",  label: "White"  },
  { value: "red",    label: "Red"    },
  { value: "gold",   label: "Gold"   },
];

const swatchColor = (v) =>
  v === "white"  ? "#E5E7EB" :
  v === "silver" ? "#BDBDBD" :
  v === "red"    ? "#DC2626" :
  v === "gold"   ? "#D4AF37" :
  v === "black"  ? "#262626" : "";

const CardTab = ({ cards, setCards, selectedType }) => {
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const close = () => setOpenId(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleAddCard = () => {
    setCards((prev) => [
      ...prev,
      {
        id: (prev?.[prev.length - 1]?.id ?? 0) + 1,
        card: { name: null, count: 1 },
        logo: { img: null },
        layout: { type: "classic", color: "white", name: null, title: null },
      },
    ]);
  };

  const handleRemove = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    if (openId === id) setOpenId(null);
  };

  const handleSelect = (id, value) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, card: { ...c.card, name: value } } : c))
    );
    setOpenId(null);
  };

  const handleCount = (id, value) => {
    const n = Math.max(1, Number(value) || 1);
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, card: { ...c.card, count: n } } : c))
    );
  };

  // sıralama: önce ismi olanlar, sonra boşlar; aynı isimliler id ASC
  const viewCards = useMemo(() => {
    if (!Array.isArray(cards)) return [];
    if (selectedType === "teams") return cards;
    const copy = [...cards];
    return copy.sort((a, b) => {
      const na = (a.card?.name || "").toLowerCase();
      const nb = (b.card?.name || "").toLowerCase();
      if (!na && nb) return 1;    // a boşsa sona
      if (na && !nb) return -1;   // b boşsa sona
      if (na === nb) return (a.id ?? 0) - (b.id ?? 0);
      return na.localeCompare(nb);
    });
  }, [cards, selectedType]);

  return (
    <div className="card_tab">
      {viewCards.length > 0 &&
        viewCards.map((c) => {
          const selected = (c.card?.name || "").toLowerCase();

          // ---- LABEL HESABI ----
          const baseName = OPTIONS.find((o) => o.value === selected)?.label;
          // 1) varsayılan
          let label = baseName ? `${baseName} Kart` : "Kart Tipi Seçiniz";
          // 2) teams değilse ve aynı isimden birden fazla varsa numaralandır
          if (baseName && selectedType !== "teams") {
            const sameNameIds = viewCards
              .filter((x) => (x.card?.name || "").toLowerCase() === selected)
              .map((x) => x.id);
            if (sameNameIds.length > 1) {
              const pos = sameNameIds.indexOf(c.id) + 1; // 1-based
              label = `${baseName} Kart ${pos}`;
            }
          }

          // Bu satırın opsiyonları:
          const usedByOthers = new Set(
            viewCards
              .filter((x) => x.id !== c.id)
              .map((x) => (x.card?.name || "").toLowerCase())
              .filter(Boolean)
          );
          const optionsForRow =
            selectedType === "teams"
              ? OPTIONS.filter(
                  (opt) => opt.value === selected || !usedByOthers.has(opt.value)
                )
              : OPTIONS;

          const isOpen = openId === c.id;

          return (
            <div className="card_group" key={c.id}>
              {/* DROPDOWN */}
              <div className="card_dropdown" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={`dropdown_btn ${isOpen ? "is-open" : ""}`}
                  onClick={() => setOpenId(isOpen ? null : c.id)}
                  aria-expanded={isOpen}
                >
                  <span className="dropdown_label">{label}</span>
                  <span className="swatch" style={{ background: swatchColor(selected) }} />
                  <span className="caret" aria-hidden>▾</span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="dropdown_menu"
                      role="listbox"
                      initial={{ opacity: 0, scale: 0.98, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -4 }}
                      transition={{ duration: 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <div className="menu_scroll">
                        {optionsForRow.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`option_row ${selected === opt.value ? "is-active" : ""}`}
                            onClick={() => handleSelect(c.id, opt.value)}
                            role="option"
                            aria-selected={selected === opt.value}
                          >
                            <span className="option_label">{opt.label}</span>
                            <span className="variant_preview">
                              <span className="mini_card" data-variant={opt.value}>
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
                  value={c.card?.count ?? 1}
                  onChange={(e) => handleCount(c.id, e.target.value)}
                  className="qty_input"
                />
              </div>

              {/* TRASH */}
              <div className="card_trash">
                <button
                  type="button"
                  className="trash_btn"
                  onClick={() => handleRemove(c.id)}
                  aria-label="Remove"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}

      {/* EKLE */}
      <div className="card_add_button_container">
        <button className="card_add_button" onClick={handleAddCard} title="Kart ekle">
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardTab;
