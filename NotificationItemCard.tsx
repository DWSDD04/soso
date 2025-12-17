import React from "react";
import { Bell, XSquare } from "lucide-react";

type NotificationItem = {
  id?: string | number | null;
  message?: string;
  read?: boolean;
  timestamp?: string | number;
};

type Props = {
  notif: NotificationItem;
  selected: boolean;
  onToggle: () => void;
  onMarkRead: () => void;
  onDelete: () => void;
};

export default function NotificationItemCard({ notif, selected, onToggle, onMarkRead, onDelete }: Props) {
  const idStr = notif.id?.toString() ?? `no-id-${Math.random()}`;

  return (
    <div style={{ ...styles.card, opacity: notif.read ? 0.7 : 1 }}>
      <input type="checkbox" checked={selected} onChange={onToggle} style={styles.checkbox} />
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.messageWrapper}>
            <Bell style={styles.icon} />
            <p style={styles.message}>{notif.message}</p>
          </div>
          <small style={styles.timestamp}>{new Date(notif.timestamp ?? Date.now()).toLocaleString()}</small>
        </div>
        <div style={styles.actions}>
          {!notif.read && <button style={styles.button} onClick={onMarkRead}>Mark read</button>}
          <button style={styles.button} onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: { display: "flex", gap: 8, padding: 12, backgroundColor: "#fff", borderRadius: 12, border: "1px solid #eee" },
  checkbox: { marginTop: 6 },
  content: { flex: 1, display: "flex", flexDirection: "column", gap: 6 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  messageWrapper: { display: "flex", alignItems: "center", gap: 6 },
  icon: { color: "#ec4899", width: 20, height: 20 },
  message: { margin: 0, fontSize: 14, color: "#333" },
  timestamp: { fontSize: 12, color: "#888" },
  actions: { display: "flex", gap: 6 },
  button: { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #ccc", backgroundColor: "#f9f9f9" },
};
