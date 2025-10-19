import React, { useEffect, useMemo, useRef, useState } from "react";
import LayoutAccordion from "../../Accordion/LayoutAccordion";

const prettify = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const LayoutTab = ({
  cards,
  setCards,
  onActiveIndexChange,
  selectedCard,     // id
  setSelectedCard,  // id setter
  selectedType,
}) => {
  const [openId, setOpenId] = useState(null);
  const rootRef = useRef(null);

  // Dışarı tıklayınca tüm accordion'ları kapat
  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpenId(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Sıralama: adı olanlar -> adı boş olanlar, aynı isimliler id ASC
  const viewCards = useMemo(() => {
    if (!Array.isArray(cards)) return [];
    const copy = [...cards];
    return copy.sort((a, b) => {
      const na = (a.card?.name || "").toLowerCase();
      const nb = (b.card?.name || "").toLowerCase();
      if (!na && nb) return 1;   // a boşsa sona
      if (na && !nb) return -1;  // b boşsa sona
      if (na === nb) return (a.id ?? 0) - (b.id ?? 0);
      return na.localeCompare(nb);
    });
  }, [cards]);

  // İlk yüklemede / kart listesi değiştiğinde: seçilmemişse ilk kartı seç
  useEffect(() => {
    if (!Array.isArray(viewCards) || viewCards.length === 0) {
      setOpenId(null);
      return;
    }
    if (selectedCard == null) {
      const firstId = viewCards[0].id;
      setSelectedCard(firstId);
      setOpenId(firstId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewCards]);

  // selectedCard (id) değişince açık olanı senkle
  useEffect(() => {
    if (!Array.isArray(viewCards) || viewCards.length === 0) return;
    if (selectedCard == null) { setOpenId(null); return; }
    const exists = viewCards.some(c => c.id === selectedCard);
    if (exists) setOpenId(selectedCard);
  }, [selectedCard, viewCards]);

  // openId -> parent’a index bildir (gerekirse)
  useEffect(() => {
    if (typeof onActiveIndexChange === "function") {
      if (openId == null) { onActiveIndexChange(null); return; }
      const idx = viewCards.findIndex(c => c.id === openId);
      onActiveIndexChange(idx >= 0 ? idx : null);
    }
  }, [openId, viewCards, onActiveIndexChange]);

  // Tek-açık toggle + seçimi id bazlı güncelle
  const handleToggle = (id) => {
    setOpenId(curr => (curr === id ? null : id));
    setSelectedCard(prev => (prev === id ? prev : id));
  };

  // Başlık üretimi: "Black Kart" / "Black Kart 1"
  const headerFor = (card) => {
    const selected = (card.card?.name || "").toLowerCase();
    const base = prettify(selected);
    let label = base ? `${base} Kart` : "Kart Tipi Seçiniz";
    if (base && selectedType !== "teams") {
      const sameIds = viewCards
        .filter(x => (x.card?.name || "").toLowerCase() === selected)
        .map(x => x.id);
      if (sameIds.length > 1) {
        const pos = sameIds.indexOf(card.id) + 1;
        label = `${base} Kart ${pos}`;
      }
    }
    return label;
  };

  return (
    <div ref={rootRef}>
      {Array.isArray(viewCards) && viewCards.length > 0 && viewCards.map((card) => (
        <LayoutAccordion
          key={card.id}
          id={card.id}                 // id tabanlı
          item={card}
          headerTitle={headerFor(card)}
          isOpen={openId === card.id}
          onToggle={() => handleToggle(card.id)}
          setCards={setCards}
          selectedType={selectedType}
        />
      ))}
    </div>
  );
};

export default LayoutTab;
