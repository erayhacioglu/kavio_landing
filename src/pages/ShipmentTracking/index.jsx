import { useState } from "react";
import "./shipment_tracking.scss";
import {
  FaSearch,
  FaTruck,
  FaBoxOpen,
  FaCheck,
  FaWarehouse,
  FaArrowRight,
} from "react-icons/fa";

const MOCK_DATA = {
  trackingNo: "TR-123456789",
  updatedAt: "2 saat önce",
  timeline: [
    { label: "Sipariş Alındı", time: "10 Ekim, 09:30", done: true },
    { label: "Hazırlanıyor", time: "10 Ekim, 14:15", done: true },
    { label: "Yola Çıktı", time: "Bugün, 08:45", active: true },
    { label: "Teslim Edildi", time: "-", disabled: true },
  ],
  eta: "12 Ekim 2023",
  company: "Aras Kargo",
  location: "İstanbul Transfer Merkezi",
};

export default function ShipmentTracking() {
  const [value, setValue] = useState("");
  const [state, setState] = useState("idle");

  const handleSearch = () => {
    if (!value) return;
    setState("loading");
    setTimeout(() => {
      value === MOCK_DATA.trackingNo
        ? setState("success")
        : setState("notfound");
    }, 1200);
  };

  return (
    <div className="shipment-page">
      <header className="tracking-header">
        <h1>Kargonuz Nerede?</h1>
        <p>
          Siparişinizin güncel durumunu anında öğrenmek için takip numaranızı
          girin.
        </p>

        <div className="tracking-search">
          <FaSearch />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="TR-123456789"
          />
          <button onClick={handleSearch}>Sorgula</button>
        </div>
      </header>

      {state === "loading" && <Skeleton />}

      {state === "notfound" && (
        <div className="empty-state">
          <h3>Kayıt Bulunamadı</h3>
          <p>Bu takip numarasına ait bir gönderi bulunamadı.</p>
        </div>
      )}

      {state === "success" && <Result data={MOCK_DATA} />}
    </div>
  );
}

/* ================= COMPONENTS ================= */

const Result = ({ data }) => (
  <div className="tracking-card">
    <div className="card-top">
      <div className="status">
        <div className="status-icon">
          <FaTruck />
        </div>
        <div>
          <h3>Yola Çıktı</h3>
          <span>Son güncelleme: {data.updatedAt}</span>
        </div>
      </div>

      <a href="#" className="external-link">
        Kargo Şirketi Takip Sayfasına Git <FaArrowRight />
      </a>
    </div>

    {/* TIMELINE */}
    <div className="timeline">
      {data.timeline.map((step, i) => (
        <div
          key={i}
          className={`step ${step.done ? "done" : ""} ${
            step.active ? "active" : ""
          } ${step.disabled ? "disabled" : ""}`}
          data-index={i}
          data-total={data.timeline.length}
        >
          <div className="step-icon">
            {step.done && <FaCheck />}
            {step.active && <FaTruck />}
            {step.disabled && <FaWarehouse />}
          </div>

          <span>{step.label}</span>
          <small>{step.time}</small>
        </div>
      ))}
    </div>

    <div className="card-info">
      <div className="highlight">
        <label>Tahmini Teslimat</label>
        <strong>{data.eta}</strong>
      </div>
      <div>
        <label>Kargo Firması</label>
        <strong>{data.company}</strong>
      </div>
      <div>
        <label>Son Konum</label>
        <strong>{data.location}</strong>
      </div>
    </div>
  </div>
);



const Skeleton = () => (
  <div className="tracking-card skeleton">
    <div className="line lg" />
    <div className="line sm" />
    <div className="row">
      <div className="box" />
      <div className="box" />
      <div className="box" />
    </div>
  </div>
);