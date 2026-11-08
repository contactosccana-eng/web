"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Attendee {
  id: string;
  nombre: string;
  apellido: string;
  congregacion: string;
  ciudad: string;
  pais: string;
  telefono: string;
  checkIn: boolean;
  confirmado: boolean;
  comprobanteUrl?: string;
}

const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        return sessionStorage.getItem(key);
      }
    } catch (e) {
      console.warn("sessionStorage no disponible:", e);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        sessionStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn("sessionStorage no disponible:", e);
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        sessionStorage.removeItem(key);
      }
    } catch (e) {
      console.warn("sessionStorage no disponible:", e);
    }
  }
};

// ---------- Listado en imagen (1080 px de ancho, estilo /valientes) ----------
const IMG_W = 1080;
const C_GOLD = "#ffc20e";
const C_INK = "#0b0a08";
const C_BONE = "#f4efe6";
const C_MUTE = "#b9b2a3";
const C_LINE = "rgba(255,255,255,0.14)";

const noAccents = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const titleCase = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
const loadImg = (src: string) =>
  new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });

function fitText(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + "…").width > maxW) t = t.slice(0, -1);
  return t.trimEnd() + "…";
}

function setSpacing(ctx: CanvasRenderingContext2D, px: number) {
  (ctx as unknown as { letterSpacing: string }).letterSpacing = `${px}px`;
}

async function buildListadoImage(
  rows: Attendee[],
  query: string,
  opts: { phone: boolean; status: boolean }
): Promise<string> {
  const font = new FontFace("Long Shot", "url(/fonts/LongShot.ttf)");
  await font.load();
  document.fonts.add(font);
  await Promise.all([document.fonts.load("800 32px Montserrat"), document.fonts.load("500 22px Montserrat")]);
  const [hero, logo] = await Promise.all([loadImg("/valientes/hero.jpg"), loadImg("/logo.png").catch(() => null)]);

  const sorted = [...rows].sort((a, b) =>
    `${a.apellido} ${a.nombre}`.localeCompare(`${b.apellido} ${b.nombre}`, "es", { sensitivity: "base" })
  );

  const HERO_H = 440;
  const HEAD_H = 250;
  const ROW_H = 100;
  const FOOT_H = 100;
  const total = HERO_H + HEAD_H + sorted.length * ROW_H + 50 + FOOT_H;

  const canvas = document.createElement("canvas");
  canvas.width = IMG_W;
  canvas.height = total;
  const ctx = canvas.getContext("2d")!;
  ctx.textBaseline = "alphabetic";

  // Fondo
  ctx.fillStyle = C_INK;
  ctx.fillRect(0, 0, IMG_W, total);

  // Hero con la bandera
  const sc = Math.max(IMG_W / hero.width, HERO_H / hero.height);
  const hw = hero.width * sc;
  const hh = hero.height * sc;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, IMG_W, HERO_H);
  ctx.clip();
  ctx.drawImage(hero, (IMG_W - hw) / 2, -(hh - HERO_H) * 0.3, hw, hh);
  ctx.restore();
  const g = ctx.createLinearGradient(0, 0, 0, HERO_H);
  g.addColorStop(0, "rgba(11,10,8,0.10)");
  g.addColorStop(0.55, "rgba(11,10,8,0.45)");
  g.addColorStop(1, "rgba(11,10,8,1)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, IMG_W, HERO_H);

  if (logo) {
    const lw = 170;
    ctx.drawImage(logo, 48, 40, lw, (logo.height / logo.width) * lw);
  }

  // Título VALIENTES 26
  ctx.font = '150px "Long Shot"';
  ctx.fillStyle = C_GOLD;
  const t1 = "VALIENTES";
  ctx.fillText(t1, 48, HERO_H - 92);
  const w1 = ctx.measureText(t1 + " ").width;
  ctx.fillStyle = C_BONE;
  ctx.fillText("26", 48 + w1, HERO_H - 92);

  setSpacing(ctx, 2);
  ctx.font = '800 23px Montserrat, sans-serif';
  ctx.fillStyle = C_BONE;
  ctx.fillText("12–15 NOV   ·   CAMPUS LLUTA KM 15   ·   ARICA", 48, HERO_H - 44);
  setSpacing(ctx, 0);

  // Encabezado del listado
  const y0 = HERO_H;
  ctx.fillStyle = C_GOLD;
  ctx.fillRect(48, y0 + 52, 36, 3);
  setSpacing(ctx, 5);
  ctx.font = '800 22px Montserrat, sans-serif';
  ctx.fillText("LISTADO", 100, y0 + 62);
  setSpacing(ctx, 0);

  ctx.font = '92px "Long Shot"';
  ctx.fillStyle = C_BONE;
  const title = noAccents((query || "TODOS LOS INSCRITOS").toUpperCase());
  ctx.fillText(fitText(ctx, title, IMG_W - 96), 48, y0 + 158);

  ctx.font = '600 26px Montserrat, sans-serif';
  ctx.fillStyle = C_MUTE;
  ctx.fillText(
    `${sorted.length} ${sorted.length === 1 ? "participante" : "participantes"}  ·  orden alfabético`,
    48,
    y0 + 206
  );

  // Filas
  const top = y0 + HEAD_H;
  sorted.forEach((a, i) => {
    const y = top + i * ROW_H;
    ctx.fillStyle = C_LINE;
    ctx.fillRect(48, y, IMG_W - 96, 1);

    ctx.font = '48px "Long Shot"';
    ctx.fillStyle = C_GOLD;
    ctx.fillText(String(i + 1).padStart(2, "0"), 48, y + 62);

    const statusW = opts.status ? 210 : 0;
    const maxW = IMG_W - 150 - 48 - statusW;

    ctx.font = '800 32px Montserrat, sans-serif';
    ctx.fillStyle = C_BONE;
    ctx.fillText(fitText(ctx, titleCase(`${a.nombre} ${a.apellido}`.trim()), maxW), 150, y + 46);

    const sub = [a.congregacion && titleCase(a.congregacion), a.ciudad && titleCase(a.ciudad), opts.phone ? a.telefono : ""]
      .filter(Boolean)
      .join("  ·  ");
    ctx.font = '500 22px Montserrat, sans-serif';
    ctx.fillStyle = C_MUTE;
    ctx.fillText(fitText(ctx, sub, maxW), 150, y + 80);

    if (opts.status) {
      const label = a.checkIn ? "ADENTRO" : a.confirmado ? "CONFIRMADO" : "PENDIENTE";
      const color = a.checkIn ? "#22c55e" : a.confirmado ? C_GOLD : C_MUTE;
      setSpacing(ctx, 2);
      ctx.font = '800 18px Montserrat, sans-serif';
      const tw = ctx.measureText(label).width;
      const bx = IMG_W - 48 - tw - 28;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, y + 30, tw + 28, 40);
      ctx.fillStyle = color;
      ctx.fillText(label, bx + 14, y + 57);
      setSpacing(ctx, 0);
    }
  });
  ctx.fillStyle = C_LINE;
  ctx.fillRect(48, top + sorted.length * ROW_H, IMG_W - 96, 1);

  // Pie dorado
  const fy = total - FOOT_H;
  ctx.fillStyle = C_GOLD;
  ctx.fillRect(0, fy, IMG_W, FOOT_H);
  ctx.fillStyle = "#111";
  ctx.font = '800 30px Montserrat, sans-serif';
  setSpacing(ctx, 2);
  const foot = "COMUARICA.CL/VALIENTES  ·  @COMUARICA";
  ctx.fillText(foot, (IMG_W - ctx.measureText(foot).width) / 2, fy + 60);
  setSpacing(ctx, 0);

  return canvas.toDataURL("image/png");
}

export default function CheckinValientesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [filtered, setFiltered] = useState<Attendee[]>([]);
  const [search, setSearch] = useState("");
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  const [listadoUrl, setListadoUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [optPhone, setOptPhone] = useState(false);
  const [optStatus, setOptStatus] = useState(false);

  // Fecha de apertura de ingresos para VALIENTES 26: 12 de Noviembre de 2026
  const OPEN_DATE = new Date("2026-11-12T00:00:00");
  const isBeforeOpenDate = new Date() < OPEN_DATE;

  useEffect(() => {
    const auth = safeSessionStorage.getItem("comuarica_valientes_staff_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      startPolling();
    }
    return () => stopPolling();
  }, []);

  const startPolling = () => {
    fetchAttendees();
    if (pollingInterval.current) clearInterval(pollingInterval.current);
    pollingInterval.current = setInterval(fetchAttendees, 10000);
  };

  const stopPolling = () => {
    if (pollingInterval.current) clearInterval(pollingInterval.current);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.toLowerCase() === "staff" || passwordInput.toLowerCase() === "staff2026" || passwordInput.toLowerCase() === "valientes2026") {
      setIsAuthenticated(true);
      safeSessionStorage.setItem("comuarica_valientes_staff_auth", "true");
      startPolling();
    } else {
      setLoginError("Contraseña incorrecta.");
    }
  };

  const handleLogout = () => {
    safeSessionStorage.removeItem("comuarica_valientes_staff_auth");
    setIsAuthenticated(false);
    stopPolling();
  };

  const fetchAttendees = async () => {
    if (syncingId) return;
    try {
      const res = await fetch("/api/attendees-valientes");
      const data = await res.json();
      if (data.attendees) {
        setAttendees(data.attendees);
      }
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  useEffect(() => {
    // Búsqueda sin distinguir tildes ni mayúsculas; cada palabra escrita debe aparecer en algún dato.
    const norm = (s: string) => noAccents(String(s ?? "").toLowerCase()).replace(/\s+/g, " ").trim();
    const terms = norm(search).split(" ").filter(Boolean);
    setFiltered(
      attendees.filter((a) => {
        if (terms.length === 0) return true;
        const hay = norm(`${a.nombre} ${a.apellido} ${a.congregacion} ${a.ciudad} ${a.pais} ${a.telefono}`);
        return terms.every((t) => hay.includes(t));
      })
    );
  }, [search, attendees]);

  const toggleCheckIn = async (id: string, currentStatus: boolean) => {
    if (isBeforeOpenDate) return;
    setSyncingId(id);
    const action = currentStatus ? 'uncheck' : 'checkin';
    setAttendees(prev => prev.map(a => a.id === id ? { ...a, checkIn: !currentStatus } : a));
    try {
      const res = await fetch("/api/attendees-valientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id })
      });
      const data = await res.json();
      if (!data.success) {
        setAttendees(prev => prev.map(a => a.id === id ? { ...a, checkIn: currentStatus } : a));
      }
    } catch (error) {
      console.error("Error updating checkin:", error);
      setAttendees(prev => prev.map(a => a.id === id ? { ...a, checkIn: currentStatus } : a));
    } finally {
      setSyncingId(null);
    }
  };

  const handleConfirmRegistration = async (id: string, nombre: string) => {
    const confirmed = window.confirm(`¿Estás seguro que quieres CONFIRMAR el registro de ${nombre} para VALIENTES 26?\n\nSe enviará un correo electrónico de confirmación automáticamente.`);
    if (!confirmed) return;

    setSyncingId(id);
    try {
      const res = await fetch("/api/attendees-valientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'confirm', id })
      });
      const data = await res.json();
      if (data.success) {
        setAttendees(prev => prev.map(a => a.id === id ? { ...a, confirmado: true } : a));
        alert(`¡Registro confirmado y correo enviado a ${nombre}!`);
      } else {
        alert("Error al confirmar: " + (data.message || "desconocido"));
      }
    } catch (error) {
      console.error("Error confirming registration:", error);
      alert("Error de conexión al intentar confirmar.");
    } finally {
      setSyncingId(null);
    }
  };

  const handleListado = async () => {
    if (!filtered.length) return;
    setGenerating(true);
    try {
      setListadoUrl(await buildListadoImage(filtered, search.trim(), { phone: optPhone, status: optStatus }));
    } catch (e) {
      console.error("Error creando listado:", e);
      alert("No se pudo crear la imagen. Intenta de nuevo.");
    } finally {
      setGenerating(false);
    }
  };

  const downloadListado = () => {
    if (!listadoUrl) return;
    const slug = noAccents(search.trim().toLowerCase()).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "todos";
    const a = document.createElement("a");
    a.href = listadoUrl;
    a.download = `valientes-listado-${slug}.png`;
    a.click();
  };

  const checkedInCount = attendees.filter(a => a.checkIn).length;
  const confirmedCount = attendees.filter(a => a.confirmado).length;

  return (
    <div className="checkin-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        .checkin-wrapper {
          min-height: 100vh;
          background-color: #0b0f19;
          color: #f8fafc;
          font-family: 'PP Neue Machina', sans-serif;
          padding: 40px 20px;
        }

        .login-card {
          max-width: 420px;
          margin: 10vh auto;
          background: #111827;
          padding: 40px;
          border-radius: var(--radius, 12px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(217, 119, 6, 0.2);
          text-align: center;
        }

        .login-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #f59e0b;
          margin-bottom: 8px;
        }

        .login-subtitle {
          color: #9ca3af;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .attendee-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #111827;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 12px;
          transition: all 0.2s ease;
        }
        .attendee-card:hover {
          border-color: rgba(217, 119, 6, 0.4);
        }
        .attendee-card.checked {
          background: rgba(217, 119, 6, 0.05);
          border-color: rgba(217, 119, 6, 0.4);
        }

        .attendee-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .attendee-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
          flex-shrink: 0;
          color: #f59e0b;
        }

        .attendee-card.confirmed .attendee-avatar {
          background: #d97706;
          color: #ffffff;
        }

        .attendee-name {
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .attendee-details-line {
          font-size: 13px;
          color: #9ca3af;
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .actions-group {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .btn-ui {
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          border: 1px solid transparent;
          font-family: inherit;
        }

        .btn-amber {
          background-color: #d97706;
          color: white;
        }
        .btn-amber:hover {
          background-color: #b45309;
        }

        .btn-green {
          background-color: #22c55e;
          color: white;
        }
        .btn-green:disabled {
          background-color: #374151;
          cursor: not-allowed;
          opacity: 0.5;
        }

        .btn-dark {
          background-color: #1f2937;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #f3f4f6;
        }
        .btn-dark:hover {
          background-color: #374151;
        }

        .input-field {
          width: 100%;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: #0b0f19;
          color: #f8fafc;
          margin-bottom: 16px;
          outline: none;
          font-family: inherit;
        }
        .input-field:focus {
          border-color: #f59e0b;
        }

        .btn-primary-login {
          width: 100%;
          padding: 16px;
          background-color: #d97706;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .btn-primary-login:hover {
          background-color: #b45309;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: #111827;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
        }

        .results-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 24px;
        }
        .results-count {
          font-size: 14px;
          color: #9ca3af;
        }
        .results-count strong {
          color: #ffc20e;
          font-size: 18px;
        }
        .results-tools {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 18px;
        }
        .check-opt {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #cbd5e1;
          cursor: pointer;
        }
        .check-opt input {
          accent-color: #ffc20e;
          width: 16px;
          height: 16px;
        }
        .btn-gold {
          background-color: #ffc20e;
          color: #111;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .btn-gold:hover:not(:disabled) {
          background-color: #ffd23f;
        }
        .btn-gold:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .modal-back {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.82);
          z-index: 300;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          overflow-y: auto;
          padding: 24px 16px;
        }
        .modal-box {
          width: 100%;
          max-width: 560px;
          background: #0b0a08;
          border: 1px solid rgba(255, 194, 14, 0.35);
          border-radius: 12px;
          padding: 18px;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .modal-box img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 6px;
        }

        .badge-confirmed {
          font-size: 10px;
          background: #d97706;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          margin-left: 10px;
          text-transform: uppercase;
        }

        @media (max-width: 800px) {
          .attendee-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .actions-group {
            width: 100%;
            flex-wrap: wrap;
          }
          .actions-group .btn-ui {
            flex: 1;
          }
        }
      `}} />

      {!isAuthenticated ? (
        <div className="login-card">
          <Link href="/" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>
            ← Volver al sitio
          </Link>
          <h1 className="login-title">VALIENTES 26</h1>
          <p className="login-subtitle">Acceso exclusivo para el staff del evento</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Contraseña del Staff" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)} 
              className="input-field" 
            />
            {loginError && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px' }}>{loginError}</p>}
            <button type="submit" className="btn-primary-login">Entrar al Panel</button>
          </form>
        </div>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
            <div>
              <Link href="/" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                ← Volver al sitio
              </Link>
              <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#f59e0b', margin: 0 }}>
                Control VALIENTES 26
              </h1>
            </div>
            <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>
              CERRAR SESIÓN
            </button>
          </header>

          <div className="stats-grid">
            <div className="stat-card">
              <h3 style={{ fontSize: '13px', opacity: 0.7, margin: '0 0 8px 0' }}>REGISTRADOS</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{attendees.length}</p>
            </div>
            <div className="stat-card">
              <h3 style={{ fontSize: '13px', opacity: 0.7, margin: '0 0 8px 0' }}>CONFIRMADOS (EMAIL)</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>{confirmedCount}</p>
            </div>
            <div className="stat-card">
              <h3 style={{ fontSize: '13px', opacity: 0.7, margin: '0 0 8px 0' }}>INGRESADOS (12 NOV)</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>{checkedInCount}</p>
            </div>
          </div>

          {isBeforeOpenDate && (
            <div style={{ background: 'rgba(217, 119, 6, 0.1)', border: '1px solid #d97706', padding: '15px', borderRadius: '10px', marginBottom: '30px', color: '#f59e0b', textAlign: 'center', fontSize: '14px' }}>
              ⚠️ El sistema de <strong>Ingreso (Check-in)</strong> se habilitará el <strong>12 de Noviembre de 2026</strong>. Por ahora puedes gestionar las confirmaciones de correo.
            </div>
          )}

          <input
            type="text"
            placeholder="Buscar por nombre, ciudad o iglesia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            style={{ marginBottom: '30px' }}
          />

          <div className="results-bar">
            <div className="results-count">
              <strong>{filtered.length}</strong> {filtered.length === 1 ? "resultado" : "resultados"}
              {search.trim() && <> para &quot;{search.trim()}&quot;</>}
            </div>
            <div className="results-tools">
              <label className="check-opt">
                <input type="checkbox" checked={optPhone} onChange={(e) => setOptPhone(e.target.checked)} />
                Incluir teléfono
              </label>
              <label className="check-opt">
                <input type="checkbox" checked={optStatus} onChange={(e) => setOptStatus(e.target.checked)} />
                Incluir estado
              </label>
              <button
                onClick={handleListado}
                disabled={generating || filtered.length === 0}
                className="btn-ui btn-gold"
              >
                {generating ? "Creando..." : "Crear listado en imagen"}
              </button>
            </div>
          </div>

          <div className="attendee-list">
            {filtered.map((attendee) => (
              <div key={attendee.id} className={`attendee-card ${attendee.confirmado ? 'confirmed' : ''} ${attendee.checkIn ? 'checked' : ''}`}>
                <div className="attendee-info">
                  <div className="attendee-avatar">
                    {attendee.nombre.charAt(0)}
                  </div>
                  <div>
                    <div className="attendee-name">
                      {attendee.nombre} {attendee.apellido}
                      {attendee.confirmado && <span className="badge-confirmed">Confirmado</span>}
                    </div>
                    <div className="attendee-details-line">
                      <span>{attendee.congregacion}</span>
                      {attendee.ciudad && <span>• {attendee.ciudad}</span>}
                      {attendee.pais && <span>/ {attendee.pais}</span>}
                      {attendee.telefono && <span>• {attendee.telefono}</span>}
                    </div>
                  </div>
                </div>

                <div className="actions-group">
                  {attendee.comprobanteUrl && attendee.comprobanteUrl !== "undefined" && (
                    <a href={attendee.comprobanteUrl} target="_blank" rel="noopener noreferrer" className="btn-ui btn-dark">
                      Ver Pago
                    </a>
                  )}

                  {!attendee.confirmado && (
                    <button 
                      onClick={() => handleConfirmRegistration(attendee.id, attendee.nombre)}
                      disabled={syncingId === attendee.id}
                      className="btn-ui btn-amber"
                    >
                      {syncingId === attendee.id ? "..." : "Confirmar Registro"}
                    </button>
                  )}
                  
                  <button 
                    onClick={() => toggleCheckIn(attendee.id, attendee.checkIn)}
                    disabled={isBeforeOpenDate || syncingId === attendee.id}
                    className="btn-ui btn-green"
                    title={isBeforeOpenDate ? "Habilitado el 12 de Noviembre" : ""}
                  >
                    {attendee.checkIn ? "✓ Adentro" : "Dar Ingreso"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {listadoUrl && (
            <div className="modal-back" onClick={() => setListadoUrl(null)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="modal-actions">
                  <button onClick={downloadListado} className="btn-ui btn-gold">Descargar PNG (1080 px)</button>
                  <button onClick={() => setListadoUrl(null)} className="btn-ui btn-dark">Cerrar</button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={listadoUrl} alt="Listado de participantes de Valientes 26" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
