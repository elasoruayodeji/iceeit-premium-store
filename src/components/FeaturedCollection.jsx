/*
  ICEEIT V3 — Featured Collection.
  Cinematic poster-style showcase of real featured products from
  src/data/products.js. The lead product gets a tall full-bleed tile;
  the rest sit in an offset grid. Links go to real /product/:id routes.
*/
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { products, formatNaira } from "../data/products";
import { ArrowUpRightIcon } from "./Icons";

const EASE = [0.22, 1, 0.36, 1];

export function FeaturedCollection() {
  const reduced = useReducedMotion();
  const featured = products.filter((p) => p.featured);
  const [lead, ...rest] = featured;

  const tile = (p, i, large = false) => (
    <motion.article
      key={p.id}
      className={`v3-feature__tile ${large ? "v3-feature__tile--lead" : ""}`}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: reduced ? 0 : i * 0.08, ease: EASE }}
    >
      <Link to={`/product/${p.id}`} aria-label={`View ${p.name}`}>
        {p.image ? (
          <img
            src={p.image}
            alt={`${p.name} — ICEEIT ${p.category.toLowerCase()} piece`}
            loading="lazy"
            decoding="async"
            width="900"
            height="1125"
          />
        ) : (
          <video
            src={`${p.video}#t=0.1`}
            muted
            playsInline
            preload="metadata"
            aria-label={`${p.name} video`}
          />
        )}
        <div className="v3-feature__overlay">
          <p className="eyebrow">{p.category}</p>
          <h3>{p.name}</h3>
          <span className="v3-feature__price">
            {formatNaira(p.price)} <ArrowUpRightIcon size={15} />
          </span>
        </div>
      </Link>
    </motion.article>
  );

  return (
    <section className="v3-feature" aria-labelledby="v3-feature-title">
      <header className="v3-feature__head">
        <div>
          <p className="eyebrow">Featured collection</p>
          <h2 id="v3-feature-title">The FW25 edit.</h2>
        </div>
        <Link to="/shop" className="text-link">
          Shop all pieces <ArrowUpRightIcon size={15} />
        </Link>
      </header>

      <div className="v3-feature__grid">
        {lead && tile(lead, 0, true)}
        {rest.slice(0, 4).map((p, i) => tile(p, i + 1))}
      </div>
    </section>
  );
}
