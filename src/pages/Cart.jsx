import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { formatNaira } from "../data/products";
import { MinusIcon, PlusIcon, TrashIcon } from "../components/Icons";
import { Button } from "../components/Button";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  return <div className="page">
    <div className="page-header"><p className="eyebrow">ICEEIT / CART</p><h1>Your selection.</h1></div>
    {items.length === 0 ? <div className="empty-page"><span>ICEEIT</span><h2>Nothing here yet.</h2><p>Your selected pieces will appear here.</p><Button to="/shop">Continue shopping</Button></div> :
      <div className="cart-page">
        <div className="cart-page__items">{items.map(item => <div className="cart-page-item" key={item.key}><ImagePlaceholder src={item.image} alt={item.name}/><div><p className="eyebrow">{item.color || "ICEEIT"}</p><h3>{item.name}</h3><strong>{formatNaira(item.price)}</strong><div className="cart-page-item__bottom"><div className="quantity"><button onClick={()=>updateQuantity(item.key,item.quantity-1)}><MinusIcon size={15}/></button><span>{item.quantity}</span><button onClick={()=>updateQuantity(item.key,item.quantity+1)}><PlusIcon size={15}/></button></div><button className="remove-button" onClick={()=>removeItem(item.key)}><TrashIcon size={16}/> Remove</button></div></div></div>)}</div>
        <aside className="summary"><p className="eyebrow">Order summary</p><div><span>Subtotal</span><strong>{formatNaira(subtotal)}</strong></div><small>Delivery and payment details will be confirmed at checkout.</small><Button to="/checkout">Proceed to checkout</Button><Link to="/shop" className="continue-link">Continue shopping</Link></aside>
      </div>}
  </div>;
}
