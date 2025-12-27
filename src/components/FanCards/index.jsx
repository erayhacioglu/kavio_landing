import React from "react";
import { motion } from "framer-motion";
import "./fan_cards.scss";

import blackCard from "../../assets/images/black_card.png";
import silverCard from "../../assets/images/silver_card.png";
import roseCard from "../../assets/images/rose_card.png";

export default function FanCards() {
  const isMobile = window.innerWidth <= 576;
  const isTablet = window.innerWidth <= 992 && window.innerWidth > 576;

  const config = isMobile
    ? { rotation: [-10, 0, 10], x: [-60, 0, 60], y: [0, -8, 0] }
    : isTablet
    ? { rotation: [-15, 0, 15], x: [-90, 0, 90], y: [0, -10, 0] }
    : { rotation: [-20, 0, 20], x: [-120, 0, 120], y: [0, -15, 0] };

  const cards = [
    { src: roseCard, z: 1 },
    { src: blackCard, z: 3 },
    { src: silverCard, z: 2 },
  ];

  return (
    <div className="fan-wrapper">
      <div className="fan-stack">
        {cards.map((card, i) => (
          <motion.img
            key={i}
            src={card.src}
            alt={`card-${i}`}
            className="card"
            style={{ zIndex: card.z }}
            initial={{ rotate: 0, x: 0, y: 0, opacity: i === 1 ? 1 : 0 }}
            animate={{
              rotate: config.rotation[i],
              x: config.x[i],
              y: config.y[i],
              opacity: 1,
            }}
            transition={{
              delay: i * 0.2,
              type: "spring",
              stiffness: 80,
              damping: 12,
            }}
          />
        ))}
      </div>
    </div>
  );
}
