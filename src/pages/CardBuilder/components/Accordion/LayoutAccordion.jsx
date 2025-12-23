import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./accordion.scss";

/* ===== ENUM HELPERS ===== */
const has = (type, token) => typeof type === "string" && type.includes(token);

const replace = (type, tokens, next) => {
  if (typeof type !== "string") return type;
  const current = tokens.find((t) => type.includes(t));
  if (!current || current === next) return type;
  return type.replace(current, next);
};

const LINE_ONE = "ONE_LINE_NAME";
const LINE_TWO = "TWO_LINE_NAME_TITLE";
const COLORS = ["BLACK", "WHITE", "GOLD"];

/** Ad Soyad -> {name, surname} (blur'da kullanacağız) */
const splitFullName = (full) => {
  const v = (full || "").trim().replace(/\s+/g, " ");
  if (!v) return { name: "", surname: "" };
  const parts = v.split(" ");
  if (parts.length === 1) return { name: parts[0], surname: "" };
  return { name: parts[0], surname: parts.slice(1).join(" ") };
};

export default function LayoutAccordion({
  item, // { item: {...}, userInfo: {...} }
  isOpen,
  onToggle,
  setCards,
  id, // item.id
  headerTitle,
  selectedType,
}) {
  const layoutStr = item?.item?.layout || "";
  const isTwoLine = has(layoutStr, "TWO_LINE") || has(layoutStr, "TWO");

  // ✅ INPUT BOZULMASIN DİYE: local state
  const initialFullName = `${item?.userInfo?.name ?? ""} ${item?.userInfo?.surname ?? ""}`.trim();
  const [fullNameDraft, setFullNameDraft] = useState(initialFullName);

  // kart değişince input da güncellensin
  useEffect(() => {
    setFullNameDraft(initialFullName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, item?.userInfo?.name, item?.userInfo?.surname]);

  /* ---- layout (ONE_LINE / TWO_LINE) ---- */
  const handleLayout = (lineToken) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c?.item?.id !== id) return c;
        return {
          ...c,
          item: {
            ...c.item,
            layout: replace(c?.item?.layout, [LINE_ONE, LINE_TWO], lineToken),
          },
        };
      })
    );
  };

  /* ---- color (BLACK / WHITE / GOLD) ---- */
  const handleColor = (color) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c?.item?.id !== id) return c;
        return {
          ...c,
          item: {
            ...c.item,
            layout: replace(c?.item?.layout, COLORS, color),
          },
        };
      })
    );
  };

  /* ---- input change ---- */
  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    // UI bozulmasın: name alanı local state ile akıcı yazılır
    if (name === "name") {
      setFullNameDraft(value);
      return;
    }

    if (name === "title") {
      setCards((prev) =>
        prev.map((c) =>
          c?.item?.id === id
            ? { ...c, userInfo: { ...c.userInfo, title: value } }
            : c
        )
      );
    }
  };

  /* ---- blur'da name/surname'e yaz ---- */
  const handleNameBlur = () => {
    const { name, surname } = splitFullName(fullNameDraft);
    setCards((prev) =>
      prev.map((c) =>
        c?.item?.id === id
          ? { ...c, userInfo: { ...c.userInfo, name, surname } }
          : c
      )
    );
  };

  return (
    <div className={`acc_item ${isOpen ? "is-open" : ""}`} data-id={id}>
      <button
        className="acc_header"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <span className="acc_title">{headerTitle}</span>
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
                <div className="layout_container" onClick={() => handleLayout(LINE_ONE)}>
                  <div className={`layout_item classic ${has(layoutStr, "ONE_LINE") ? "active" : ""}`} />
                  <span className="layout_text">Tek Satır</span>
                </div>

                <div className="layout_container" onClick={() => handleLayout(LINE_TWO)}>
                  <div className={`layout_item modern ${has(layoutStr, "TWO_LINE") ? "active" : ""}`} />
                  <span className="layout_text">Çift Satır</span>
                </div>
              </div>

              {/* renkler */}
              <div className="layout_colors">
                <button
                  type="button"
                  className={`layout_color_item white ${has(layoutStr, "WHITE") ? "active" : ""}`}
                  onClick={() => handleColor("WHITE")}
                />
                <button
                  type="button"
                  className={`layout_color_item black ${has(layoutStr, "BLACK") ? "active" : ""}`}
                  onClick={() => handleColor("BLACK")}
                />
                <button
                  type="button"
                  className={`layout_color_item gold ${has(layoutStr, "GOLD") ? "active" : ""}`}
                  onClick={() => handleColor("GOLD")}
                />
              </div>

              {/* inputs (UI aynı, sadece data path düzeldi) */}
              
              {selectedType !== "institutional" && (
  <>
    <div className="mui-field">
      <input
        type="text"
        id={`fullName-${id}`}
        className="mui-input"
        placeholder=" "
        name="name"
        value={fullNameDraft}
        onChange={handleFieldChange}
        onBlur={handleNameBlur}
      />
      <label htmlFor={`fullName-${id}`} className="mui-label">
        Ad Soyad
      </label>
      <span className="mui-line"></span>
    </div>

    {isTwoLine && (
      <div className="mui-field">
        <input
          type="text"
          id={`title-${id}`}
          className="mui-input"
          placeholder=" "
          name="title"
          value={item?.userInfo?.title ?? ""}
          onChange={handleFieldChange}
        />
        <label htmlFor={`title-${id}`} className="mui-label">
          Unvan | Şirket
        </label>
        <span className="mui-line"></span>
      </div>
    )}
  </>
)}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
