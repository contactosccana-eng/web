'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Dummy stream URL for architecture. Will be replaced later.
  const streamUrl = "https://stream.zeno.fm/dummy"; // Reemplazar aquí

  useEffect(() => {
    // Create audio element only on client
    audioRef.current = new Audio(streamUrl);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Error reproduciendo radio:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={styles.container}>
      <div style={styles.playerInfo}>
        <div style={isPlaying ? styles.liveIndicatorActive : styles.liveIndicator}></div>
        <div>
          <h4 style={styles.title}>Presencia Fm</h4>
          <p style={styles.subtitle}>{isPlaying ? "En Vivo" : "Desconectado"}</p>
        </div>
      </div>
      <button style={styles.playBtn} onClick={togglePlay}>
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    zIndex: 50,
    border: '1px solid rgba(150,150,150,0.1)',
  },
  playerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  liveIndicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'var(--text-secondary)',
  },
  liveIndicatorActive: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#ef4444', // red
    boxShadow: '0 0 8px #ef4444',
  },
  title: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: '1rem',
    margin: 0,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  playBtn: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  }
};
