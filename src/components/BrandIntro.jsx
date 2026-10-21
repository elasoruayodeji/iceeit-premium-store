/*
  ICEEIT V3 — Brand Introduction.
  Asymmetric editorial split: oversized statement type on the left,
  offset campaign photography on the right with a slow reveal.
  Communicates the streetwear identity without inventing brand history.
*/
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export function BrandIntro() {
  const reduced = useReducedMotion();

  return (
    <section className="v3-brand" aria-labelledby="v3-brand-title">
      <div className="v3-brand__text">
        <p className="eyebrow">The brand</p>
        <h2 id="v3-brand-title" className="v3-brand__title">
          Born in Lagos.
          <br />
          <span>Built for the cold.</span>
        </h2>
        <p className="v3-brand__copy">
          ICEEIT is a streetwear label designing bold, considered clothing in
          Lagos for wearers across Nigeria. Strong silhouettes, monogram
          details and a visual identity that never needs to shout — every
          piece is made to be rotated, layered and lived in.
        </p>
        <ul className="v3-brand__facts" aria-label="Brand facts">
          <li><strong>Lagos</strong><span>Designed &amp; developed</span></li>
          <li><strong>Nigeria</strong><span>Orders &amp; delivery nationwide</span></li>
          <li><strong>FW25</strong><span>Current collection</span></li>
        </ul>
      </div>

      <motion.div
        className="v3-brand__media"
        initial={reduced ? false : { opacity: 0, y: 48 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <img
          src="https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto,w_1200/v1790871127/jacket-front.jpg"
          alt="ICEEIT model wearing the Cosmic Splatter outerwear jacket, front view"
          width="1200"
          height="1500"
          loading="lazy"
          decoding="async"
        />
        <span className="v3-brand__tag">Cosmic Splatter · Outerwear</span>
      </motion.div>
    </section>
  );
}
