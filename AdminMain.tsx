import React, { useEffect, useMemo, useState, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Trash2, Edit2, Eye, XSquare, BarChart2, RefreshCw } from "lucide-react";

import AdminTile, { type Action } from "../components/AdminTitle";
import NotificationItemCard from "../components/NotificationItemCard";
import StatsCard from "../components/StatsCard";

/* ----- Types ----- */
type RawNotif = {
  id?: string | number | null;
  NotificationID?: string | number | null;
  _id?: string | number | null;
  message?: string;
  read?: boolean;
  timestamp?: string | number;
  [k: string]: any;
};

type NotificationItem = RawNotif & { id: string | null };

/* ----- GraphQL (plain fetch) ----- */
const GRAPHQL_URL = "http://localhost:3000/graphql";

const GET_NOTIFICATIONS = `
  query notifications {
    notifications {
      NotificationID
      id
      _id
      message
      read
      timestamp
    }
  }
`;

const CREATE_NOTIFICATION = `
  mutation createNotification($data: CreateNotificationDTO!) {
    createNotification(data: $data) {
      NotificationID
      id
      _id
      message
      read
      timestamp
    }
  }
`;

const UPDATE_NOTIFICATION = `
  mutation updateNotificationByID($data: UpdateNotificationDTO!) {
    updateNotificationByID(data: $data) {
      NotificationID
      id
      _id
      message
      read
      timestamp
    }
  }
`;

const DELETE_NOTIFICATION = `
  mutation deleteNotificationByID($id: Int!) {
    deleteNotificationByID(id: $id)
  }
`;

async function gqlRequest<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

/* ----- Admin Dashboard ----- */
export default function AdminDashboard() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [queryText, setQueryText] = useState("");
  const [onlyUnread, setOnlyUnread] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({ today: 0, week: 0, month: 0 });
  const [modal, setModal] = useState<{ open: boolean; type: string | null }>({ open: false, type: null });

  // interval ref for polling
  const pollRef = useRef<number | null>(null);

  const adminTiles: { title: string; actions: Action[] }[] = [
    {
      title: "Products",
      actions: [
        { to: "/addproduct", label: "Add", icon: <PlusCircle /> },
        { to: "/deleteproduct", label: "Delete", icon: <Trash2 /> },
        { to: "/updateproduct", label: "Update", icon: <Edit2 /> },
        { to: "/viewproduct", label: "View", icon: <Eye /> },
      ],
    },
    {
      title: "Services",
      actions: [
        { to: "/addservice", label: "Add", icon: <PlusCircle /> },
        { to: "/deleteservice", label: "Delete", icon: <Trash2 /> },
        { to: "/updateservice", label: "Update", icon: <Edit2 /> },
        { to: "/viewservice", label: "View", icon: <Eye /> },
      ],
    },
    {
      title: "Appointments",
      actions: [
        { to: "/addappointment", label: "Add", icon: <PlusCircle /> },
        { to: "/deleteappointment", label: "Delete", icon: <Trash2 /> },
        { to: "/updateappointment", label: "Update", icon: <Edit2 /> },
        { to: "/viewappointment", label: "View", icon: <Eye /> },
      ],
    },
  ];

  const getNotifId = (n: RawNotif) => n.id?.toString() ?? n.NotificationID?.toString() ?? n._id?.toString() ?? null;

  /* ----- Fetch & Polling (GraphQL via fetch) ----- */
  const fetchNotifications = async () => {
    setLoadingLocal(true);
    try {
      const data = await gqlRequest<{ notifications: RawNotif[] }>(GET_NOTIFICATIONS);
      const arr = Array.isArray(data?.notifications) ? data.notifications : [];
      const normalized: NotificationItem[] = arr.map((n) => ({ ...n, id: getNotifId(n) }));
      setNotifications(normalized);
    } catch (err) {
      console.error("fetchNotifications error:", err);
    } finally {
      setLoadingLocal(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/incomes/count");
      const json = await res.json();
      setStats({ today: json.today || 0, week: json.week || 0, month: json.total || 0 });
    } catch (err) {
      console.error("fetchStats error:", err);
    }
  };

  const refresh = async () => {
    setLoadingLocal(true);
    try {
      await Promise.all([fetchNotifications(), fetchStats()]);
    } finally {
      setLoadingLocal(false);
    }
  };

  useEffect(() => {
    // initial fetch
    fetchNotifications();
    fetchStats();

    // polling fallback (5s)
    pollRef.current = window.setInterval(fetchNotifications, 5000);

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ----- Actions ----- */
  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  const markRead = async (notif: NotificationItem) => {
    const id = notif.id ?? getNotifId(notif);
    if (!id) return;

    // optimistic update
    setNotifications((prev) => prev.map((n) => (getNotifId(n) === id ? { ...n, read: true } : n)));

    try {
      await gqlRequest(UPDATE_NOTIFICATION, { data: { NotificationID: Number(id), read: true } });
    } catch (err) {
      console.error("markRead failed:", err);
      await fetchNotifications();
    }
  };

  const deleteNotification = async (notif: RawNotif) => {
    const id = getNotifId(notif);
    if (!id) return;

    // optimistic update
    setNotifications((prev) => prev.filter((n) => getNotifId(n) !== id));
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });

    try {
      await gqlRequest(DELETE_NOTIFICATION, { id: Number(id) });
    } catch (err) {
      console.error("deleteNotification failed:", err);
      await fetchNotifications();
    }
  };

  const markSelectedRead = async () => {
    const ids = Array.from(selected);
    if (!ids.length) return;

    setNotifications((prev) => prev.map((n) => (ids.includes(getNotifId(n) ?? "") ? { ...n, read: true } : n)));
    setSelected(new Set());

    try {
      await Promise.all(
        ids.map((id) => gqlRequest(UPDATE_NOTIFICATION, { data: { NotificationID: Number(id), read: true } }))
      );
    } catch (err) {
      console.error("markSelectedRead failed:", err);
      await fetchNotifications();
    }
  };

  const deleteSelected = async () => {
    const ids = Array.from(selected);
    if (!ids.length) return;

    setNotifications((prev) => prev.filter((n) => !ids.includes(getNotifId(n) ?? "")));
    setSelected(new Set());

    try {
      await Promise.all(ids.map((id) => gqlRequest(DELETE_NOTIFICATION, { id: Number(id) })));
    } catch (err) {
      console.error("deleteSelected failed:", err);
      await fetchNotifications();
    }
  };

  /* ----- Filtered notifications ----- */
  const filtered = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    return notifications.filter((n) => (!onlyUnread || !n.read) && (!q || (n.message ?? "").toLowerCase().includes(q)));
  }, [notifications, queryText, onlyUnread]);

  /* ----- Sparkline ----- */
  const Sparkline: React.FC<{ values?: number[] }> = ({ values = [] }) => {
    if (!values.length) return <div style={{ height: 24 }} />;
    const w = 120,
      h = 30;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const pts = values
      .map((v, i) => `${(i / (values.length - 1)) * w},${max === min ? h / 2 : h - ((v - min) / (max - min)) * h}`)
      .join(" ");
    return (
      <svg width={w} height={h}>
        <polyline fill="none" stroke="#ec4899" strokeWidth={2} points={pts} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  /* ----- Modal ----- */
  const Modal: React.FC<{ open: boolean; onClose: () => void; children?: ReactNode; title?: string }> = ({ open, onClose, children, title }) => (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.modalOverlay}>
          <div style={styles.modalBg} onClick={onClose} />
          <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }} style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{title}</h3>
              <button onClick={onClose} style={styles.modalClose}>
                <XSquare />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const AddNotificationForm: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
  const [appointmentID, setAppointmentID] = useState<number | "">("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !appointmentID) return alert("Please fill in all fields.");
    setBusy(true);
    try {
      await gqlRequest(CREATE_NOTIFICATION, {
        data: {
          AppointmentID: Number(appointmentID),
          message: text,
        },
      });
      setText("");
      setAppointmentID("");
      onDone?.();
      await fetchNotifications(); // refresh the notifications list
    } catch (err) {
      console.error("createNotification failed:", err);
      alert("Failed to send notification.");
    } finally {
      setBusy(false);
    }

    
  };

  console.log("Mutation variables:", {
  data: {
    AppointmentID: Number(appointmentID),
    message: text,
  },
});

  return (
    <form onSubmit={submit} style={styles.form}>
      <input
        type="number"
        placeholder="Appointment ID"
        value={appointmentID}
        onChange={(e) => setAppointmentID(e.target.value ? Number(e.target.value) : "")}
        style={styles.input}
      />
      <textarea
        placeholder="Write your notification..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textarea}
      />
      <div style={styles.formActions}>
        <button type="button" style={styles.cancelBtn} onClick={() => onDone?.()}>
          Cancel
        </button>
        <button type="submit" style={styles.submitBtn} disabled={busy}>
          {busy ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
};


  /* ----- Render ----- */
  const anyLoading = loadingLocal;
  return (
    <div style={styles.page}>
      {/* HERO */}
      <header style={styles.hero}>
        <div style={styles.heroInner}>
          <div>
            <h1 style={styles.heroTitle}>Admin Dashboard</h1>
            <p style={styles.heroSubtitle}>Fast actions · realtime notifications · quick analytics</p>
          </div>
          <div style={styles.heroBtns}>
            <div style={styles.incomeStats}>
              <div style={styles.incomeLabel}>Incomes (month)</div>
              <div style={styles.incomeValue}>${stats.month}</div>
              <Sparkline values={[10, 15, 8, 20, 16, 22]} />
            </div>
            <button style={styles.iconBtn} onClick={refresh}>
              <RefreshCw />
            </button>
            <button style={styles.primaryBtn} onClick={() => setModal({ open: true, type: "addNotif" })}>
              <PlusCircle /> New
            </button>
            <button style={styles.dangerBtn} onClick={deleteSelected}>
              <Trash2 /> Delete Selected
            </button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.left}>
          <div style={styles.tiles}>{adminTiles.map((tile) => <AdminTile key={tile.title} title={tile.title} actions={tile.actions} />)}</div>

          <section>
            <h3>Notifications ({filtered.length})</h3>
            {anyLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => <div key={i} style={styles.loading} />)
              : filtered.map((n) => (
                  <NotificationItemCard
                    key={n.id ?? Math.random()}
                    notif={n}
                    selected={selected.has(n.id ?? "")}
                    onToggle={() => toggleSelect(n.id ?? "")}
                    onMarkRead={() => markRead(n)}
                    onDelete={() => deleteNotification(n)}
                  />
                ))}
          </section>
        </section>

        <aside style={styles.right}>
          <div style={styles.statsContainer}>
            <div style={styles.statsHeader}>
              <h4>Summary</h4>
              <BarChart2 />
            </div>
            <div style={styles.statsGrid}>
              <StatsCard title="Today" value={stats.today} />
              <StatsCard title="Week" value={stats.week} />
              <StatsCard title="Month" value={stats.month} />
            </div>
            <Sparkline values={[5, 12, 9, 20, 15, 18]} />
          </div>

          <div style={styles.quickLinks}>
            <h4>Quick Links</h4>
            <div>
              <Link to="/addproduct" style={styles.linkBtn}>
                <PlusCircle /> Add Product
              </Link>
              <Link to="/addservice" style={styles.linkBtn}>
                <PlusCircle /> Add Service
              </Link>
              <Link to="/addappointment" style={styles.linkBtn}>
                <PlusCircle /> Add Appointment
              </Link>
            </div>
          </div>
        </aside>
      </main>

      <Modal open={modal.open} onClose={() => setModal({ open: false, type: null })} title="New Notification">
        {modal.type === "addNotif" && <AddNotificationForm onDone={() => setModal({ open: false, type: null })} />}
      </Modal>
    </div>
  );
}

/* ----- Inline styles ----- */
const styles: { [key: string]: React.CSSProperties } = {
  page: { minHeight: "100vh", backgroundColor: "#f9fafb", color: "#1f2937" },
  hero: { backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" },
  heroInner: { maxWidth: 1200, margin: "0 auto", padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
  heroTitle: { fontSize: 32, fontWeight: 800, color: "#ec4899" },
  heroSubtitle: { marginTop: 4, fontSize: 14, color: "#6b7280" },
  heroBtns: { display: "flex", alignItems: "center", gap: 8 },
  incomeStats: { display: "flex", alignItems: "center", gap: 6, backgroundColor: "#fce7f3", padding: 8, borderRadius: 8 },
  incomeLabel: { fontSize: 10, color: "#6b7280" },
  incomeValue: { fontSize: 14, fontWeight: 600, color: "#ec4899" },
  iconBtn: { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 6, borderRadius: 6, border: "1px solid #d1d5db", backgroundColor: "#fff" },
  primaryBtn: { display: "inline-flex", alignItems: "center", gap: 4, backgroundColor: "#ec4899", color: "#fff", padding: "6px 12px", borderRadius: 6 },
  dangerBtn: { display: "inline-flex", alignItems: "center", gap: 4, backgroundColor: "#dc2626", color: "#fff", padding: "6px 12px", borderRadius: 6 },
  main: { maxWidth: 1200, margin: "0 auto", padding: 24, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 },
  left: { display: "flex", flexDirection: "column", gap: 24 },
  tiles: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 },
  right: { display: "flex", flexDirection: "column", gap: 16 },
  statsContainer: { backgroundColor: "#fff", padding: 16, borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" },
  statsHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, textAlign: "center" },
  quickLinks: { backgroundColor: "#fff", padding: 16, borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" },
  linkBtn: { display: "flex", alignItems: "center", gap: 6, color: "#ec4899", textDecoration: "none" },
  modalOverlay: { position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", padding: 16 },
  modalBg: { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" },
  modalContent: { position: "relative", backgroundColor: "#fff", borderRadius: 16, padding: 24, maxWidth: 600, width: "100%" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },

  /* Form styles */
  form: { display: "flex", flexDirection: "column", gap: 12 },
  textarea: { width: "100%", minHeight: 100, borderRadius: 8, border: "1px solid #e5e7eb", padding: 12 },
  formActions: { display: "flex", justifyContent: "flex-end", gap: 8 },
  cancelBtn: { background: "#fff", border: "1px solid #d1d5db", padding: "6px 12px", borderRadius: 8 },
  submitBtn: { background: "#ec4899", color: "#fff", padding: "6px 12px", borderRadius: 8 },

  /* Loading placeholder */
  loading: { height: 64, background: "#fff", borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 8 },

  modalTitle: { margin: 0 },
  modalClose: { background: "transparent", border: "none", cursor: "pointer" },
};
