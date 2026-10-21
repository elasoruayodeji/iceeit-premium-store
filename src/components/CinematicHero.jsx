/*
  ICEEIT V3 — Cinematic Hero.

  Full-bleed campaign media (existing Cloudinary hero.jpg) with a slow
  cinematic Ken-Burns drift, oversized "WEAR THE COLD" display type,
  restrained ice-blue accent rule, and a working Shop CTA.

  - The hero image is the LCP element: it is NOT lazy-loaded and is
    preloaded via <link rel="preload"> in index.html.
  - Parallax is subtle and disabled under prefers-reduced-motion.
  - All copy lives in real DOM text (visible without JS animation).
*/
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRightIcon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1];
const HERO_SRC =
  "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto,w_1600/v1790871129/hero.jpg";

export function CinematicHero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section className="v3-hero" ref={ref} aria-label="ICEEIT campaign">
      <motion.div
        className="v3-hero__media"
        style={reduced ? undefined : { y: mediaY, scale: mediaScale }}
      >
        <img
          src={HERO_SRC}
          alt="ICEEIT streetwear campaign model wearing the FW25 collection in Lagos"
          width="1600"
          height="2000"
          fetchPriority="high"
          decoding="async"
        />
        <div className="v3-hero__scrim" aria-hidden="true" />
      </motion.div>

      <div className="v3-hero__frame" aria-hidden="true" />

      <motion.div
        className="v3-hero__copy"
        style={reduced ? undefined : { opacity: copyOpacity }}
      >
        <p className="eyebrow v3-hero__eyebrow">
          ICEEIT · Lagos, Nigeria · Streetwear
        </p>

        <h1 className="v3-hero__title">
          <span className="v3-hero__line">Wear</span>
          <span className="v3-hero__line v3-hero__line--ghost">the</span>
          <span className="v3-hero__line v3-hero__line--accent">Cold</span>
        </h1>

        <p className="v3-hero__intro">
          A clothing brand from Lagos built on cold silhouettes and quiet
          confidence — jackets, tops, joggers and co-ord sets made to be worn
          your way, across Nigeria.
        </p>

        <div className="v3-hero__actions">
          <Link to="/shop" className="v3-hero__cta">
            Shop the collection <ArrowRightIcon size={17} />
          </Link>
          <Link to="/collections" className="v3-hero__secondary">
            View lookbook
          </Link>
        </div>
      </motion.div>

      <p className="v3-hero__marquee" aria-hidden="true">
        WEAR THE COLD — WEAR THE COLD — WEAR THE COLD — WEAR THE COLD — WEAR
        THE COLD — WEAR THE COLD —
      </p>
    </section>
  );
}
