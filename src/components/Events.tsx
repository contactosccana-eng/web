'use client';
import React, { useState, useRef } from 'react';

export default function Events() {
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -240, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 240, behavior: 'smooth' });
  };

  const proximosEventos = [
    { id: 2, name: 'CAV SANTIAGO', date: '17 - 18 JUL', image: '/cav.jpg' },
    { id: 3, name: 'CAV ANCUD', date: '4 - 5 SEP', image: '/cav.jpg' },
    { id: 4, name: 'CAV ARICA', date: '2 - 3 OCT', image: '/cav.jpg' },
    { id: 5, name: 'VALIENTES', date: '12 - 15 NOV', image: '/valientes.jpg', scale: 1.4 },
    { id: 6, name: 'NAVIDAD ES JESÚS', date: '19 DIC', image: '/navidad es jesus.jpg' },
  ];

  return (
    <section id="eventos" className="section" style={styles.section}>
      <div className="container">
        <h2 style={styles.mainTitle}>Eventos</h2>
        
        <div style={styles.layout}>
          {/* Columna Izquierda: Destacado */}
          <div style={styles.column}>
            <h3 style={{...styles.sectionSubtitle, marginBottom: '24px'}}>Destacado</h3>
            <div className="event-card" style={{...styles.featuredCard, padding: 0, overflow: 'hidden', position: 'relative'}}>
              <div style={{ ...styles.cardBgImage, backgroundImage: `url('/amadas.jpg')` }} />
              
              <div style={{ position: 'relative', zIndex: 2, padding: '40px 40px 20px 40px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                <a href="https://tally.so/r/Zjg0MB" target="_blank" rel="noopener noreferrer" className="btn" style={{ alignSelf: 'center' }}>
                  REGÍSTRATE
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Próximos (Carrusel) */}
          <div style={styles.column}>
            <div style={styles.headerWithArrows}>
              <h3 style={styles.sectionSubtitle}>Próximos</h3>
              <div style={styles.arrowsContainer}>
                <button className="nav-arrow" onClick={scrollLeft} aria-label="Anterior">←</button>
                <button className="nav-arrow" onClick={scrollRight} aria-label="Siguiente">→</button>
              </div>
            </div>
            <div className="hide-scroll" style={styles.carousel} ref={carouselRef}>
              {proximosEventos.map((evento) => (
                <div key={evento.id} className="event-card" style={styles.carouselCard}>
                  {evento.image && (
                    <>
                      <div className="image-filter" style={{ ...styles.cardBgImage, backgroundImage: `url('${evento.image}')`, transform: `scale(${evento.scale || 1})` }} />
                      <div style={styles.cardOverlay} />
                    </>
                  )}
                  <div style={{ ...styles.cardContent, color: evento.image ? 'white' : 'var(--text-primary)' }}>
                    <div style={styles.dateTag}>{evento.date}</div>
                    <h4 style={{ ...styles.carouselName, color: 'inherit' }}>{evento.name}</h4>
                  </div>
                </div>
              ))}
            </div>
            {/* Indicador visual de que se puede hacer scroll horizontal */}
            <p style={styles.swipeHint}>← Desliza para ver más →</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .event-card:hover {
          border-color: var(--accent) !important;
          transform: translateY(-5px);
        }
        .nav-arrow {
          background: transparent;
          border: 1px solid var(--text-secondary);
          color: var(--text-primary);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nav-arrow:hover {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }
      `}} />
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: 'var(--bg-primary)',
  },
  mainTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    marginBottom: '40px',
    color: 'var(--text-primary)',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0, // prevents flexbox overflow
  },
  sectionSubtitle: {
    fontSize: '1.2rem',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: 0,
  },
  headerWithArrows: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  arrowsContainer: {
    display: 'flex',
    gap: '8px',
  },
  featuredCard: {
    backgroundColor: 'var(--bg-secondary)',
    padding: '40px',
    borderRadius: 'var(--radius)',
    boxShadow: '0 0 25px rgba(37, 99, 235, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    flexGrow: 1,
    minHeight: '350px',
    justifyContent: 'space-between',
    border: '2px solid var(--accent)',
  },
  featuredInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  badge: {
    backgroundColor: 'var(--accent)',
    color: 'white',
    padding: '6px 14px',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  featuredName: {
    fontSize: '2.5rem',
    color: 'var(--text-primary)',
    lineHeight: 1.1,
  },
  featuredDesc: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
  },
  carousel: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    paddingBottom: '20px',
    paddingTop: '10px',
    flexGrow: 1,
  },
  carouselCard: {
    minWidth: '220px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius)',
    scrollSnapAlign: 'start',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(150,150,150,0.1)',
    transition: 'transform 0.3s, border-color 0.3s',
    display: 'flex',
    flexDirection: 'column',
  },
  cardBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 80%)',
    zIndex: 1,
  },
  cardContent: {
    padding: '24px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flexGrow: 1,
  },
  dateTag: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '0.72rem',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '6px 12px',
    borderRadius: '6px',
    alignSelf: 'flex-start',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  carouselName: {
    fontSize: '1.5rem',
    color: 'var(--text-primary)',
    marginTop: 'auto',
    lineHeight: 1.2,
  },
  swipeHint: {
    textAlign: 'center',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    marginTop: '16px',
    opacity: 0.7,
  }
};
