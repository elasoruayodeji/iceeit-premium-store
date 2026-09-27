import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "./Icons";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { formatNaira } from "../data/products";

export function ProductCard({ product }) {
  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.id}`} className="product-card__media">
        <ImagePlaceholder src={product.image} alt={product.name} />
        <motion.span className="product-card__view" whileHover={{ scale: 1.04 }}>
          View <ArrowUpRightIcon size={16}/>
        </motion.span>
      </Link>
      <div className="product-card__meta">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <strong>{formatNaira(product.price)}</strong>
      </div>
    </motion.article>
  );
}
