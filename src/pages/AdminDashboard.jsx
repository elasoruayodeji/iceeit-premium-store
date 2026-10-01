import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const TABS = ["incoming", "pending", "settled"];

// Format naira
function formatNaira(n) {
  return "₦" + Number(n || 0).toLocaleString("en-NG");
}

// Clean phone for WhatsApp link
function whatsappLink(phone, order) {
  const clean = String(phone || "").replace(/\D/g, "");
  // Add Nigeria country code if missing
  const num = clean.startsWith("234") ? clean : `234${clean.replace(/^0/, "")}`;
  const msg = `Hello ${order.customer_name}, this is ICEEIT. Just reaching out about your order (${order.items?.split("\n")[0] || "your order"}).`;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("incoming");
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setCheckingAuth(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) navigate("/admin/login");
      }
    );
    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  async function loadOrders() {
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setOrders(data);
    setLoadingOrders(false);
  }

  useEffect(() => {
    if (!checkingAuth) loadOrders();
  }, [checkingAuth]);

  async function updateStatus(orderId, newStatus) {
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    loadOrders();
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  if (checkingAuth) return null;

  // ---------- Stats ----------
  const now = new Date();
  const thisMonthOrders = orders.filter((o) => {
    const d = new Date(o.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const thisMonthRevenue = thisMonthOrders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0
  );
  const incomingCount = orders.filter((o) => o.status === "incoming").length;

  const visibleOrders = orders.filter((o) => o.status === activeTab);
  const counts = TABS.reduce((acc, tab) => {
    acc[tab] = orders.filter((o) => o.status === tab).length;
    return acc;
  }, {});

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Orders</h1>
        <button className="text-link" onClick={handleSignOut}>Sign out</button>
      </div>

      {/* ============ STATS BAR ============ */}
      <div className="admin-stats">
        <div className="admin-stat">
          <span>Total Revenue</span>
          <strong>{formatNaira(totalRevenue)}</strong>
          <small>{orders.length} orders all-time</small>
        </div>
        <div className="admin-stat">
          <span>This Month</span>
          <strong>{formatNaira(thisMonthRevenue)}</strong>
          <small>{thisMonthOrders.length} orders</small>
        </div>
        <div className="admin-stat admin-stat--accent">
          <span>Incoming</span>
          <strong>{incomingCount}</strong>
          <small>need your attention</small>
        </div>
      </div>

      {/* ============ TABS ============ */}
      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`pill ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab] || 0})
          </button>
        ))}
      </div>

      {loadingOrders && <p>Loading orders...</p>}

      {!loadingOrders && visibleOrders.length === 0 && (
        <p className="empty-state">No {activeTab} orders.</p>
      )}

      {/* ============ ORDERS ============ */}
      <div className="admin-order-list">
        {visibleOrders.map((order) => (
          <div className="admin-order-card" key={order.id}>
            <div className="admin-order-top">
              <strong>{order.customer_name}</strong>
              <span>{new Date(order.created_at).toLocaleString()}</span>
            </div>
            <p>{order.phone} · {order.email}</p>
            <p>{order.address}</p>
            <pre className="admin-order-items">{order.items}</pre>
            <p><strong>Total: {formatNaira(order.total)}</strong> — {order.payment_method}</p>
            {order.notes && <p>Notes: {order.notes}</p>}

            <div className="admin-order-actions">
              {order.phone && (
                <a
                  className="btn btn-whatsapp"
                  href={whatsappLink(order.phone, order)}
                  target="_blank"
                  rel="noreferrer"
                >
                  💬 WhatsApp Customer
                </a>
              )}
              {activeTab !== "incoming" && (
                <button
                  className="btn btn-outline"
                  onClick={() => updateStatus(order.id, "incoming")}
                >
                  Mark Incoming
                </button>
              )}
              {activeTab !== "pending" && (
                <button
                  className="btn btn-outline"
                  onClick={() => updateStatus(order.id, "pending")}
                >
                  Mark Pending
                </button>
              )}
              {activeTab !== "settled" && (
                <button
                  className="btn btn-primary"
                  onClick={() => updateStatus(order.id, "settled")}
                >
                  Mark Settled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}