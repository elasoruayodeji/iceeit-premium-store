import { site } from "../data/site";
import { Button } from "../components/Button";
import { Reveal } from "../components/Motion";

export default function Contact() {
  return <div className="page"><Reveal><div className="page-header"><p className="eyebrow">ICEEIT / CONTACT</p><h1>Let's talk.</h1><p>Questions about an order, a product or ICEEIT? Reach out.</p></div></Reveal><div className="contact-grid"><div className="contact-info"><div><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></div><div><span>WhatsApp</span><a href={site.whatsapp} target="_blank" rel="noreferrer">Chat on WhatsApp</a></div><div><span>Instagram</span><a href={site.instagram} target="_blank" rel="noreferrer">{site.socialLabel}</a></div></div><form className="contact-form" onSubmit={e=>e.preventDefault()}><label>Name<input required placeholder="Your name"/></label><label>Email<input type="email" required placeholder="you@example.com"/></label><label>Message<textarea required rows="6" placeholder="How can we help?"/></label><Button type="submit">Send message</Button></form></div><div className="contact-help"><p className="eyebrow">Need an answer?</p><h2>Check the FAQ first.</h2><Button to="/faq" variant="outline">Open FAQ</Button></div></div>;
}
