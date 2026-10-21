/*
  ICEEIT V3 — Closing Brand Statement.
  Full-bleed cinematic finish: darkened monogram denim campaign image,
  oversized statement type and a working Shop CTA that anchors the page.
*/
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const EASE = [0.22, 1, 0.36, 1];

export function ClosingStatement() {
  const reduced = useReducedMotion();

  return (
    <section className="v3-closing" aria-labelledby="v3-closing-title">
      <img
        className="v3-closing__bg"
        src="https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto,w_1600/v1790871124/monogram-denim-coord.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width="1600"
        height="2000"
      />
      <div className="v3-closing__scrim" aria-hidden="true" />

      <motion.div
        className="v3-closing__inner"
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="eyebrow">ICEEIT · Lagos · Nigeria</p>
        <h2 id="v3-closing-title" className="v3-closing__title">
          The cold never
          <br />
          <span>went out of style.</span>
        </h2>
        <p className="v3-closing__copy">
          Jackets, tops, joggers and co-ord sets — designed in Lagos, worn
          everywhere. Your next rotation starts here.
        </p>
        <Link to="/shop" className="v3-hero__cta">
          Shop all pieces →
        </Link>
      </motion.div>
    </section>
  );
}
