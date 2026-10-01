import { motion, useReducedMotion } from "framer-motion";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }) {
  const reduced = useReducedMotion();

  // Unique key per product set — this forces Framer Motion to
  // restart the animation whenever the filter changes.
  // Without this, the grid gets stuck in the "hidden" state
  // after switching filters (the blank-grid bug).
  const gridKey = products.map((p) => p.id).join("-") || "empty";

  if (!products || products.length === 0) {
    return (
      <div className="product-grid">
        <p className="empty-state">No products in this category.</p>
      </div>
    );
  }

  return (
    <motion.div
      key={gridKey}
      className="product-grid"
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : "show"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09 } },
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}