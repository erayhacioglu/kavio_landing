import React from "react";
import "./world_section.scss";
import worldMap from "../../assets/images/world_map.png"; // harita görselini buraya koy

const WorldSection = () => {
  return (
    <div className="container">
        <section className="world-section">
      <div className="world-container">
        {/* Sol metin */}
        <div className="world-left">
          {/* <h1>
            One Card.
            <br />
            Infinite Connections.
            <br />
            Worldwide.
          </h1> */}
          <h1>
            Sınırların
            <br />
            ötesinde
            <br />
            bir kimlik
          </h1>
          <p className="world-desc">
          Kavio, insanları ve markaları tek dokunuşla birbirine bağlar.
            <br />
            Her bağlantı bir veri, her veri bir fırsattır.
          </p>
        </div>

        {/* Sağ harita */}
        <div className="world-right">
          <img src={worldMap} alt="World Map" className="world-map" />
        </div>
      </div>

      {/* Alt metin alanı */}
      <div className="world-bottom">
        <h2>Profesyonel Ağını Büyüt</h2>
        <p>
        Nerede olursan ol, dijital kimliğini paylaş, etkileşimlerini ölç
        </p>
        <h3>Bağlantı kurmak artık bir deneyim</h3>
      </div>
    </section>
    </div>
  );
};

export default WorldSection;
