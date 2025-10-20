import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./accordion.scss";

export default function LayoutAccordion({
  item,
  isOpen,
  onToggle,
  setCards,
  id,            // kart id
  headerTitle,   // LayoutTab’den hesaplanan label
  selectedType
}) {
  // type güncelle
  const handleLayout = (type) => {
    if (!type) return;
    setCards((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, layout: { ...(c.layout ?? {}), type } }
          : c
      )
    );
  };

  // color güncelle
  const handleColor = (color) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, layout: { ...(c.layout ?? {}), color } }
          : c
      )
    );
  };

  // name/title güncelle (controlled)
  const handleFieldChange = (e) => {
    const { name, value } = e.target; // "name" | "title"
    setCards((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, layout: { ...(c.layout ?? {}), [name]: value } }
          : c
      )
    );
  };

  const selectedItem = item?.layout;
  const cardTone = (item?.card?.name || "").toLowerCase() || "default";

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
              {/* layout tipleri */}
              <div className="layout_wrapper">
                <div className="layout_container" onClick={() => handleLayout("classic")}>
                  <div className={`layout_item classic ${selectedItem?.type === "classic" ? "active" : ""}`} />
                  <span className="layout_text">Klasik</span>
                </div>
                <div className="layout_container" onClick={() => handleLayout("modern")}>
                  <div className={`layout_item modern ${selectedItem?.type === "modern" ? "active" : ""}`} />
                  <span className="layout_text">Modern</span>
                </div>
              </div>

              {/* renkler */}
              <div className="layout_colors">
                <button
                  type="button"
                  className={`layout_color_item white ${selectedItem?.color === "white" ? "active" : ""}`}
                  onClick={() => handleColor("white")}
                  aria-label="White color"
                />
                <button
                  type="button"
                  className={`layout_color_item black ${selectedItem?.color === "black" ? "active" : ""}`}
                  onClick={() => handleColor("black")}
                  aria-label="Black color"
                />
                <button
                  type="button"
                  className={`layout_color_item gold ${selectedItem?.color === "gold" ? "active" : ""}`}
                  onClick={() => handleColor("gold")}
                  aria-label="Gold color"
                />
              </div>

              {/* ---- Underline floating inputs (controlled) ---- */}
              {
                selectedType !== "teams" && <>
                <div className="mui-field">
                  <input
                    type="text"
                    id={`fullName-${id}`}
                    className="mui-input"
                    placeholder=" "
                    name="name"
                    value={item?.layout?.name ?? ""}
                    onChange={handleFieldChange}
                  />
                  <label htmlFor={`fullName-${id}`} className="mui-label">
                    Ad Soyad
                  </label>
                  <span className="mui-line"></span>
                </div>
                {
                  item?.layout?.type === "classic" && <div className="mui-field">
                  <input
                    type="text"
                    id={`title-${id}`}
                    className="mui-input"
                    placeholder=" "
                    name="title"
                    value={item?.layout?.title ?? ""}
                      onChange={handleFieldChange}
                  />
                  <label htmlFor={`title-${id}`} className="mui-label">
                    Unvan | Şirket
                  </label>
                  <span className="mui-line"></span>
                </div>
                }
                </>
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}







