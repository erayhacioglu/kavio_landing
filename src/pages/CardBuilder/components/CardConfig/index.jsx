import { ChevronRight, ChevronLeft, CreditCard } from "lucide-react";
import { useNavigate } from "react-router";
import "./card_config.scss";
import CardTab from "./tabs/CardTab";
import LogoTab from "./tabs/LogoTab";
import LayoutTab from "./tabs/LayoutTab";
import { AnimatePresence, motion } from "framer-motion";

const cardTabsData = [
  { id: 1, value: "card", label: "Card" },
  { id: 2, value: "logo", label: "Logo" },
  { id: 3, value: "layout", label: "Layout" },
];
const order = ["card", "logo", "layout"];

const CardConfig = ({
  setCardFace,
  cardTab,
  setCardTab,
  cards,
  setCards,
  selectedCard,
  setSelectedCard,
  selectedType
}) => {
  const navigate = useNavigate();
  const firstCardId = cards?.[0]?.id ?? null;
  const isFirst = cardTab === "card";
  const isLast = cardTab === "layout";

  const setFaceByTab = (tab) => {
    if (tab === "layout") setCardFace("back");
    else setCardFace("front");
  };

  const gotoPrev = () => {
    const i = order.indexOf(cardTab);
    if (i > 0) {
      const prev = order[i - 1];
      setFaceByTab(prev);
      if (!selectedCard && firstCardId) setSelectedCard(firstCardId);
      setCardTab(prev);
    }
  };

  const gotoNextOrPay = () => {
    const order = ["card", "logo", "layout"];
    const i = order.indexOf(cardTab);
    if (isLast) {
      // Ödemeye Geç
      navigate("/checkout");
      return;
    }
    if (i < order.length - 1) {
      const next = order[i + 1];
      setFaceByTab(next);
      if (!selectedCard && firstCardId) setSelectedCard(firstCardId);
      setCardTab(next);
    }
  };

  return (
    <div className="card_config_container">
      {/* Tabs */}
      <div className="card_config_tabs">
        {cardTabsData.map((item) => (
          <button
            key={item.id}
            className={`card_tab_button ${
              cardTab === item.value ? "active" : ""
            }`}
            onClick={() => {
              setFaceByTab(item.value);
              setCardTab(item.value);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="card_config_body">
        <AnimatePresence mode="wait">
          <motion.div
            key={cardTab}
            initial={{ opacity: 0, y: 8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.995 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {cardTab === "card" && (
              <CardTab cards={cards} setCards={setCards} selectedType={selectedType}/>
            )}
            {cardTab === "logo" && (
              <LogoTab
                cards={cards}
                setCards={setCards}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                selectedType={selectedType}
              />
            )}
            {cardTab === "layout" && (
              <LayoutTab
                cards={cards}
                setCards={setCards}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                selectedType={selectedType}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="card_config_controls simple">
        {!isFirst ? (
          <button className="cc_btn cc_btn--ghost" onClick={gotoPrev}>
            <ChevronLeft size={16} />
            <span>Geri</span>
          </button>
        ) : (
          <span />
        )}

        {/* Son adımda “Ödemeye Geç”, diğerlerinde “Devam” */}
        <button
          className={`cc_btn ${isLast ? "cc_btn--pay" : "cc_btn--primary"}`}
          onClick={gotoNextOrPay}
        >
          {isLast ? (
            <>
              <CreditCard size={16} />
              <span>Ödemeye Geç</span>
            </>
          ) : (
            <>
              <span>Devam</span>
              <ChevronRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CardConfig;
