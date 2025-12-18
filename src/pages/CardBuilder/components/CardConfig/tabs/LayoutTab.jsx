import React, { useEffect, useMemo, useRef, useState } from "react";
import LayoutAccordion from "../../Accordion/LayoutAccordion";

const prettify = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/**
 * product enum -> okunur label
 * SIYAH_PVC_KART -> "Siyah Kart"
 * SIYAH_GOLD_METAL_KART -> "Siyah Gold Kart"
 */
const productToBaseLabel = (product) => {
  const p = (product || "").trim();
  if (!p) return null;

  const cleaned = p
    .replace(/_PVC_KART$/i, "")
    .replace(/_METAL_KART$/i, "")
    .replace(/_/g, " ")
    .toLowerCase();

  return prettify(cleaned);
};

const LayoutTab = ({
  cards,
  setCards,
  onActiveIndexChange,
  selectedCard, // item.id
  setSelectedCard,
  selectedType,
  cardData
}) => {
  const [openId, setOpenId] = useState(null);
  const rootRef = useRef(null);

  /* -----------------------------
     OUTSIDE CLICK
  ----------------------------- */
  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpenId(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  /* -----------------------------
     SORT (product adı olanlar önce)
  ----------------------------- */
  const viewCards = useMemo(() => {
  if (!Array.isArray(cards)) return [];
  return cards; // eklediğin sıra neyse o
}, [cards]);


  /* -----------------------------
     INITIAL SELECT
  ----------------------------- */
  useEffect(() => {
    if (!viewCards.length) {
      setOpenId(null);
      return;
    }

    if (selectedCard == null) {
      const firstId = viewCards[0]?.item?.id;
      if (firstId != null) {
        setSelectedCard(firstId);
        setOpenId(firstId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewCards]);

  /* -----------------------------
     SYNC selectedCard -> openId
  ----------------------------- */
  useEffect(() => {
    if (!viewCards.length) return;

    if (selectedCard == null) {
      setOpenId(null);
      return;
    }

    const exists = viewCards.some((c) => c?.item?.id === selectedCard);
    if (exists) setOpenId(selectedCard);
  }, [selectedCard, viewCards]);

  /* -----------------------------
     openId -> parent index (optional)
  ----------------------------- */
  useEffect(() => {
    if (typeof onActiveIndexChange !== "function") return;

    if (openId == null) {
      onActiveIndexChange(null);
      return;
    }

    const idx = viewCards.findIndex((c) => c?.item?.id === openId);
    onActiveIndexChange(idx >= 0 ? idx : null);
  }, [openId, viewCards, onActiveIndexChange]);

  /* -----------------------------
     TOGGLE
  ----------------------------- */
  const handleToggle = (id) => {
    setOpenId((curr) => (curr === id ? null : id));
    setSelectedCard((prev) => (prev === id ? prev : id));
  };

  /* -----------------------------
     HEADER LABEL
  ----------------------------- */
  const headerFor = (card) => {
  const product = card?.item?.product || "";
  const baseLabel =
    cardData?.find((x) => x.value === product)?.label || "Kart Tipi Seçiniz";

  if (selectedType === "institutional") return baseLabel;
  if (!product) return baseLabel;

  const sameIds = viewCards
    .filter((x) => (x?.item?.product || "") === product)
    .map((x) => x?.item?.id);

  if (sameIds.length > 1) {
    const pos = sameIds.indexOf(card?.item?.id) + 1;
    return `${baseLabel} ${pos}`;
  }

  return baseLabel;
};


  return (
    <div ref={rootRef}>
      {viewCards.map((card) => {
        const id = card?.item?.id;

        return (
          <LayoutAccordion
            key={id}
            id={id}
            item={card} // { item, userInfo } 그대로 gidiyor
            headerTitle={headerFor(card)}
            isOpen={openId === id}
            onToggle={() => handleToggle(id)}
            setCards={setCards}
            selectedType={selectedType}
          />
        );
      })}
    </div>
  );
};

export default LayoutTab;
