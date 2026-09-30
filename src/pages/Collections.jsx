import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { ProductGrid } from "../components/ProductGrid";
import { products } from "../data/products";
import { Reveal } from "../components/Motion";
import { Button } from "../components/Button";

const EASE = [0.22, 1, 0.36, 1];

export default function Collections() {
  return (
    <div className="page">
      {/* ============ Collection hero ============ */}
      <section className="collection-hero">
        <motion.div
          className="collection-hero__media"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <ImagePlaceholder
            src="/images/jacket-front.jpg"
            alt="ICEEIT collection"
            label="jacket-front.jpg"
          />
          <div className="collection-hero__badge">FW25 · The Current Collection</div>
        </motion.div>

        <motion.div
          className="collection-hero__copy"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
        >
          <motion.p
            className="eyebrow"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            ICEEIT / 01
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            The current
            <br />
            <span className="hero__accent">collection.</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            A focused edit of contemporary pieces built around the ICEEIT cold identity.
          </motion.p>
        </motion.div>
      </section>

      {/* ============ Product grid ============ */}
      <section className="section">
        <Reveal>
          <div className="page-header page-header--small">
            <p className="eyebrow">The edit</p>
            <h2>Designed to move together.</h2>
            <p>Build a complete look or pick a single piece that carries the room.</p>
          </div>
        </Reveal>
        <ProductGrid products={products} />
      </section>

      {/* ============ CTA band ============ */}
      <section className="cta-band">
        <Reveal>
          <p className="eyebrow">Find your piece</p>
          <h2>Make it yours.</h2>
          <Button to="/shop">Shop ICEEIT</Button>
        </Reveal>
      </section>
    </div>
  );
}