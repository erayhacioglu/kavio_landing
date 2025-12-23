import { useSearchParams } from "react-router";
import "./card_builder.scss";
import CardPreview from "./components/CardPreview";
import CardConfig from "./components/CardConfig";
import { useEffect, useState } from "react";
import Axios from "../../services/Axios";

const CardBuilder = () => {
  const [cardFace, setCardFace] = useState("front");
  const [cardTab, setCardTab] = useState("card");
  const [selectedCard, setSelectedCard] = useState(1);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [selectedType] = useState(type ?? "individual");

  const [cardData, setCardData] = useState([]);


  const [cards, setCards] = useState([
    {
      item: {
        id: 1,
        product: "SIYAH_PVC_KART",
        amount: 100,
        quantity: 1,
        layout: "BOTTOM_LEFT_TWO_LINE_NAME_TITLE_GOLD",
        logo: "",
      },
      userInfo: {
        name: "Eray",
        surname: "Hacıoğlu",
        title: null,
      },
    },
  ]);

  // Label formatlama (PVC_KART → Pvc Kart)
  const formatLabel = (str) =>
    str
      .toLowerCase()
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Geçici price üretici (istersen kaldırabiliriz)
  const generatePrice = (i) => 100 + i * 20;

  const [enumsLoading, setEnumsLoading] = useState(false);
  const [cardNames, setCardNames] = useState([]);
  const [cardLayouts, setCardLayouts] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);

  const getEnums = async () => {
    try {
      setEnumsLoading(true);
      const [cardNamesRes, cardLayoutRes, orderStatusesRes] = await Promise.all(
        [
          Axios.get("/enums/card-names"),
          Axios.get("/enums/card-layouts"),
          Axios.get("/enums/order-statuses"),
        ]
      );
      if (cardNamesRes?.data) {
        setCardNames(cardNamesRes?.data);
        const formatted = cardNamesRes?.data.map((item, index) => ({
          value: item,
          label: formatLabel(item),
          price: generatePrice(index),
        }));
        setCardData(formatted);
      }
      if (cardLayoutRes?.data) {
        setCardLayouts(cardLayoutRes?.data);
      }
      if (orderStatusesRes?.data) {
        setOrderStatuses(orderStatusesRes?.data);
      }
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setEnumsLoading(false);
    }
  };

  useEffect(() => {
    getEnums();
  }, []);

  console.log("cards", cards);

  return (
    <div className="container my-5">
      <div className="card_builder">
        <CardPreview
          cards={cards}
          cardFace={cardFace}
          setCardFace={setCardFace}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          cardData={cardData}
        />
        <CardConfig
          cardTab={cardTab}
          setCardTab={setCardTab}
          setCardFace={setCardFace}
          cards={cards}
          setCards={setCards}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          selectedType={selectedType}
          cardData={cardData}
        />
      </div>
    </div>
  );
};

export default CardBuilder;
