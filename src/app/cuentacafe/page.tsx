"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CuentaCafePage() {
  const [copied, setCopied] = useState(false);

  // El texto exacto con el formato original provisto por el usuario
  const bankDataText = `Cafeteria Comuarica
8927686-1
Banco de Chile
Cuenta Corriente
1050143101`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(bankDataText);
      } else {
        // Fallback para navegadores antiguos / entornos no seguros
        const textArea = document.createElement("textarea");
        textArea.value = bankDataText;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Error al copiar al portapapeles: ", err);
    }
  };

  return (
    <div className="cafe-wrapper">
      {/* Estilos CSS Inline de alto nivel optimizados con estética de cafetería premium */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cafe-wrapper {
          min-height: 100vh;
          background: radial-gradient(circle at top right, rgba(217, 119, 6, 0.15), transparent 40%),
                      radial-gradient(circle at bottom left, rgba(15, 23, 42, 1), #0e0a07);
          color: var(--text-primary, #f8fafc);
          font-family: 'PP Neue Machina', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .back-btn {
          position: absolute;
          top: 30px;
          left: 20px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #d97706;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(217, 119, 6, 0.05);
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(217, 119, 6, 0.15);
          cursor: pointer;
        }

        .back-btn:hover {
          color: #f59e0b;
          background: rgba(217, 119, 6, 0.12);
          transform: translateX(-4px);
          border-color: rgba(217, 119, 6, 0.3);
        }

        .cafe-container {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .cafe-badge {
          background: rgba(217, 119, 6, 0.1);
          border: 1px solid rgba(217, 119, 6, 0.2);
          color: #f59e0b;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .cafe-icon {
          animation: steam 2s ease-in-out infinite alternate;
        }

        @keyframes steam {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2px); }
        }

        .header-logo {
          height: 60px;
          width: auto;
          object-fit: contain;
          margin-bottom: 2px;
          filter: drop-shadow(0 4px 12px rgba(217, 119, 6, 0.25));
        }

        .cafe-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.8rem;
          text-align: center;
          letter-spacing: -0.5px;
          margin-bottom: 2px;
          background: linear-gradient(135deg, #ffffff 40%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cafe-subtitle {
          font-size: 0.88rem;
          color: var(--text-secondary, #cbd5e1);
          text-align: center;
          line-height: 1.5;
          margin-bottom: 4px;
          max-width: 90%;
          opacity: 0.85;
        }

        .glass-card {
          background: rgba(30, 41, 59, 0.35);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          padding: 28px;
          width: 100%;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #d97706, #f59e0b, #d97706);
          opacity: 0.8;
        }

        /* Bloque de Texto Exacto */
        .text-block-container {
          background: rgba(10, 7, 5, 0.65);
          border: 1px solid rgba(217, 119, 6, 0.15);
          border-radius: 18px;
          padding: 24px;
          position: relative;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .bank-text-exact {
          font-family: 'PP Neue Machina', monospace;
          font-size: 1.22rem;
          font-weight: 800;
          line-height: 1.7;
          color: #ffffff;
          white-space: pre-wrap;
          margin: 0;
          text-align: left;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Botón de Copiado */
        .btn-copy {
          width: 100%;
          background: linear-gradient(135deg, #d97706, #b45309);
          color: #ffffff;
          border: none;
          padding: 16px;
          border-radius: 18px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 8px 24px -6px rgba(217, 119, 6, 0.4);
        }

        .btn-copy:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -4px rgba(217, 119, 6, 0.5);
          filter: brightness(1.1);
        }

        .btn-copy:active {
          transform: translateY(1px);
        }

        .btn-copy.success {
          background: linear-gradient(135deg, #22c55e, #15803d) !important;
          box-shadow: 0 8px 24px -6px rgba(34, 197, 94, 0.4) !important;
          animation: popScale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        /* Animaciones */
        @keyframes popScale {
          0% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }

        /* Footer */
        .cafe-footer {
          margin-top: 16px;
          font-size: 0.8rem;
          color: var(--text-secondary, #cbd5e1);
          opacity: 0.6;
          text-align: center;
          letter-spacing: 0.5px;
        }
      `}} />

      <div className="cafe-container">
        {/* Botón de volver */}
        <Link href="/" className="back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Volver
        </Link>

        {/* Encabezado con badge temática de café */}
        <div className="cafe-badge">
          <svg className="cafe-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
          Cafetería Comuarica
        </div>

        <img src="/logo.png" alt="ComuArica Logo" className="header-logo" />
        <h1 className="cafe-title">Cuenta Cafetería</h1>
        <p className="cafe-subtitle">
          Copia los datos bancarios exactos a continuación para transferir de forma directa y sencilla.
        </p>

        {/* Tarjeta de Datos */}
        <div className="glass-card">
          {/* Bloque de texto exacto solicitado */}
          <div className="text-block-container">
            <pre className="bank-text-exact">{bankDataText}</pre>
          </div>

          {/* Botón de Copiado */}
          <button 
            className={`btn-copy ${copied ? "success" : ""}`} 
            onClick={handleCopy}
            aria-label="Copiar datos de cuenta de cafetería"
          >
            {copied ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                ¡Datos copiados!
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copiar info de cuenta
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <p className="cafe-footer">
          Comunidad Cristiana Arica &middot; Arica, Chile
        </p>
      </div>
    </div>
  );
}
