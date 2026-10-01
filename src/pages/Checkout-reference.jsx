import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { supabase } from '../lib/supabaseClient';

const WHATSAPP_NUMBER = '2348142485613';
const PAYSTACK_PUBLIC_KEY = 'pk_test_5ba40cb33253c4f6ce6a35efcfc7aaef7c63fdd1';
const FORMSPREE_URL = 'https://formspree.io/f/mppwazrd';

const BANK_NAME = 'Moniepoint';
const ACCOUNT_NAME = 'Elasoru Solomon Ayodeji';
const ACCOUNT_NUMBER = '8075690088';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', notes: '' });
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [bankError, setBankError] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validate() {
    return formRef.current.reportValidity();
  }

  function buildOrderSummary() {
    return cart
      .map((item) => `${item.name} (${item.color}) x${item.qty} — ${formatPrice(item.price * item.qty)}`)
      .join('\n');
  }

  // Saves the order into the database that powers the admin dashboard.
  // Failing silently here is intentional — it shouldn't block the customer's order
  // just because the dashboard save had a hiccup; the Formspree email still goes out.
  async function saveOrderToDatabase(method, reference = '') {
    try {
      await supabase.from('orders').insert({
        customer_name: form.name,
        phone: form.phone,
        email: form.email,
        address: `${form.address}, ${form.city}`,
        notes: form.notes,
        items: buildOrderSummary(),
        total: cartTotal,
        payment_method: method,
        reference,
        status: 'incoming',
      });
    } catch {
      // Dashboard save failing shouldn't block the order itself
    }
  }

  async function notifyOrder(method, reference = '') {
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          form: 'New order',
          paymentMethod: method,
          reference,
          customerName: form.name,
          phone: form.phone,
          email: form.email,
          address: `${form.address}, ${form.city}`,
          notes: form.notes,
          items: buildOrderSummary(),
          total: formatPrice(cartTotal),
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  function handleWhatsAppOrder() {
    if (!validate()) return;
    const message = `New order from ${form.name}\n\n${buildOrderSummary()}\n\nTotal: ${formatPrice(cartTotal)}\n\nDelivery address: ${form.address}, ${form.city}\nPhone: ${form.phone}\nNotes: ${form.notes || '-'}`;
    notifyOrder('WhatsApp');
    saveOrderToDatabase('WhatsApp');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    clearCart();
    setPlaced(true);
  }

  function handlePaystackPayment() {
    if (!validate()) return;
    if (!window.PaystackPop) {
      alert('Payment service is still loading — please wait a moment and try again.');
      return;
    }
    setPlacing(true);
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: Math.round(cartTotal * 100),
      currency: 'NGN',
      ref: 'ICEEIT_' + Date.now(),
      callback: function (response) {
        notifyOrder('Paystack (Card)', response.reference);
        saveOrderToDatabase('Paystack (Card)', response.reference);
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

  function handleShowBankDetails() {
    if (!validate()) return;
    setShowBankDetails(true);
  }

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(ACCOUNT_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail on some browsers/permissions — details are still visible to copy manually
    }
  }

  async function confirmBankTransfer() {
    setPlacing(true);
    setBankError(false);
    const ok = await notifyOrder('Bank Transfer');
    if (ok) {
      saveOrderToDatabase('Bank Transfer');
      clearCart();
      setPlaced(true);
    } else {
      setBankError(true);
    }
    setPlacing(false);
  }

  if (placed) {
    return (
      <div className="page-placeholder">
        <h1>Order placed</h1>
        <p>Thanks — we've received your order and will reach out shortly to confirm delivery.</p>
        <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page-placeholder">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        <form className="checkout-form" ref={formRef}>
          <h2>Delivery details</h2>
          <label>
            Full name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Phone number
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Delivery address
            <input type="text" name="address" value={form.address} onChange={handleChange} required />
          </label>
          <label>
            City
            <input type="text" name="city" value={form.city} onChange={handleChange} required />
          </label>
          <label>
            Delivery notes (optional)
            <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} />
          </label>
        </form>

        <div className="checkout-summary">
          <h2>Order summary</h2>
          <div className="checkout-items">
            {cart.map((item) => (
              <div className="checkout-item" key={item.lineId}>
                <span>{item.name} ({item.color}) x{item.qty}</span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          {!showBankDetails && (
            <div className="checkout-payment-options">
              <button className="btn btn-primary btn-block" onClick={handlePaystackPayment} disabled={placing}>
                {placing ? 'Processing...' : 'Pay with card'}
              </button>
              <button className="btn btn-outline btn-block" onClick={handleShowBankDetails}>
                Pay by bank transfer
              </button>
              <button className="btn btn-outline btn-block whatsapp-btn" onClick={handleWhatsAppOrder}>
                Order via WhatsApp instead
              </button>
            </div>
          )}

          {showBankDetails && (
            <div className="bank-details">
              <p className="option-label">Transfer to this account</p>
              <p>
                Bank: {BANK_NAME}<br />
                Account Name: {ACCOUNT_NAME}<br />
                Account Number: <strong>{ACCOUNT_NUMBER}</strong>
              </p>
              <button className="btn btn-outline btn-block" onClick={copyAccountNumber} type="button">
                {copied ? 'Copied!' : 'Copy account number'}
              </button>
              <p className="bank-instructions">
                Open your bank app, send {formatPrice(cartTotal)} to the account above, then confirm below.
              </p>
              <button className="btn btn-primary btn-block" onClick={confirmBankTransfer} disabled={placing}>
                {placing ? 'Confirming...' : "I've sent the transfer"}
              </button>
              {bankError && (
                <p className="newsletter-error">Couldn't confirm your order — check your connection and try again.</p>
              )}
              <button className="text-link" onClick={() => setShowBankDetails(false)} type="button">
                Back to payment options
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
