import { Link } from "react-router-dom";
import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div>
          <Link to="/" className="brand">ICEEIT</Link>
          <p>Contemporary streetwear with a cold, unmistakable identity.</p>
        </div>
        <div className="footer__links">
          <div><span>Explore</span><Link to="/shop">Shop</Link><Link to="/collections">Collections</Link><Link to="/about">About</Link></div>
          <div><span>Help</span><Link to="/faq">FAQ</Link><Link to="/contact">Contact</Link><Link to="/cart">Cart</Link></div>
          <div><span>Social</span><a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={site.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href={`mailto:${site.email}`}>Email</a></div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} ICEEIT. All rights reserved.</span>
        <span>{site.footer}</span>
      </div>
    </footer>
  );
}
