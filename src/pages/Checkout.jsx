import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatNaira } from "../data/products";
import { Button } from "../components/Button";
import { supabase } from "../lib/supabaseClient";

const PAYSTACK_PUBLIC_KEY = "pk_test_5ba40cb33253c4f6ce6a35efcfc7aaef7c63fdd1";
const FORMSPREE_URL = "https://formspree.io/f/mppwazrd";
const WHATSAPP_NUMBER = "2349060902656"; // ← swap for client's number when ready

const SHIPPING = {
  pickup: { id: "pickup", label: "Pickup (Lagos)", price: 0 },
  lagos: { id: "lagos", label: "Lagos Delivery", price: 2500 },
  outside: { id: "outside", label: "Outside Lagos", price: 4500 },
};

const stateCities = {
  Abia: ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Bende", "Isiala Ngwa", "Osisioma"],
  Adamawa: ["Yola", "Mubi", "Jimeta", "Ganye", "Numan", "Gombi", "Michika"],
  "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Ikot Abasi", "Abak", "Etinan"],
  Anambra: ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Aguata", "Ihiala", "Ogbaru"],
  Bauchi: ["Bauchi", "Azare", "Misau", "Ningi", "Jama'are", "Katagum", "Darazo"],
  Bayelsa: ["Yenagoa", "Brass", "Nembe", "Sagbama", "Ogbia", "Southern Ijaw", "Kolokuma/Opokuma"],
  Benue: ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala", "Vandeikya", "Adikpo", "Aliade"],
  Borno: ["Maiduguri", "Biu", "Bama", "Dikwa", "Konduga", "Monguno", "Damasak"],
  "Cross River": ["Calabar", "Ogoja", "Ikom", "Obudu", "Akamkpa", "Ugep", "Akpabuyo"],
  Delta: ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor", "Abraka", "Ozoro"],
  Ebonyi: ["Abakaliki", "Afikpo", "Onueke", "Ezza", "Ohaukwu", "Ishielu", "Ivo"],
  Edo: ["Benin City", "Auchi", "Ekpoma", "Uromi", "Igarra", "Irrua", "Abudu"],
  Ekiti: ["Ado-Ekiti", "Ikere", "Ijero", "Ikole", "Ilawe", "Ise-Ekiti", "Oye-Ekiti"],
  Enugu: ["Enugu", "Nsukka", "Oji River", "Agbani", "Awgu", "9th Mile", "Udi"],
  FCT: ["Abuja Municipal", "Garki", "Wuse", "Maitama", "Gwarinpa", "Kubwa", "Gwagwalada"],
  Gombe: ["Gombe", "Kumo", "Billiri", "Kaltungo", "Bajoga", "Dukku", "Nafada"],
  Imo: ["Owerri", "Orlu", "Okigwe", "Mbaise", "Oguta", "Nkwerre", "Ideato"],
  Jigawa: ["Dutse", "Hadejia", "Kazaure", "Gumel", "Birnin Kudu", "Ringim", "Jahun"],
  Kaduna: ["Kaduna", "Zaria", "Kafanchan", "Kagoro", "Birnin Gwari", "Saminaka", "Kachia"],
  Kano: ["Kano", "Fagge", "Nassarawa", "Dala", "Gwale", "Tarauni", "Ungogo"],
  Katsina: ["Katsina", "Funtua", "Daura", "Malumfashi", "Dutsin-Ma", "Kankara", "Mani"],
  Kebbi: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru", "Jega", "Koko", "Kebbe"],
  Kogi: ["Lokoja", "Okene", "Idah", "Kabba", "Anyigba", "Ajaokuta", "Ankpa"],
  Kwara: ["Ilorin", "Offa", "Omu-Aran", "Jebba", "Lafiagi", "Patigi", "Kaiama"],
  Lagos: ["Ikeja", "Lekki", "Victoria Island", "Ikoyi", "Yaba", "Surulere", "Ajah"],
  Nasarawa: ["Lafia", "Keffi", "Karu", "Akwanga", "Nasarawa", "Kokona", "Doma"],
  Niger: ["Minna", "Suleja", "Bida", "Kontagora", "Mokwa", "Borgu", "Lapai"],
  Ogun: ["Abeokuta", "Ijebu-Ode", "Sagamu", "Ota", "Sango-Ota", "Mowe", "Ilaro"],
  Ondo: ["Akure", "Ondo", "Owo", "Ikare", "Ore", "Akungba", "Okitipupa"],
  Osun: ["Osogbo", "Ile-Ife", "Ilesa", "Ede", "Ikire", "Iwo", "Ila-Orangun"],
  Oyo: ["Ibadan", "Ogbomosho", "Oyo", "Iseyin", "Igboho", "Eruwa", "Saki"],
  Plateau: ["Jos", "Bukuru", "Barkin Ladi", "Pankshin", "Shendam", "Mangu", "Bassa"],
  Rivers: ["Port Harcourt", "Obio-Akpor", "Bonny", "Eleme", "Okrika", "Ahoada", "Degema"],
  Sokoto: ["Sokoto", "Tambuwal", "Wurno", "Gwadabawa", "Illela", "Goronyo", "Rabah"],
  Taraba: ["Jalingo", "Wukari", "Bali", "Takum", "Gembu", "Zing", "Karim Lamido"],
  Yobe: ["Damaturu", "Potiskum", "Nguru", "Geidam", "Gashua", "Bade", "Fika"],
  Zamfara: ["Gusau", "Kaura Namoda", "Talata Mafara", "Anka", "Bungudu", "Maradun", "Tsafe"],
};

const states = Object.keys(stateCities);

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [shippingId, setShippingId] = useState("lagos");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
    // Scroll to top when the confirmation screen appears
  useEffect(() => {
    if (placed) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [placed]);

  const cities = selectedState ? stateCities[selectedState] : [];
  const shipping = SHIPPING[shippingId] || SHIPPING.lagos;
  const shippingPrice = shipping.price;
  const grandTotal = subtotal + shippingPrice;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    return formRef.current.reportValidity();
  }

  function buildOrderSummary() {
    return items
      .map(
        (item) =>
          `${item.name} (${item.color || "—"}) x${item.quantity} — ${formatNaira(
            item.price * item.quantity
          )}`
      )
      .join("\n");
  }

async function saveOrderToDatabase(method, reference = "") {
  console.log("💾 Attempting Supabase save with:", {
    customer_name: form.name,
    phone: form.phone,
    email: form.email,
    address: `${form.address}, ${selectedCity}, ${selectedState}`,
    notes: form.notes,
    items: buildOrderSummary(),
    total: grandTotal,
    payment_method: method,
    reference,
    status: "incoming",
  });

  const { data, error } = await supabase.from("orders").insert({
    customer_name: form.name,
    phone: form.phone,
    email: form.email,
    address: `${form.address}, ${selectedCity}, ${selectedState}`,
    notes: form.notes,
    items: buildOrderSummary(),
    total: grandTotal,
    payment_method: method,
    reference,
    status: "incoming",
  }).select();

  if (error) {
    console.error("❌ SUPABASE ERROR:", error);
    console.error("❌ Error code:", error.code);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error details:", error.details);
    console.error("❌ Error hint:", error.hint);
  } else {
    console.log("✅ Saved to Supabase:", data);
  }
}

  async function notifyOrder(method, reference = "") {
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          form: "New order",
          paymentMethod: method,
          reference,
          customerName: form.name,
          phone: form.phone,
          email: form.email,
          address: `${form.address}, ${selectedCity}, ${selectedState}`,
          notes: form.notes,
          shippingMethod: shipping.label,
          shippingPrice: formatNaira(shipping.price),
          items: buildOrderSummary(),
          subtotal: formatNaira(subtotal),
          total: formatNaira(grandTotal),
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  function handleWhatsAppOrder() {
    if (!validate()) return;
    const message = `New order from ${form.name}\n\n${buildOrderSummary()}\n\nSubtotal: ${formatNaira(subtotal)}\nShipping (${shipping.label}): ${formatNaira(shipping.price)}\nTotal: ${formatNaira(grandTotal)}\n\nDelivery address: ${form.address}, ${selectedCity}, ${selectedState}\nPhone: ${form.phone}\nNotes: ${form.notes || "-"}`;
    notifyOrder("WhatsApp");
    saveOrderToDatabase("WhatsApp");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    clearCart();
    setPlaced(true);
  }

  async function openPaystack(methodLabel) {
    if (!validate()) return;
    if (!selectedState || !selectedCity) {
      alert("Please select your state and city.");
      return;
    }

    let waited = 0;
    while (!window.PaystackPop && waited < 5000) {
      await new Promise((r) => setTimeout(r, 200));
      waited += 200;
    }
    if (!window.PaystackPop) {
      alert("Payment service failed to load. Please refresh and try again.");
      return;
    }

    setPlacing(true);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: Math.round(grandTotal * 100),
      currency: "NGN",
      ref: "ICEEIT_" + Date.now(),
      callback: function (response) {
        notifyOrder(methodLabel, response.reference);
        saveOrderToDatabase(methodLabel, response.reference);
        clearCart();
        setPlaced(true);
        setPlacing(false);
      },
      onClose: function () {
        setPlacing(false);
      },
    });

    handler.openIframe();
  }

  function handleCardPayment() {
    openPaystack("Paystack (Card)");
  }

  function handleBankTransferPayment() {
    openPaystack("Paystack (Bank Transfer)");
  }

  if (placed) {
  const orderRef = "ICEEIT-" + Date.now().toString().slice(-6);

  return (
    <div className="page">
      <div className="order-confirm">
        <motion.div
          className="order-confirm__check"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="5 12 10 17 19 7" />
          </svg>
        </motion.div>

        <p className="eyebrow">ICEEIT / Order confirmed</p>
        <h1>
          Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
        </h1>
        <p className="order-confirm__intro">
          We've received your order and will reach out shortly to confirm delivery.
        </p>

        <div className="order-confirm__details">
          <div>
            <span>Order reference</span>
            <strong>{orderRef}</strong>
          </div>
          <div>
            <span>Total paid</span>
            <strong>{formatNaira(grandTotal)}</strong>
          </div>
          <div>
            <span>Ships from</span>
            <strong>Lagos, Nigeria</strong>
          </div>
        </div>

        <div className="order-confirm__actions">
          <Button to="/shop">Continue shopping</Button>
          <a
            className="btn btn-outline"
            href={`https://wa.me/2349060902656?text=${encodeURIComponent(
              `Hi ICEEIT, I just placed an order (ref ${orderRef}). Can you confirm?`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Confirm on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

  if (!items.length) {
    return (
      <div className="page">
        <div className="empty-page">
          <h2>Your cart is empty.</h2>
          <Button to="/shop">Shop ICEEIT</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="checkout">
        <div>
          <p className="eyebrow">ICEEIT / CHECKOUT</p>
          <h1>Almost there.</h1>

          <form
            className="checkout-form"
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
          >
            <label>
              Full name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
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
              Phone
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="+234 800 000 0000"
              />
            </label>

            <label>
              Delivery address
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="Street address, house number, area"
              />
            </label>

            <div className="form-row">
              <label>
                State
                <select
                  required
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity("");
                    setShippingId(e.target.value === "Lagos" ? "lagos" : "outside");
                  }}
                >
                  <option value="" disabled>Select state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>

              <label>
                City / Area
                <select
                  required
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState}
                >
                  <option value="" disabled>
                    {selectedState ? "Select city / area" : "Select state first"}
                  </option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Order notes (optional)
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Anything we should know?"
              />
            </label>

            <div className="shipping-section">
              <span className="eyebrow">Shipping method</span>
              <div className="shipping-options">
                {Object.values(SHIPPING).map((opt) => (
                  <label
                    key={opt.id}
                    className={`shipping-option ${shippingId === opt.id ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shippingId === opt.id}
                      onChange={() => setShippingId(opt.id)}
                    />
                    <span className="shipping-option-label">{opt.label}</span>
                    <span className="shipping-option-price">
                      {opt.price === 0 ? "Free" : formatNaira(opt.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="checkout-actions">
              <Button type="button" onClick={handleCardPayment} disabled={placing}>
                {placing ? "Processing…" : "Pay with card"}
              </Button>
              <Button type="button" variant="outline" onClick={handleBankTransferPayment} disabled={placing}>
                {placing ? "Processing…" : "Pay by bank transfer"}
              </Button>
              <Button type="button" variant="outline" onClick={handleWhatsAppOrder}>
                Order via WhatsApp
              </Button>
            </div>
          </form>
        </div>

        <aside className="summary">
          <p className="eyebrow">Order summary</p>

          {items.map((i) => (
            <div className="summary-item" key={i.key}>
              <span>{i.name} × {i.quantity}</span>
              <strong>{formatNaira(i.price * i.quantity)}</strong>
            </div>
          ))}

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>{formatNaira(subtotal)}</strong>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <strong>{shipping.price === 0 ? "Free" : formatNaira(shipping.price)}</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>{formatNaira(grandTotal)}</strong>
          </div>

          <Link to="/cart" className="continue-link">Back to cart</Link>
        </aside>
      </div>
    </div>
  );
}