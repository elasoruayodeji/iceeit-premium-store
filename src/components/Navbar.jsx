import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import { SearchOverlay } from "./SearchOverlay";
import { useCart } from "../context/CartContext";
import { site } from "../data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, setDrawerOpen } = useCart();

  return (
    <>
      <div className="announcement">{site.announcement}</div>
      <header className="navbar">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>ICEEIT</Link>

        <nav className="navbar__desktop" aria-label="Primary navigation">
          {site.nav.map((item) => (
            <motion.div key={item.to} whileHover={{ y: -2 }} transition={{ duration: .18 }}>
              <NavLink to={item.to}>{item.label}</NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="navbar__actions">
          <motion.button
            className="icon-button desktop-only"
            aria-label="Search"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: .94 }}
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon size={19} />
          </motion.button>

          <motion.button
            className="bag-button"
            aria-label="Open cart"
            onClick={() => setDrawerOpen(true)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: .94 }}
          >
            <BagIcon size={20} />
            <span>{itemCount}</span>
          </motion.button>

          <motion.button
            className="icon-button mobile-only"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            whileTap={{ scale: .92 }}
          >
            <MenuIcon />
          </motion.button>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="mobile-menu__panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: .38, ease: [.22, 1, .36, 1] }}
            >
              <div className="mobile-menu__top">
                <span className="brand">ICEEIT</span>
                <motion.button className="icon-button" onClick={() => setOpen(false)} aria-label="Close menu" whileTap={{ scale: .9 }}>
                  <CloseIcon />
                </motion.button>
              </div>
              <nav>
                {site.nav.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: .07 * i, duration: .42, ease: [.22, 1, .36, 1] }}
                  >
                    <Link to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>
                  </motion.div>
                ))}
              </nav>
              <p className="mobile-menu__note">Contemporary pieces. Built for your rotation.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}