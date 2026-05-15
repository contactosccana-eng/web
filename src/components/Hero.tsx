'use client';
import React, { useState, useEffect } from 'react';

// Si necesitas agregar más fotos, simplemente súmalo a este array:
const heroImages = [
  '/hero1.jpg',
  '/hero2.jpg',
  '/hero3.jpg',
  '/hero4.jpg',
  '/hero5.jpg',
  '/hero6.jpg',
  '/hero8.jpg',
  '/hero9.jpg'
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Cambia de imagen cada 5 segundos
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); 
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={styles.hero}>
      {/* Carrusel de Imágenes de Fondo con Filtro Unificado */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className="image-filter"
          style={{
            ...styles.bgImage,
            backgroundImage: `url('${src}')`,
            // La opacidad controla el desvanecimiento cruzado (fade effect)
            opacity: index === currentImageIndex ? 0.7 : 0, 
          }}
        />
      ))}
      
      {/* Capa de degradado oscuro inferior para asegurar que el texto blanco siempre se lea */}
      <div style={styles.overlay}></div>

      <div className="container" style={styles.container}>
        <div style={styles.content}>
          <img src="/logo.png" alt="Comunidad Cristiana Arica" style={styles.heroLogo} />
          <h1 style={styles.title}>
            AMAMOS A DIOS,<br/>
            amamos a las personas,<br/>
            <span style={styles.highlight}>servimos al mundo</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000', // Fondo negro base para dar profundidad
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 2s ease-in-out', // Transición suave de 2 segundos
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // Degradado: oscurece mucho abajo donde va el texto, casi nada arriba
    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
    zIndex: 1,
  },
  container: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '800px',
  },
  heroLogo: {
    width: 'clamp(150px, 20vw, 250px)',
    height: 'auto',
    marginBottom: '20px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
  },
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
    marginBottom: '0',
    color: '#ffffff', // Forzamos texto blanco para máximo contraste
    letterSpacing: '-1px',
    lineHeight: '1.1',
    textShadow: '0 4px 20px rgba(0,0,0,0.6)', // Sombra para realzar legibilidad
  },
  highlight: {
    color: 'var(--accent)',
    textShadow: '0 4px 15px rgba(0,0,0,0.9)',
  }
};
