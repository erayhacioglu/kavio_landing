import { useSearchParams } from "react-router";
import "./card_builder.scss";
import CardPreview from "./components/CardPreview";
import CardConfig from "./components/CardConfig";
import { useState } from "react";

const CardBuilder = () => {
  const [cardFace, setCardFace] = useState("front");
  const [cardTab, setCardTab] = useState("card");
  const [selectedCard, setSelectedCard] = useState(1);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [selectedType] = useState(type ?? "personel");

  console.log('selectedType', selectedType)
  const [cards, setCards] = useState([
    {
      id: 1,
      card: { name: "black", count: 1 },
      logo: { img: null },
      layout: {
        type: "classic",
        color: "white",
        name: null,
        title: null,
      },
    },
  ]);

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
        />
      </div>
    </div>
  );
};

export default CardBuilder;
