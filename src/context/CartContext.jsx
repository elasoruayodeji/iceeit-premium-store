import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function addItem(product, options = {}) {
    const color = options.color || "";
    const key = `${product.id}-${color}`;
    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, {
        key,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color,
        quantity: 1
      }];
    });
    setDrawerOpen(true);
  }

  function updateQuantity(key, quantity) {
    setItems((current) =>
      current
        .map((item) => item.key === key ? { ...item, quantity } : item)
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(key) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  // ✅ NEW — clear all items (used after successful checkout)
  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    drawerOpen,
    setDrawerOpen,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,  // ✅ exposed
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}