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
          <h1>
            One Card.
            <br />
            Infinite Connections.
            <br />
            Worldwide.
          </h1>
          <p className="world-desc">
            Kavio brings people and businesses together,
            <br />
            transcending borders with a single tap.
          </p>
        </div>

        {/* Sağ harita */}
        <div className="world-right">
          <img src={worldMap} alt="World Map" className="world-map" />
        </div>
      </div>

      {/* Alt metin alanı */}
      <div className="world-bottom">
        <h2>Master Your Inventory with Advanced Tools</h2>
        <p>
          Optimize your operations with cutting-edge tools for real-time tracking,
          automated expiration alerts, and seamless point-of-sale integration.
        </p>
        <h3>Empower Your Business with These Benefits</h3>
      </div>
    </section>
    </div>
  );
};

export default WorldSection;
