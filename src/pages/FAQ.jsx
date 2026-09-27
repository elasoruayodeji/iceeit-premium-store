import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "../components/Icons";

const faqs = [
  ["How do I place an order?", "Choose a product, select any available colour, choose your quantity and add it to your cart. From your cart, continue to checkout and enter your delivery details."],
  ["What payment methods will ICEEIT accept?", "The checkout is being prepared for a secure online payment provider. The live payment option will be shown once the payment integration is connected."],
  ["How does delivery work?", "Delivery details and applicable fees are confirmed during checkout. Delivery timing can vary by destination and will be communicated with your order."],
  ["Can I return or exchange an item?", "Return and exchange rules depend on the final ICEEIT order policy. Before launch, replace this answer with your exact eligible-item, condition and time-window policy."],
  ["Do your products have sizes?", "The current product catalogue is not using size options yet. If ICEEIT introduces size variants, they can be added directly to each product's data and product page."],
  ["How can I contact ICEEIT?", "Email us at elasoruayodeji@gmail.com, or use the WhatsApp and Instagram links on the Contact page."],
  ["Are product images the exact items I will receive?", "Product photography is intended to represent each piece. Final photography and product-specific material details should be used on the live product pages once the real assets are inserted."],
  ["Can I change my order after placing it?", "Contact ICEEIT as soon as possible with your order details. Changes cannot be guaranteed once an order has entered fulfilment."]
];

export default function FAQ() {
  const [active, setActive] = useState(0);
  return <div className="page"><div className="page-header"><p className="eyebrow">ICEEIT / FAQ</p><h1>Questions,<br/>answered.</h1><p>Everything you need to know before placing an order.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${active===i?"active":""}`} key={q}><button onClick={()=>setActive(active===i?-1:i)}><span>0{i+1}</span><strong>{q}</strong><ChevronDownIcon size={20}/></button><AnimatePresence initial={false}>{active===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></div>;
}
