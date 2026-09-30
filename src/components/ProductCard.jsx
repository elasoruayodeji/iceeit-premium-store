import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "./Icons";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { VideoMedia } from "./VideoMedia";
import { formatNaira } from "../data/products";

export function ProductCard({ product }) {
  return <motion.article className="product-card" variants={{ hidden:{opacity:0,y:28}, show:{opacity:1,y:0,transition:{duration:.65,ease:[.2,.8,.2,1]}} }} whileHover={{ y:-7 }} transition={{ duration:.35, ease:[.22,1,.36,1] }}>
    <Link to={`/product/${product.id}`} className="product-card__media">
      <motion.div className="product-card__image-wrap" whileHover={{ scale:1.035 }} transition={{ duration:.7, ease:[.22,1,.36,1] }}>{product.video ? <VideoMedia src={product.video} label={product.name} playOn="hover"/> : <ImagePlaceholder src={product.image} alt={product.name} label={product.name}/>}</motion.div>
      <motion.span className="product-card__view" whileHover={{ scale:1.04, x:-2 }} whileTap={{ scale:.97 }}>View <ArrowUpRightIcon size={16}/></motion.span>
    </Link>
    <div className="product-card__meta"><div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3></div><strong>{formatNaira(product.price)}</strong></div>
  </motion.article>;
}
