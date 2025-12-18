import React, { useEffect, useMemo, useRef, useState } from "react";
import LogoAccordion from "../../Accordion/LogoAccordion";

const prettify = (s) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

const LogoTab = ({
  cards,
  setCards,
  onActiveIndexChange,
  selectedCard,     // item.id
  setSelectedCard,  // setter
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
      if (!rootRef.current.contains(e.target)) {
        setOpenId(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  /* -----------------------------
     SORT
     adı olanlar -> olmayanlar
  ----------------------------- */
  const viewCards = useMemo(() => {
    if (!Array.isArray(cards)) return [];

    return [...cards].sort((a, b) => {
  const ha = !!(a?.item?.product || "").trim(); // hasProduct
  const hb = !!(b?.item?.product || "").trim();

  // product seçili olanlar önce
  if (ha !== hb) return ha ? -1 : 1;

  // alfabetik yok → sadece id
  return (a?.item?.id ?? 0) - (b?.item?.id ?? 0);
})
  }, [cards]);

  /* -----------------------------
     INITIAL SELECT
  ----------------------------- */
  useEffect(() => {
    if (!Array.isArray(viewCards) || viewCards.length === 0) {
      setOpenId(null);
      return;
    }

    if (selectedCard == null) {
      const firstId = viewCards[0].item.id;
      setSelectedCard(firstId);
      setOpenId(firstId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewCards]);

  /* -----------------------------
     SYNC selectedCard -> openId
  ----------------------------- */
  useEffect(() => {
    if (!Array.isArray(viewCards) || viewCards.length === 0) return;

    if (selectedCard == null) {
      setOpenId(null);
      return;
    }

    const exists = viewCards.some(
      (c) => c.item.id === selectedCard
    );

    if (exists) setOpenId(selectedCard);
  }, [selectedCard, viewCards]);

  /* -----------------------------
     openId -> parent index
  ----------------------------- */
  useEffect(() => {
    if (typeof onActiveIndexChange !== "function") return;

    if (openId == null) {
      onActiveIndexChange(null);
      return;
    }

    const idx = viewCards.findIndex(
      (c) => c.item.id === openId
    );

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

  // institutional ise numara yok
  if (selectedType === "institutional") return baseLabel;

  // individual ise aynı üründen kaçıncı?
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
      {Array.isArray(viewCards) &&
        viewCards.length > 0 &&
        viewCards.map((card) => (
          <LogoAccordion
            key={card.item.id}
            id={card.item.id}
            item={card}
            headerTitle={headerFor(card)}
            isOpen={openId === card.item.id}
            onToggle={() => handleToggle(card.item.id)}
            setCards={setCards}
          />
        ))}
    </div>
  );
};

export default LogoTab;
