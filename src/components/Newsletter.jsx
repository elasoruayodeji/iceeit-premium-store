import { useState } from "react";
import { ArrowRightIcon } from "./Icons";

export function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="newsletter">
      <div><p className="eyebrow">Stay in the cold</p><h2>New drops.<br/>No noise.</h2></div>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="newsletter__form">
        <label htmlFor="newsletter-email">Email address</label>
        <div><input id="newsletter-email" type="email" required placeholder="you@example.com"/><button type="submit" aria-label="Subscribe"><ArrowRightIcon/></button></div>
        <small>{sent ? "You're on the list. We'll be in touch." : "Sign up for new releases and ICEEIT updates."}</small>
      </form>
    </section>
  );
}
