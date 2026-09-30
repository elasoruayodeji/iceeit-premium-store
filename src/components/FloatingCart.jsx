import { motion } from "framer-motion";
import { BagIcon } from "./Icons";
import { useCart } from "../context/CartContext";

export function FloatingCart() {
  const { itemCount, setDrawerOpen, drawerOpen } = useCart();

  if (drawerOpen) return null;

  return (
    <motion.button
      className="floating-cart"
      aria-label="Open cart"
      onClick={() => setDrawerOpen(true)}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <BagIcon size={22} />
      {itemCount > 0 && <span>{itemCount}</span>}
    </motion.button>
  );
}