import { motion } from "framer-motion";
import { ImagePlaceholder } from "./ImagePlaceholder";

const EASE = [0.22, 1, 0.36, 1];

const LOOKS = [
  {
    id: "look-1",
    src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871129/hero.jpg",
    caption: "FW25 — Look 01",
  },
  {
    id: "look-2",
    src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871127/jacket-front.jpg",
    caption: "FW25 — Look 02",
  },
  {
    id: "look-3",
    src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871128/look-jersey-joggers.jpg",
    caption: "FW25 — Look 03",
  },
  {
    id: "look-4",
    src: "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto/v1790871129/look-roundneck-joggers.jpg",
    caption: "FW25 — Look 04",
  },
];

export function Lookbook() {
  return (
    <section className="lookbook">
      <div className="lookbook__header">
        <p className="eyebrow">The lookbook</p>
        <h2>Worn together.</h2>
      </div>

      <div className="lookbook__strip">
        {LOOKS.map((look, i) => (
          <motion.div
            key={look.id}
            className="lookbook__item"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
          >
            <ImagePlaceholder src={look.src} alt={look.caption} label={look.caption} />
            <span>{look.caption}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}