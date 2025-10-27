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
              <span>Dijital</span> kimliğin en şık hali. Kavio ile <span>temas</span> bir deneyime dönüşür.
            </h1>
            <p>
            Dijital kartvizitin ötesinde: kişisel markan, etkileşimin ve performansın tek bir yerde.
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
