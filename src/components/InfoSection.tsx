import React from 'react';

export default function InfoSection() {
  return (
    <section id="ubicacion" style={styles.section}>
      <h2 style={styles.title}>Nuestras Ubicaciones</h2>
      
      <div className="map-grid-container" style={styles.mapGrid}>
        {/* Campus Principal */}
        <div className="map-box" style={styles.mapContainer}>
          <div style={styles.mapOverlay}>
            <h3 style={styles.campusName}>Campus Principal</h3>
            <p style={styles.campusDesc}>Auditorio &middot; Av. Santa Mar&iacute;a #2950</p>
          </div>
          <iframe 
            src="https://maps.google.com/maps?q=GPQ3%2BPP%20Arica&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            style={{ border: 0, filter: 'var(--map-filter)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
            allowFullScreen={false} 
            loading="lazy"
            title="Campus Principal"
          ></iframe>
        </div>

        {/* Campus Lluta */}
        <div className="map-box" style={{...styles.mapContainer, borderLeft: '2px solid var(--bg-primary)'}}>
          <div style={styles.mapOverlay}>
            <h3 style={styles.campusName}>Campus Lluta</h3>
            <p style={styles.campusDesc}>Km 15 &middot; Valle de Lluta</p>
          </div>
          <iframe 
            src="https://maps.google.com/maps?q=-18.404531,-70.161172&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            style={{ border: 0, filter: 'var(--map-filter)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
            allowFullScreen={false} 
            loading="lazy"
            title="Campus Lluta"
          ></iframe>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .map-grid-container {
            flex-direction: column !important;
            height: auto !important;
          }
          .map-box {
            width: 100% !important;
            height: 65vh !important;
            min-height: 450px !important;
            border-left: none !important;
            border-top: 2px solid var(--bg-primary) !important;
          }
        }
      `}} />
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    color: 'var(--text-primary)',
    textAlign: 'center',
    padding: '80px 20px 40px 20px',
    margin: 0,
  },
  mapGrid: {
    display: 'flex',
    width: '100%',
    height: '60vh',
    minHeight: '400px',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    maxWidth: 'calc(100% - 30px)',
    backgroundColor: 'var(--bg-glass)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '12px 20px',
    borderRadius: '12px',
    zIndex: 10,
    boxShadow: 'var(--shadow)',
    border: '1px solid rgba(150,150,150,0.2)',
  },
  campusName: {
    fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
    color: 'var(--text-primary)',
    margin: 0,
    lineHeight: 1.2,
  },
  campusDesc: {
    color: 'var(--accent)',
    fontWeight: 'bold',
    margin: 0,
    marginTop: '4px',
    fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
  }
};
