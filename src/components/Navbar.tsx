import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.logoLink}>
          <img src="/logo.png" alt="Comuarica Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
        </Link>
        <div style={styles.links}>
          <Link href="#eventos" style={styles.link}>Eventos</Link>
          <Link href="#redes" style={styles.link}>Redes</Link>
          <Link href="#ubicacion" style={styles.link}>Ubicación</Link>
        </div>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'var(--bg-glass)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(150,150,150,0.1)',
    zIndex: 100,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--text-primary)',
    transition: 'opacity 0.2s',
  },
  logoSvg: {
    color: 'var(--text-primary)',
  },
  links: {
    display: 'flex',
    gap: '30px',
  },
  link: {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    transition: 'color 0.3s',
  }
};
