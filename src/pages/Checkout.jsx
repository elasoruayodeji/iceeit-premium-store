import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatNaira } from "../data/products";
import { Button } from "../components/Button";

export default function Checkout() {
  const { items, subtotal } = useCart();
  if (!items.length) return <div className="page"><div className="empty-page"><h2>Your cart is empty.</h2><Button to="/shop">Shop ICEEIT</Button></div></div>;
  return <div className="page"><div className="checkout"><div><p className="eyebrow">ICEEIT / CHECKOUT</p><h1>Almost there.</h1><form className="checkout-form" onSubmit={e=>e.preventDefault()}><label>Full name<input required placeholder="Your full name"/></label><label>Email<input type="email" required defaultValue="elasoruayodeji@gmail.com"/></label><label>Phone<input required placeholder="+234 800 000 0000"/></label><label>Delivery address<textarea required placeholder="Street, area, city"/></label><div className="form-row"><label>State<input required placeholder="Lagos"/></label><label>City<input required placeholder="Ikeja"/></label></div><Button type="submit">Continue to payment</Button><small>Payment integration is ready to be connected to a secure payment provider.</small></form></div><aside className="summary"><p className="eyebrow">Order summary</p>{items.map(i=><div className="summary-item" key={i.key}><span>{i.name} × {i.quantity}</span><strong>{formatNaira(i.price*i.quantity)}</strong></div>)}<div className="summary-total"><span>Total</span><strong>{formatNaira(subtotal)}</strong></div><Link to="/cart" className="continue-link">Back to cart</Link></aside></div></div>;
}
