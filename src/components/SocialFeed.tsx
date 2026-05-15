import React from 'react';

export default function SocialFeed() {
  return (
    <section id="redes" className="section" style={styles.section}>
      <div className="container">
        <h2 style={styles.title}>Síguenos en nuestras redes</h2>
        <p style={styles.subtitle}>@comuarica</p>
        
        <div style={styles.flexContainer}>
          {/* Instagram */}
          <a href="https://instagram.com/comuarica" target="_blank" rel="noopener noreferrer" className="social-card insta" style={styles.iconCard}>
            <div style={styles.iconWrapperInsta}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <span style={styles.iconLabel}>Instagram</span>
          </a>

          {/* Facebook */}
          <a href="https://facebook.com/comuarica" target="_blank" rel="noopener noreferrer" className="social-card fb" style={styles.iconCard}>
            <div style={styles.iconWrapperFb}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </div>
            <span style={styles.iconLabel}>Facebook</span>
          </a>

          {/* YouTube */}
          <a href="https://youtube.com/@comuarica" target="_blank" rel="noopener noreferrer" className="social-card yt" style={styles.iconCard}>
            <div style={styles.iconWrapperYt}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <span style={styles.iconLabel}>YouTube</span>
          </a>
        </div>
      </div>
      
      {/* Estilos para animaciones hover (se inyectan globalmente solo para estas clases) */}
      <style dangerouslySetInnerHTML={{__html: `
        .social-card {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease !important;
          border: 2px solid transparent;
        }
        .social-card:hover {
          transform: translateY(-15px) scale(1.03) !important;
        }
        .social-card.insta:hover {
          border-color: #E1306C;
          box-shadow: 0 20px 40px rgba(225, 48, 108, 0.25) !important;
        }
        .social-card.fb:hover {
          border-color: #1877F2;
          box-shadow: 0 20px 40px rgba(24, 119, 242, 0.25) !important;
        }
        .social-card.yt:hover {
          border-color: #FF0000;
          box-shadow: 0 20px 40px rgba(255, 0, 0, 0.25) !important;
        }
      `}} />
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: 'var(--bg-primary)',
    paddingTop: '40px',
    paddingBottom: '80px',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    textAlign: 'center',
    marginBottom: '8px',
    color: 'var(--text-primary)',
  },
  subtitle: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    marginBottom: '60px',
    fontSize: '1.2rem',
    fontFamily: 'monospace',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '160px',
    height: '180px',
    borderRadius: '24px',
    backgroundColor: 'var(--bg-secondary)',
    textDecoration: 'none',
    boxShadow: 'var(--shadow)',
    gap: '20px',
  },
  iconLabel: {
    fontWeight: 600,
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
  },
  iconWrapperInsta: {
    color: '#E1306C',
  },
  iconWrapperFb: {
    color: '#1877F2',
  },
  iconWrapperYt: {
    color: '#FF0000',
  }
};
