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

// Helper para interactuar con sessionStorage de forma segura en dispositivos/navegadores antiguos (por ejemplo, Safari en modo privado)
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

export default function CheckinPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [filtered, setFiltered] = useState<Attendee[]>([]);
  const [search, setSearch] = useState("");
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  // Fecha de apertura de ingresos: 11 de Junio de 2026
  const OPEN_DATE = new Date("2026-06-11T00:00:00");
  const isBeforeOpenDate = new Date() < OPEN_DATE;

  useEffect(() => {
    const auth = safeSessionStorage.getItem("comuarica_staff_auth");
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
    if (passwordInput.toLowerCase() === "staff" || passwordInput === "comuarica2024") {
      setIsAuthenticated(true);
      safeSessionStorage.setItem("comuarica_staff_auth", "true");
      startPolling();
    } else {
      setLoginError("Contraseña incorrecta.");
    }
  };

  const handleLogout = () => {
    safeSessionStorage.removeItem("comuarica_staff_auth");
    setIsAuthenticated(false);
    stopPolling();
  };

  const fetchAttendees = async () => {
    if (syncingId) return;
    try {
      const res = await fetch("/api/attendees");
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
      const res = await fetch("/api/attendees", {
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
    const confirmed = window.confirm(`¿Estás seguro que quieres CONFIRMAR el registro de ${nombre}?\n\nSe enviará un correo electrónico de confirmación automáticamente.`);
    if (!confirmed) return;

    setSyncingId(id);
    try {
      const res = await fetch("/api/attendees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'confirm', id })
      });
      const data = await res.json();
      if (data.success) {
        setAttendees(prev => prev.map(a => a.id === id ? { ...a, confirmado: true } : a));
        alert(`¡Registro confirmado y correo enviado a ${nombre}!`);
      } else {
        alert("Error al confirmar: " + data.message);
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
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'PP Neue Machina', sans-serif;
          padding: 40px 20px;
        }
        .login-card {
          max-width: 420px;
          margin: 10vh auto;
          background: var(--bg-secondary);
          padding: 40px;
          border-radius: var(--radius);
          text-align: center;
        }
        .attendee-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-secondary);
          padding: 24px;
          border-radius: var(--radius);
          border: 1px solid rgba(100,100,100,0.1);
          margin-bottom: 12px;
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
          background: rgba(100,100,100,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }
        .attendee-name {
          font-size: 19px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .attendee-details-line {
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          gap: 8px;
          align-items: center;
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
          transition: all 0.2s;
          border: 1px solid transparent;
          font-family: inherit;
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
        .btn-blue {
          background-color: #2563eb;
          color: white;
        }
        .btn-dark {
          background-color: var(--bg-primary);
          border: 1px solid rgba(100,100,100,0.3);
          color: var(--text-primary);
        }
        .input-field {
          width: 100%;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid rgba(100,100,100,0.2);
          background: var(--bg-primary);
          color: var(--text-primary);
          margin-bottom: 16px;
          outline: none;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: var(--bg-secondary);
          padding: 24px;
          border-radius: var(--radius);
          text-align: center;
        }
        .badge-confirmed {
          font-size: 10px;
          background: #2563eb;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          margin-left: 10px;
          text-transform: uppercase;
        }
        @media (max-width: 900px) {
          .attendee-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .actions-group {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}} />

      {!isAuthenticated ? (
        <div className="login-card">
          <h1>Acceso Staff</h1>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Contraseña" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="input-field" />
            <button type="submit" className="btn-ui btn-blue" style={{ width: '100%', padding: '16px' }}>Entrar</button>
          </form>
        </div>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
            <h1>Panel de Control Staff</h1>
            <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>CERRAR SESIÓN</button>
          </header>

          <div className="stats-grid">
            <div className="stat-card">
              <h3 style={{ fontSize: '13px', opacity: 0.7 }}>REGISTRADOS</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{attendees.length}</p>
            </div>
            <div className="stat-card">
              <h3 style={{ fontSize: '13px', opacity: 0.7 }}>CONFIRMADOS (EMAIL)</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>{confirmedCount}</p>
            </div>
            <div className="stat-card">
              <h3 style={{ fontSize: '13px', opacity: 0.7 }}>INGRESADOS (JUNIO 11)</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e' }}>{checkedInCount}</p>
            </div>
          </div>

          {isBeforeOpenDate && (
            <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid #eab308', padding: '15px', borderRadius: '10px', marginBottom: '30px', color: '#eab308', textAlign: 'center', fontSize: '14px' }}>
              ⚠️ El sistema de <strong>Ingreso</strong> se habilitará el <strong>11 de Junio de 2026</strong>. Por ahora solo puedes gestionar confirmaciones de correo.
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
              <div key={attendee.id} className="attendee-card">
                <div className="attendee-info">
                  <div className="attendee-avatar" style={{ background: attendee.confirmado ? '#2563eb' : 'rgba(100,100,100,0.1)', color: attendee.confirmado ? 'white' : 'inherit' }}>
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
                      className="btn-ui btn-blue"
                    >
                      {syncingId === attendee.id ? "..." : "Confirmar Registro"}
                    </button>
                  )}
                  
                  <button 
                    onClick={() => toggleCheckIn(attendee.id, attendee.checkIn)}
                    disabled={isBeforeOpenDate || syncingId === attendee.id}
                    className={`btn-ui btn-green`}
                    title={isBeforeOpenDate ? "Habilitado el 11 de Junio" : ""}
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
