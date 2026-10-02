import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "./Icons";
import { formatNaira, products } from "../data/products";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Button } from "./Button";

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, items, subtotal, updateQuantity, removeItem } = useCart();

  // Pick up to 2 products not already in the cart — for the upsell row
  const upsellProducts = products
    .filter((p) => !items.some((item) => item.productId === p.id))
    .slice(0, 2);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          className="cart-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setDrawerOpen(false)}
        >
          <motion.aside
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer__header">
              <div>
                <p className="eyebrow">Your selection</p>
                <h2>Cart</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close cart"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="cart-drawer__body">
              {items.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-state__mark">ICEEIT</span>
                  <h3>Your cart is empty.</h3>
                  <p>Find something worth adding to the rotation.</p>
                  <Button to="/shop" onClick={() => setDrawerOpen(false)}>
                    Shop now
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div className="cart-item" key={item.key}>
                    <ImagePlaceholder src={item.image} alt={item.name} />
                    <div className="cart-item__info">
                      <div>
                        <h3>{item.name}</h3>
                        {item.color && <span>{item.color}</span>}
                        <strong>{formatNaira(item.price)}</strong>
                      </div>
                      <div className="cart-item__controls">
                        <div className="quantity">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            aria-label="Decrease"
                          >
                            <MinusIcon size={15} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            aria-label="Increase"
                          >
                            <PlusIcon size={15} />
                          </button>
                        </div>
                        <button
                          className="remove-button"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <TrashIcon size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ============ UPSELL ============ */}
            {items.length > 0 && upsellProducts.length > 0 && (
              <div className="cart-drawer-upsell">
                <p className="eyebrow">You might like</p>
                {upsellProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="cart-drawer-upsell__item"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <div className="cart-drawer-upsell__media">
  {p.video ? (
    <video
      src={p.video}
      muted
      playsInline
      autoPlay
      loop
      preload="metadata"
    />
  ) : (
    <img src={p.image} alt={p.name} />
  )}
</div>
                    <div>
                      <span>{p.name}</span>
                      <small>{formatNaira(p.price)}</small>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="cart-drawer__footer">
                <div className="cart-total">
                  <span>Subtotal</span>
                  <strong>{formatNaira(subtotal)}</strong>
                </div>
                <Link
                  to="/cart"
                  className="button button--solid"
                  onClick={() => setDrawerOpen(false)}
                >
                  Review cart <span>→</span>
                </Link>
                <small>Delivery and payment are calculated at checkout.</small>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}