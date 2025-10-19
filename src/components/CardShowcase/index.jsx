import React, { useRef } from "react";
import "./card_showcase.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import blackCard from "../../assets/images/black_card.png";
import goldCard from "../../assets/images/gold_card.png";
import greenCard from "../../assets/images/green_card.png";

const CardShowcase = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const cards = [blackCard, goldCard, greenCard];

  return (
    <section className="card-showcase-section">
      <div className="card-showcase-header">
        <h2>Choose Your Card.</h2>
        <p>Design your NFC card that truly reflects you.</p>
      </div>

      <div className="card-showcase-slider">
        {/* Butonlar */}
        <button className="nav-btn prev" ref={prevRef}>
          <ChevronLeft size={24} />
        </button>
        <button className="nav-btn next" ref={nextRef}>
          <ChevronRight size={24} />
        </button>

        {/* SWIPER */}
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          slidesPerView={1.3}
          spaceBetween={60}
          onSwiper={(swiper) => {
            // navigation ref’leri DOM’a bağlandıktan sonra swiper’a ekleniyor
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="card-swiper"
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i} className="slide">
              <div className="card-wrapper">
                <div className="card-frame">
                  <img src={card} alt={`card-${i}`} className="card-img" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CardShowcase;
