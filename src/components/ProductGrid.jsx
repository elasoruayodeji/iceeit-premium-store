import { motion, useReducedMotion } from "framer-motion";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }) {
  const reduced = useReducedMotion();
  return <motion.div className="product-grid" initial={reduced ? false : "hidden"} whileInView={reduced ? undefined : "show"} viewport={{ once: true, amount: 0.08 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
    {products.map((product) => <ProductCard key={product.id} product={product} />)}
  </motion.div>;
}
