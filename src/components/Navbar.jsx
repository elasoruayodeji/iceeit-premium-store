import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import { useCart } from "../context/CartContext";
import { site } from "../data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount, setDrawerOpen } = useCart();

  return (
    <>
      <div className="announcement">{site.announcement}</div>
      <header className="navbar">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>ICEEIT</Link>

        <nav className="navbar__desktop">
          {site.nav.map((item) => (
            <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button className="icon-button desktop-only" aria-label="Search"><SearchIcon size={19}/></button>
          <button className="bag-button" aria-label="Open cart" onClick={() => setDrawerOpen(true)}>
            <BagIcon size={20}/><span>{itemCount}</span>
          </button>
          <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setOpen(true)}><MenuIcon/></button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="mobile-menu__panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3 }}>
              <div className="mobile-menu__top">
                <span className="brand">ICEEIT</span>
                <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close menu"><CloseIcon/></button>
              </div>
              <nav>
                {site.nav.map((item, i) => (
                  <motion.div key={item.to} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i }}>
                    <Link to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>
                  </motion.div>
                ))}
              </nav>
              <p className="mobile-menu__note">Contemporary pieces. Cold identity. Built for your rotation.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
