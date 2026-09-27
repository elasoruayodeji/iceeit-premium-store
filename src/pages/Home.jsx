import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "../components/Icons";
import { Button } from "../components/Button";
import { ProductGrid } from "../components/ProductGrid";
import { Newsletter } from "../components/Newsletter";
import { Reveal } from "../components/Motion";
import { products } from "../data/products";
import { ImagePlaceholder } from "../components/ImagePlaceholder";

export default function Home() {
  const featured = products.filter(p => p.featured).slice(0, 4);
  return (
    <div>
      <section className="hero">
        <div className="hero__copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>Contemporary streetwear / 01</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22, duration: .7 }}>Wear the<br/><span>cold.</span></motion.h1>
          <motion.p className="hero__intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34 }}>ICEEIT is a contemporary clothing brand built around bold silhouettes, clean energy and an unmistakable cold identity.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .46 }}><Button to="/shop">Shop the collection</Button></motion.div>
        </div>
        <motion.div className="hero__media" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.05 }}>
          <ImagePlaceholder src="/images/placeholders/hero.webp" alt="ICEEIT campaign placeholder"/>
          <div className="hero__media-label">ICEEIT / EST. NOW</div>
        </motion.div>
        <div className="hero__side">01 — 06</div>
      </section>

      <section className="section section--tight">
        <Reveal><div className="section-heading"><div><p className="eyebrow">The edit</p><h2>Pieces for the<br/>rotation.</h2></div><Link to="/shop" className="text-link">View all <ArrowRightIcon size={16}/></Link></div></Reveal>
        <ProductGrid products={featured}/>
      </section>

      <section className="category-strip">
        {[
          ["Tops", "/shop?category=Tops", "/images/placeholders/category-tops.webp"],
          ["Bottoms", "/shop?category=Bottoms", "/images/placeholders/category-bottoms.webp"],
          ["Outerwear", "/shop?category=Outerwear", "/images/placeholders/category-outerwear.webp"]
        ].map(([name,to,img]) => (
          <Link className="category-card" to={to} key={name}>
            <ImagePlaceholder src={img} alt={`${name} category placeholder`}/>
            <span>{name}<ArrowRightIcon size={18}/></span>
          </Link>
        ))}
      </section>

      <section className="statement">
        <Reveal><p className="eyebrow">The ICEEIT idea</p><h2>Cold isn't a colour.<br/><span>It's an attitude.</span></h2><p>We make pieces that sit between everyday comfort and statement dressing — designed to be worn your way, but always with presence.</p></Reveal>
      </section>

      <section className="editorial">
        <div className="editorial__media"><ImagePlaceholder src="/images/placeholders/editorial.webp" alt="ICEEIT editorial placeholder"/></div>
        <Reveal className="editorial__copy"><p className="eyebrow">Built for the street</p><h2>Less noise.<br/>More presence.</h2><p>ICEEIT keeps the language simple: strong pieces, considered details and a visual identity that doesn't need to shout.</p><Button to="/about" variant="outline">Our story</Button></Reveal>
      </section>

      <Newsletter/>
    </div>
  );
}
