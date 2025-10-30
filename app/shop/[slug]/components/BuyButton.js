'use client';

import { useState } from 'react';

export default function BuyButton({ url }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        padding: '1rem 2rem',
        background: isHovered ? '#0051cc' : '#0070f3',
        color: 'white',
        textAlign: 'center',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        transition: 'background 0.2s'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Buy on symbols.gr →
    </a>
  );
}
