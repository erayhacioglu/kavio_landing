import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./accordion.scss";

const swatchColor = (value) => {
  if (!value) return "#E5E7EB";

  if (value.includes("SIYAH")) return "#262626";
  if (value.includes("BEYAZ")) return "#E5E7EB";
  if (value.includes("MAVI")) return "#2563EB";
  if (value.includes("YESIL")) return "#16A34A";
  if (value.includes("MOR")) return "#7C3AED";
  if (value.includes("SEFFAF")) return "#CBD5E1";
  if (value.includes("GOLD")) return "#D4AF37";
  if (value.includes("GUMUS") || value.includes("SILVER")) return "#9CA3AF";
  if (value.includes("ROSE")) return "#F43F5E";

  return "#E5E7EB";
};

const getContrastText = (bg) => {
  if (!bg) return "#111827";

  const c = bg.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#111827" : "#FFFFFF";
};


export default function LogoAccordion({
  item, // card object (item + userInfo)
  isOpen,
  onToggle,
  setCards,
  id, // item.id
  headerTitle,
}) {
  /* -----------------------------
     LOGO CHANGE
  ----------------------------- */
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCards((prev) =>
      prev.map((c) =>
        c.item.id === id
          ? {
              ...c,
              item: {
                ...c.item,
                logo: {
                  ...(c.item.logo ?? {}),
                  img: file,
                },
              },
            }
          : c
      )
    );

    // aynı dosya tekrar seçilebilsin
    e.target.value = "";
  };

  /* -----------------------------
     CLASS (PRODUCT ÜZERİNDEN)
  ----------------------------- */
  const nameClass = (item?.item?.product || "").toLowerCase() || "default";

  return (
    <div className={`acc_item ${isOpen ? "is-open" : ""}`} data-id={id}>
      {/* HEADER */}
      <button className="acc_header" onClick={onToggle} aria-expanded={isOpen}>
        <span className="acc_title">{headerTitle ?? "Kart Tipi Seçiniz"}</span>
        <ChevronDown size={18} className={`acc_caret ${isOpen ? "rot" : ""}`} />
      </button>

      {/* PANEL */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="acc_panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 0.7, 0.2, 1],
            }}
          >
            <div className="acc_inner">
              {/* MINI CARD */}
              <div
                className={`mini_card`}
                style={{
    background: swatchColor(item?.item?.product),
    color: getContrastText(
      swatchColor(item?.item?.product)
    ),
  }}
              >
                {item?.item?.logo?.img ? (
                  <img
                    src={URL.createObjectURL(item.item.logo.img)}
                    alt="logo"
                    className="mini_card_img"
                  />
                ) : (
                  <span className="mini_brand">KAVIO</span>
                )}
              </div>

              {/* UPLOAD */}
              <label htmlFor={`logo-upload-${id}`} className="upload_file">
                <input
                  type="file"
                  id={`logo-upload-${id}`}
                  className="d-none"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                <span className="upload_file_text text-center">
                  {item?.item?.logo?.img
                    ? item.item.logo.img.name
                    : "Logo Yükle"}
                </span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
