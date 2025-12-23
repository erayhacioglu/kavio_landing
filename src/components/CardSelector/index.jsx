import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "./card_selector.scss";

import blackCard from "../../assets/images/cards/black.png";
import whiteCard from "../../assets/images/cards/white.png";
import silverCard from "../../assets/images/cards/silver.png";

const cardData = [
  { id: 1, name: "KAVIO Black Card", img: blackCard, type: "black" },
  { id: 2, name: "KAVIO White Card", img: whiteCard, type: "white" },
  { id: 3, name: "KAVIO Silver Card", img: silverCard, type: "silver" },
  { id: 4, name: "KAVIO Black Card", img: blackCard, type: "black" },
  { id: 5, name: "KAVIO White Card", img: whiteCard, type: "white" },
  { id: 6, name: "KAVIO Silver Card", img: silverCard, type: "silver" },
];

const CardSelector = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="card_selector_section">
      <div className="card_selector_header">
        <h2>Choose Your Card.</h2>
        <p>Design your NFC card that truly reflects you.</p>
      </div>

      <div className="card_selector_wrapper">
        {/* --- Navigation Buttons --- */}
        <button ref={prevRef} className="nav-button prev">
          <ChevronLeft size={24} />
        </button>
        <button ref={nextRef} className="nav-button next">
          <ChevronRight size={24} />
        </button>

        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={30}
          loop={false}
          centeredSlides={false}
          allowTouchMove={true}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          onInit={(swiper) => {
            // Buton referanslarını Swiper’a bağla
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {cardData.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="card_item">
                <img src={card.img} alt={card.name} />
                <p>{card.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CardSelector;
