import React from "react";

type Props = {
  title: string;
  value: number;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.title}>{title}</div>
      <div style={styles.value}>${value}</div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: { padding: 12, borderRadius: 12, backgroundColor: "#fde2ed", textAlign: "center" },
  title: { fontSize: 12, color: "#888" },
  value: { fontSize: 16, fontWeight: 600, color: "#ec4899" },
};
