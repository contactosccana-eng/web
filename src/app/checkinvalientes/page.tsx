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

export default function CheckinValientesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [filtered, setFiltered] = useState<Attendee[]>([]);
  const [search, setSearch] = useState("");
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

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
    const q = search.toLowerCase();
    setFiltered(
      attendees.filter(
        (a) =>
          a.nombre.toLowerCase().includes(q) ||
          a.apellido.toLowerCase().includes(q) ||
          a.congregacion.toLowerCase().includes(q) ||
          a.ciudad.toLowerCase().includes(q)
      )
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
        </div>
      )}
    </div>
  );
}
