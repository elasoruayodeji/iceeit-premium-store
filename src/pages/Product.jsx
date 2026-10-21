import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products, formatNaira } from "../data/products";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { VideoMedia } from "../components/VideoMedia";
import { Button } from "../components/Button";
import { useCart } from "../context/CartContext";
import { MinusIcon, PlusIcon } from "../components/Icons";
import { ProductGrid } from "../components/ProductGrid";
import { Reveal } from "../components/Motion";
import { useSeo } from "../hooks/useSeo";
import { getSiteOrigin, productImage } from "../lib/seo";

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product?.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // --- Per-product SEO (unique title/description/canonical/OG + JSON-LD) ---
  const origin = getSiteOrigin();
  useSeo(
    product
      ? {
          title: `${product.name} — ICEEIT ${product.category} | Wear the Cold`,
          description: `${product.description} Price: ${formatNaira(
            product.price
          )}. Shop ${product.name} from ICEEIT, the Lagos streetwear brand serving Nigeria.`,
          path: `/product/${product.id}`,
          ogImage: productImage(product),
          ogType: "product",
          jsonLd: {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                name: product.name,
                image: product.gallery
                  .filter((g) => g.type === "image")
                  .map((g) => g.src),
                description: product.description,
                brand: { "@type": "Brand", name: "ICEEIT" },
                offers: {
                  "@type": "Offer",
                  url: `${origin}/product/${product.id}`,
                  price: String(product.price),
                  priceCurrency: "NGN",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: origin },
                  { "@type": "ListItem", position: 2, name: "Shop", item: `${origin}/shop` },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: product.name,
                    item: `${origin}/product/${product.id}`,
                  },
                ],
              },
            ],
          },
        }
      : {
          title: "Piece not found — ICEEIT",
          description: "This ICEEIT product is no longer available. Browse the full streetwear collection instead.",
          path: "/shop",
          robots: "noindex, follow",
        }
  );

  if (!product) return <div className="page"><div className="not-found"><p className="eyebrow">404</p><h1>Piece not found.</h1><Link to="/shop">Back to shop →</Link></div></div>;

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,3);

  function add() {
    for (let i=0; i<quantity; i++) addItem(product, { color });
  }

  return <div className="page">
    <nav className="product-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
    </nav>
    <div className="product-detail">
      <div className="product-gallery">
        <div className="product-gallery__main"><AnimatePresence mode="wait"><motion.div key={product.gallery[active].src} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.25}}>{product.gallery[active].type === "video" ? <VideoMedia src={product.gallery[active].src} label={product.name} playOn="view" controls/> : <ImagePlaceholder src={product.gallery[active].src} alt={`${product.name} — ICEEIT ${product.category.toLowerCase()} piece`} label={product.name}/>}</motion.div></AnimatePresence></div>
        <div className="product-gallery__thumbs">{product.gallery.map((item,i)=><button key={item.src} className={i===active ? "active":""} onClick={()=>setActive(i)} aria-label={item.type === "video" ? `${product.name} video` : `${product.name} photo ${i+1}`}>{item.type === "video" ? <VideoMedia src={item.src} label={product.name} playOn="none"/> : <ImagePlaceholder src={item.src} alt="" role="presentation"/>}</button>)}</div>
      </div>
      <Reveal className="product-info">
        <p className="eyebrow">{product.category}</p><h1>{product.name}</h1><div className="product-price">{formatNaira(product.price)}</div>
        <p className="product-description">{product.description}</p>
        {product.colors.length > 0 && <div className="option"><span>Colour</span><div className="swatches">{product.colors.map(c=><button key={c} className={color===c?"selected":""} onClick={()=>setColor(c)}>{c}</button>)}</div></div>}
        <div className="option"><span>Quantity</span><div className="quantity quantity--large"><button onClick={()=>setQuantity(Math.max(1,quantity-1))}><MinusIcon/></button><span>{quantity}</span><button onClick={()=>setQuantity(quantity+1)}><PlusIcon/></button></div></div>
        <Button onClick={add}>Add to cart</Button>
        <div className="product-details">{product.details.map((d,i)=><div key={i}><span>0{i+1}</span><p>{d}</p></div>)}</div>
        <p className="product-seo-note">ICEEIT streetwear {product.category.toLowerCase()} designed in Lagos, Nigeria. See related pieces below or <Link to="/shop">browse the full collection</Link>.</p>
      </Reveal>
    </div>
    {related.length > 0 && <section className="section section--tight"><div className="section-heading"><div><p className="eyebrow">You may also like</p><h2>Complete the edit.</h2></div></div><ProductGrid products={related}/></section>}
  </div>;
}
