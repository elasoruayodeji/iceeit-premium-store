/*
  ICEEIT V3 — Editorial Campaign.
  Alternating full-bleed image/video panels using existing campaign
  assets (Cloudinary + public/images). Restrained parallax on the media,
  scroll reveals on captions. Links point at real shop category routes.
*/
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// Plays a muted campaign video only while it is comfortably in view —
// no audio, lazy download (preload="none"), and never under reduced motion.
function CampaignVideo({ src, poster, alt }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={`${src}#t=0.1`}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
    />
  );
}

const PANELS = [
  {
    kind: "video",
    src: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871084/complete-jacket-wear.mp4",
    poster:
      "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto,w_1200/v1790871127/jacket-front.jpg",
    eyebrow: "Campaign 01",
    title: "Outerwear, engineered cold.",
    copy: "The Cosmic Splatter jacket anchors the FW25 line — a complete silhouette built for presence.",
    to: "/shop?category=Outerwear",
    cta: "Shop outerwear",
    alt: "Model wearing the ICEEIT Cosmic Splatter complete jacket look in a campaign video",
  },
  {
    kind: "image",
    src: "/images/editorial-black-jacket.jpg",
    eyebrow: "Campaign 02",
    title: "Less noise. More presence.",
    copy: "Black-on-black layering with the double-band joggers — quiet details that carry the whole fit.",
    to: "/shop?category=Bottoms",
    cta: "Shop bottoms",
    alt: "Editorial shot of an ICEEIT model in a black jacket and jogger combination",
  },
  {
    kind: "video",
    src: "https://res.cloudinary.com/ayodex-labs/video/upload/v1790871086/jersey.mp4",
    poster:
      "https://res.cloudinary.com/ayodex-labs/image/upload/q_auto,f_auto,w_1200/v1790871128/look-jersey-joggers.jpg",
    eyebrow: "Campaign 03",
    title: "Everyday rotation.",
    copy: "Jerseys, round necks and sleeveless layers — sport-inspired energy in the ICEEIT language.",
    to: "/shop?category=Tops",
    cta: "Shop tops",
    alt: "ICEEIT jersey styled with double band joggers, campaign video",
  },
];

function Panel({ panel, index }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const flip = index % 2 === 1;

  return (
    <article
      className={`v3-editorial__panel ${flip ? "v3-editorial__panel--flip" : ""}`}
      ref={ref}
    >
      <motion.div
        className="v3-editorial__media"
        style={reduced ? undefined : { y }}
      >
        {panel.kind === "video" ? (
          <CampaignVideo src={panel.src} poster={panel.poster} alt={panel.alt} />
        ) : (
          <img
            src={panel.src}
            alt={panel.alt}
            loading="lazy"
            decoding="async"
            width="1200"
            height="1500"
          />
        )}
      </motion.div>

      <motion.div
        className="v3-editorial__copy"
        initial={reduced ? false : { opacity: 0, y: 36 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="eyebrow">{panel.eyebrow}</p>
        <h3>{panel.title}</h3>
        <p>{panel.copy}</p>
        <Link to={panel.to} className="text-link">
          {panel.cta} →
        </Link>
      </motion.div>
    </article>
  );
}

export function EditorialCampaign() {
  return (
    <section className="v3-editorial" aria-labelledby="v3-editorial-title">
      <header className="v3-editorial__head">
        <p className="eyebrow">The campaign</p>
        <h2 id="v3-editorial-title">Worn in Lagos.</h2>
      </header>
      {PANELS.map((p, i) => (
        <Panel key={p.title} panel={p} index={i} />
      ))}
    </section>
  );
}
