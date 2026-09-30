import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ArrowRightIcon } from "../components/Icons";
import { Button } from "../components/Button";
import { ProductGrid } from "../components/ProductGrid";
import { Newsletter } from "../components/Newsletter";
import { Reveal, Stagger, StaggerItem } from "../components/Motion";
import { products } from "../data/products";
import { ImagePlaceholder } from "../components/ImagePlaceholder";

const EASE = [0.22, 1, 0.36, 1];

// Letter-by-letter reveal
function SplitText({ text, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  const chars = Array.from(text);

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, y: "0.4em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: delay + i * 0.04, ease: EASE }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const reduced = useReducedMotion();

  // ---------- Parallax + zoom on scroll ----------
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-30%"]);

  return (
    <div>
      <section className="hero" ref={heroRef}>
        <motion.div
          className="hero__copy"
          style={{
            opacity: reduced ? 1 : textOpacity,
            y: reduced ? 0 : textY,
          }}
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            FW25 · Contemporary streetwear
          </motion.p>

          <h1>
            <SplitText text="Wear the" delay={0.35} />
            <br />
            <motion.span
              className="hero__accent"
              animate={
                reduced
                  ? {}
                  : {
                      textShadow: [
                        "0 0 24px rgba(109, 206, 255, 0.15)",
                        "0 0 48px rgba(109, 206, 255, 0.45)",
                        "0 0 24px rgba(109, 206, 255, 0.15)",
                      ],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
            >
              <SplitText text="cold." delay={0.85} />
            </motion.span>
          </h1>

          <motion.p
            className="hero__intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4, ease: EASE }}
          >
            ICEEIT is a contemporary clothing brand built around bold silhouettes,
            clean energy and an unmistakable cold identity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.55, ease: EASE }}
          >
            <Button to="/shop">Shop the collection</Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__media"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
        >
          <motion.div
            style={{
              y: reduced ? 0 : imageY,
              scale: reduced ? 1 : imageScale,
              height: "100%",
              width: "100%",
            }}
          >
            <ImagePlaceholder
              src="/images/hero.jpg"
              alt="ICEEIT campaign"
              label="hero.jpg"
            />
          </motion.div>
          <div className="hero__badge">FW25 · Streetwear</div>
        </motion.div>
      </section>

      <section className="section section--tight">
        <Stagger className="section-heading">
          <div>
            <StaggerItem>
              <p className="eyebrow">The edit</p>
            </StaggerItem>
            <StaggerItem>
              <h2>
                Pieces for the
                <br />
                rotation.
              </h2>
            </StaggerItem>
          </div>
          <StaggerItem>
            <Link to="/shop" className="text-link">
              View all <ArrowRightIcon size={16} />
            </Link>
          </StaggerItem>
        </Stagger>
        <ProductGrid products={featured} />
      </section>

      <section className="category-strip">
        {[
          ["Tops", "/shop?category=Tops", "/images/look-roundneck-joggers.jpg"],
          ["Bottoms", "/shop?category=Bottoms", "/images/look-jersey-joggers.jpg"],
          ["Outerwear", "/shop?category=Outerwear", "/images/jacket-front.jpg"],
        ].map(([name, to, img], i) => (
          <motion.div
            key={name}
            className="category-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: i * 0.08, duration: 0.65, ease: EASE }}
          >
            <Link to={to}>
              <ImagePlaceholder
                src={img}
                alt={`${name} category`}
                label={img.split("/").pop()}
              />
              <span>
                {name}
                <ArrowRightIcon size={18} />
              </span>
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="statement">
        <Stagger>
          <StaggerItem>
            <p className="eyebrow">The ICEEIT idea</p>
          </StaggerItem>
          <StaggerItem>
            <h2>
              Cold isn't a colour.
              <br />
              <span>It's an attitude.</span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p>
              We make pieces that sit between everyday comfort and statement dressing —
              designed to be worn your way, but always with presence.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      <section className="editorial">
        <motion.div
          className="editorial__media"
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <ImagePlaceholder
            src="/images/hero.jpg"
            alt="ICEEIT editorial"
            label="hero.jpg"
          />
        </motion.div>
        <Reveal className="editorial__copy">
          <p className="eyebrow">Built for the street</p>
          <h2>
            Less noise.
            <br />
            More presence.
          </h2>
          <p>
            ICEEIT keeps the language simple: strong pieces, considered details and a
            visual identity that doesn't need to shout.
          </p>
          <Button to="/about" variant="outline">
            Our story
          </Button>
        </Reveal>
      </section>

      <Newsletter />
    </div>
  );
}