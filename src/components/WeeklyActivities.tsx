'use client';
import React, { useRef } from 'react';

export default function WeeklyActivities() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const activities = [
    { id: 1, name: 'Reunión OIKOS', time: 'MARTES 20 HRS', image: '/oikos.jpg' },
    { id: 2, name: 'GRUPOS DE CONEXIÓN', time: 'MIÉRCOLES Y JUEVES', image: '/grupodeconexion.jpeg' },
    { id: 3, name: 'MAKERS', time: 'VIERNES 18 HRS', image: '/makers.jpg' },
    { id: 4, name: 'LA MEJOR PARTE', time: 'VIERNES 20 HRS', image: '/la mejor parte.jpg' },
    { id: 5, name: 'ESCUELA MINISTERIAL', time: 'SÁBADO 9 HRS', image: '/escuelaministerial.jpg' },
    { id: 6, name: 'CULTO DE CELEBRACIÓN', time: 'DOMINGO 10 HRS', image: '/cultodecelebracion.jpg' },
  ];

  return (
    <section id="actividades" className="section" style={styles.section}>
      <div className="container">
        <div style={styles.headerWithArrows}>
          <h2 style={styles.mainTitle}>Actividades Semanales</h2>
          <div style={styles.arrowsContainer}>
            <button className="nav-arrow" onClick={scrollLeft} aria-label="Anterior">←</button>
            <button className="nav-arrow" onClick={scrollRight} aria-label="Siguiente">→</button>
          </div>
        </div>
        
        <div className="hide-scroll" style={styles.carousel} ref={carouselRef}>
          {activities.map((activity) => (
            <div key={activity.id} className="activity-card" style={styles.carouselCard}>
              {activity.image && (
                <>
                  <div className="image-filter" style={{ ...styles.cardBgImage, backgroundImage: `url('${activity.image}')` }} />
                  <div style={styles.cardOverlay} />
                </>
              )}
              <div style={{ ...styles.cardContent, color: activity.image ? 'white' : 'var(--text-primary)' }}>
                <div>
                  <h4 style={{ ...styles.carouselName, color: 'inherit' }}>{activity.name}</h4>
                  <p style={{ ...styles.activityTime, color: activity.image ? 'rgba(255,255,255,0.8)' : 'var(--accent)' }}>{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={styles.swipeHint}>← Desliza para ver más →</p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .activity-card {
           transition: transform 0.3s, background-color 0.3s, color 0.3s, box-shadow 0.3s;
        }
        .activity-card:hover {
          background-color: var(--accent) !important;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(37, 99, 235, 0.3) !important;
        }
        .activity-card:hover h4, .activity-card:hover div {
          color: white !important;
        }
        .nav-arrow {
          background: transparent;
          border: 1px solid var(--text-secondary);
          color: var(--text-primary);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1.2rem;
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
    // Usamos el fondo secundario para crear contraste con la sección de Eventos que está arriba
    backgroundColor: 'var(--bg-secondary)', 
  },
  mainTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    color: 'var(--text-primary)',
    margin: 0,
  },
  headerWithArrows: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
  },
  arrowsContainer: {
    display: 'flex',
    gap: '12px',
  },
  carousel: {
    display: 'flex',
    gap: '20px',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    paddingBottom: '20px',
    paddingTop: '10px',
  },
  carouselCard: {
    minWidth: '280px',
    minHeight: '160px',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: 'var(--radius)',
    scrollSnapAlign: 'start',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(150,150,150,0.05)',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.3s, box-shadow 0.3s',
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
    padding: '30px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  carouselName: {
    fontSize: '1.4rem',
    color: 'var(--text-primary)',
    lineHeight: 1.2,
    transition: 'color 0.3s',
    margin: 0,
  },
  activityTime: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginTop: '6px',
    textTransform: 'uppercase',
  },
  swipeHint: {
    textAlign: 'left',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    marginTop: '16px',
    opacity: 0.7,
  }
};
