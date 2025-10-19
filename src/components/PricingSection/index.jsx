import React from "react";
import "./pricing_section.scss";
import { useNavigate } from "react-router";

const PricingSection = () => {
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    navigate(`/card-builder?type=${url}`);
  }

  return (
    <section className="pricing-section">
      <div className="pricing-header">
        <h2>Choose the Plan That Fits You</h2>
        <p>
          Whether you're an individual looking to connect or a company managing your network,
          Kavio has the right plan for you.
        </p>
      </div>

      <div className="pricing-cards">
        {/* Bireysel */}
        <div className="pricing-card personal">
          <h3>Bireysel</h3>
          <p className="price">
            <span>₺</span>99<span className="period">/ay</span>
          </p>
          <ul>
            <li>1 NFC dijital kart</li>
            <li>Kişisel profil sayfası</li>
            <li>Sınırsız bağlantı paylaşımı</li>
            <li>Temel istatistik takibi</li>
            <li>E-posta desteği</li>
          </ul>
          <button className="btn" onClick={() => handleNavigate("individual")}>Başla</button>
        </div>

        {/* Kurumsal */}
        <div className="pricing-card corporate">
          <div className="badge">Popüler</div>
          <h3>Kurumsal</h3>
          <p className="price">
            <span>₺</span>399<span className="period">/ay</span>
          </p>
          <ul>
            <li>10+ çalışan kartı yönetimi</li>
            <li>Kurumsal panel erişimi</li>
            <li>Gelişmiş istatistik ve raporlama</li>
            <li>Logo ve marka özelleştirmesi</li>
            <li>Öncelikli destek</li>
          </ul>
          <button className="btn btn-primary" onClick={() => handleNavigate("company")}>Kurumsal Başvur</button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
