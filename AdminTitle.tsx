import React from "react";
import { Link } from "react-router-dom";

export type Action = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

type AdminTileProps = {
  title: string;
  actions: Action[];
};

export default function AdminTitle({ title, actions }: AdminTileProps) {
  return (
    <div style={styles.tile}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.subtitle}>Manage {title.toLowerCase()}</p>
        </div>
        <div style={styles.count}>{actions.length} actions</div>
      </div>
      <div style={styles.actions}>
        {actions.map((a) => (
          <Link key={a.label} to={a.to} style={styles.actionLink}>
            <div style={styles.iconWrapper}>{a.icon}</div>
            <span style={styles.label}>{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  tile: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    border: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 18, fontWeight: 600, margin: 0 },
  subtitle: { fontSize: 12, color: "#888", margin: 0 },
  count: { fontSize: 12, color: "#aaa" },
  actions: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 },
  actionLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 12,
    textDecoration: "none",
    color: "#444",
    transition: "background 0.2s",
  },
  iconWrapper: { backgroundColor: "#fde2ed", padding: 6, borderRadius: 8, display: "flex" },
  label: { fontSize: 14, fontWeight: 500 },
};
