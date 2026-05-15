import React from 'react';

interface LogoProps {
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Logo({ width = 180, className = "", style }: LogoProps) {
  return (
    <svg 
      width={width} 
      viewBox="0 0 300 120" 
      fill="currentColor" 
      className={className} 
      style={{ ...style, display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top Lines */}
      <rect x="146" y="5" width="8" height="40" />
      <rect x="126" y="16" width="8" height="29" />
      <rect x="166" y="16" width="8" height="29" />

      {/* Text */}
      <text 
        x="150" 
        y="72" 
        fontFamily='Avenir, "Avenir Next", "Montserrat", sans-serif' 
        fontWeight="400" 
        fontSize="30" 
        letterSpacing="6" 
        textAnchor="middle"
      >
        COMUNIDAD
      </text>

      {/* Bottom Lines */}
      <rect x="146" y="82" width="8" height="40" />
      <rect x="126" y="82" width="8" height="29" />
      <rect x="166" y="82" width="8" height="29" />
    </svg>
  );
}
