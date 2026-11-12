"use client";
import { useEffect, useState } from "react";
import styles from "./valientes.module.css";

// Jueves 12 de noviembre de 2026, 19:00 (reunión de apertura), hora de Arica (UTC-3)
const TARGET = new Date("2026-11-12T19:00:00-03:00").getTime();

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <div className={styles.countdown} aria-hidden="true" style={{ minHeight: 76 }} />;

  if (now >= TARGET) {
    return (
      <div className={styles.countdown}>
        <p className={styles.countdownLive}>¡Valientes 26 ya comenzó!</p>
      </div>
    );
  }

  const t = parts(TARGET - now);
  const cells: [number, string][] = [
    [t.d, "días"],
    [t.h, "horas"],
    [t.m, "min"],
    [t.s, "seg"],
  ];

  return (
    <div className={styles.countdown} role="timer" aria-label="Cuenta regresiva para Valientes 26">
      {cells.map(([n, label]) => (
        <div key={label} className={styles.countCell}>
          <span className={styles.countNum}>{String(n).padStart(2, "0")}</span>
          <span className={styles.countLabel}>{label}</span>
        </div>
      ))}
    </div>
  );
}
