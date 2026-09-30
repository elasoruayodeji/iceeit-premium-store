import { useState } from "react";
import { site } from "../data/site";
import { Button } from "../components/Button";
import { Reveal } from "../components/Motion";

const FORMSPREE_URL = "https://formspree.io/f/mppwazrd";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...form, form: "Contact page" }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="page">
      <Reveal>
        <div className="page-header">
          <p className="eyebrow">ICEEIT / CONTACT</p>
          <h1>Let's talk.</h1>
          <p>Questions about an order, a product or ICEEIT? Reach out.</p>
        </div>
      </Reveal>

      <div className="contact-grid">
        <div className="contact-info">
          <div>
            <span>Email</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <span>WhatsApp</span>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
          <div>
            <span>Instagram</span>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              {site.socialLabel}
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="How can we help?"
            />
          </label>
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>

          {status === "sent" && (
            <p className="form-success">
              Message sent — we'll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="form-error">
              Something went wrong. Try again or WhatsApp us.
            </p>
          )}
        </form>
      </div>

      <div className="contact-help">
        <p className="eyebrow">Need an answer?</p>
        <h2>Check the FAQ first.</h2>
        <Button to="/faq" variant="outline">
          Open FAQ
        </Button>
      </div>
    </div>
  );
}