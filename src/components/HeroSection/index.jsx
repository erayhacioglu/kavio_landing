import React from "react";
import "./hero_section.scss";
import FanCards from "../FanCards";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-container">
          <div className="hero-left">
            <h1>
              <span>Fikirlerinizi</span> bizimle dijital başarıya dönüştürün!
            </h1>
            <p>
              İşletmenizin her aşamasında ürün tasarımı, web sitesi oluşturma ve
              markalaşma konusunda ortağınızız.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Hizmetler</button>
              <button className="btn btn-outline">İşlerimiz</button>
            </div>
          </div>

          <div className="hero-right">
            <FanCards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
