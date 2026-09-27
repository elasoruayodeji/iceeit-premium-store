import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products, formatNaira } from "../data/products";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { Button } from "../components/Button";
import { useCart } from "../context/CartContext";
import { MinusIcon, PlusIcon } from "../components/Icons";
import { ProductGrid } from "../components/ProductGrid";
import { Reveal } from "../components/Motion";

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product?.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return <div className="page"><div className="not-found"><p className="eyebrow">404</p><h1>Piece not found.</h1><Link to="/shop">Back to shop →</Link></div></div>;

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,3);

  function add() {
    for (let i=0; i<quantity; i++) addItem(product, { color });
  }

  return <div className="page">
    <div className="product-detail">
      <div className="product-gallery">
        <div className="product-gallery__main"><AnimatePresence mode="wait"><motion.div key={product.gallery[active]} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.25}}><ImagePlaceholder src={product.gallery[active]} alt={product.name}/></motion.div></AnimatePresence></div>
        <div className="product-gallery__thumbs">{product.gallery.map((img,i)=><button key={img} className={i===active ? "active":""} onClick={()=>setActive(i)}><ImagePlaceholder src={img} alt=""/></button>)}</div>
      </div>
      <Reveal className="product-info">
        <p className="eyebrow">{product.category}</p><h1>{product.name}</h1><div className="product-price">{formatNaira(product.price)}</div>
        <p className="product-description">{product.description}</p>
        {product.colors.length > 0 && <div className="option"><span>Colour</span><div className="swatches">{product.colors.map(c=><button key={c} className={color===c?"selected":""} onClick={()=>setColor(c)}>{c}</button>)}</div></div>}
        <div className="option"><span>Quantity</span><div className="quantity quantity--large"><button onClick={()=>setQuantity(Math.max(1,quantity-1))}><MinusIcon/></button><span>{quantity}</span><button onClick={()=>setQuantity(quantity+1)}><PlusIcon/></button></div></div>
        <Button onClick={add}>Add to cart</Button>
        <div className="product-details">{product.details.map((d,i)=><div key={i}><span>0{i+1}</span><p>{d}</p></div>)}</div>
      </Reveal>
    </div>
    {related.length > 0 && <section className="section section--tight"><div className="section-heading"><div><p className="eyebrow">You may also like</p><h2>Complete the edit.</h2></div></div><ProductGrid products={related}/></section>}
  </div>;
}
