import React from "react";
import "./footer.scss";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";
import logo from "../../assets/images/kavio_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & Brand */}
        <div className="footer-logo">
            <img src={logo} alt=""/>
        </div>

        {/* Menu Links */}
        <ul className="footer-links">
          <li>Homepage</li>
          <li>Products</li>
          <li>Services</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>

        {/* Social Icons */}
        <div className="footer-socials">
          <a href="#"><Facebook size={20} /></a>
          <a href="#"><X size={20} /></a>
          <a href="#"><Instagram size={20} /></a>
          <a href="#"><Linkedin size={20} /></a>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          © {currentYear} <strong>Kavio</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
