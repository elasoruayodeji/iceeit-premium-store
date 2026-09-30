import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon, SearchIcon } from "./Icons";
import { products } from "../data/products";

// Inline price formatter — no external util needed
function formatPrice(n) {
  return "₦" + n.toLocaleString("en-NG");
}

export function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const q = query.trim().toLowerCase();
  const results = q
    ? products.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
      ).slice(0, 8)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="search-overlay__panel"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-overlay__bar">
              <SearchIcon size={18} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for a piece…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={onClose} aria-label="Close search">
                <CloseIcon />
              </button>
            </div>

            {q && (
              <div className="search-overlay__results">
                {results.length === 0 ? (
                  <p className="search-overlay__empty">No pieces match "{query}".</p>
                ) : (
                  results.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      className="search-result"
                      onClick={onClose}
                    >
                      <div className="search-result__media">
                        {p.image?.endsWith(".mp4") ? (
                          <video src={p.image} muted playsInline loop autoPlay />
                        ) : (
                          <img src={p.image} alt={p.name} />
                        )}
                      </div>
                      <div className="search-result__info">
                        <span>{p.name}</span>
                        <small>{p.category}</small>
                      </div>
                      <strong>{formatPrice(p.price)}</strong>
                    </Link>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}