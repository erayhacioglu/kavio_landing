import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./accordion.scss";

export default function LogoAccordion({
  item,
  isOpen,
  onToggle,
  setCards,
  id,            // kart id
  headerTitle,   // LogoTab’den hesaplanan label
}) {
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCards((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, logo: { ...(c.logo ?? {}), img: file } } : c
      )
    );

    // aynı dosyayı tekrar seçince tetiklensin
    e.target.value = "";
  };

  const nameClass = (item?.card?.name || "").toLowerCase() || "default";

  return (
    <div className={`acc_item ${isOpen ? "is-open" : ""}`} data-id={id}>
      <button className="acc_header" onClick={onToggle} aria-expanded={isOpen}>
        <span className="acc_title">{headerTitle ?? "Kart Tipi Seçiniz"}</span>
        <ChevronDown size={18} className={`acc_caret ${isOpen ? "rot" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="acc_panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 0.7, 0.2, 1] }}
          >
            <div className="acc_inner">
              <div className={`mini_card ${nameClass}`}>
                {item?.logo?.img ? (
                  <img
                    src={URL.createObjectURL(item.logo.img)}
                    alt="logo"
                    className="mini_card_img"
                  />
                ) : (
                  <span className="mini_brand">KAVIO</span>
                )}
              </div>

              <label htmlFor={`logo-upload-${id}`} className="upload_file">
                <input
                  type="file"
                  id={`logo-upload-${id}`}
                  className="d-none"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                <span className="upload_file_text text-center">
                  {item?.logo?.img ? item.logo.img.name : "Logo Yükle"}
                </span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
