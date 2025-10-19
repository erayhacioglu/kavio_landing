import { useState, useEffect } from "react";
import "./header.scss";
import logoImg from "../../assets/images/kavio_logo.png";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  // scroll disable
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
    }, 250); // kapanış animasyonu süresi
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      closeMenu();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header_container">
          {/* Sağdaki logo */}
          <div className="logo">
            <img src={logoImg} alt="KAVIO Logo" className="logo_img" />
          </div>

          {/* Sol tarafta menü ve actions */}
          <nav className="navbar">
            <div className="menu">
              <Link to="/" className="menu_link">
                Anasayfa
              </Link>

              <Link to="/urunler" className="menu_link">
                Ürünler
              </Link>
            </div>
            <div className="menu_actions">
              <Link to="/iletisim" className="menu_action_link">
                İletişim
              </Link>
              <button className="menu_action_button">Giriş Yap</button>
            </div>
          </nav>

          {/* Mobile menü butonu */}
          <button
            className="menu_toggle"
            onClick={() => setIsOpen(true)}
            aria-label="menu"
          >
            <Menu size={30} />
          </button>
        </div>
      </div>

      {/* Mobil menü (sağdan kayan) */}
      {(isOpen || closing) && (
        <div
          className={`backdrop ${closing ? "fadeOut" : ""}`}
          onClick={handleBackdropClick}
        >
          <div className={`mobile_menu ${closing ? "slideOut" : "slideIn"}`}>
            <button className="close_btn" onClick={closeMenu}>
              <X size={24} />
            </button>

            <ul className="mobile_menu_list">
              <li>
                <Link to="/" onClick={closeMenu}>
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link to="/urunler" onClick={closeMenu}>
                  Ürünler
                </Link>
              </li>
              <li>
                <Link to="/iletisim" onClick={closeMenu}>
                  İletişim
                </Link>
              </li>
            </ul>

            <button className="menu_action_button">Giriş Yap</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
