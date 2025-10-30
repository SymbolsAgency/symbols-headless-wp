'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product, image, formattedPrice }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        background: 'white',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.1)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <Link href={`/shop/${product.slug}`}>
          <img
            src={image}
            alt={product.name}
            style={{
              width: '100%',
              height: '280px',
              objectFit: 'cover',
              cursor: 'pointer'
            }}
          />
        </Link>
      )}

      <div style={{ padding: '1.5rem' }}>
        <h2 style={{
          fontSize: '1.25rem',
          marginBottom: '0.5rem',
          minHeight: '3rem'
        }}>
          <Link
            href={`/shop/${product.slug}`}
            style={{
              color: '#333',
              textDecoration: 'none'
            }}
          >
            {product.name}
          </Link>
        </h2>

        {product.short_description && (
          <div
            style={{
              color: '#666',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              minHeight: '3rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem'
        }}>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#0070f3'
          }}>
            {formattedPrice}
          </span>

          {product.stock_status === 'instock' ? (
            <span style={{
              color: '#10b981',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              In Stock
            </span>
          ) : (
            <span style={{
              color: '#ef4444',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Out of Stock
            </span>
          )}
        </div>

        <ViewDetailsButton href={`/shop/${product.slug}`} />
      </div>
    </article>
  );
}

function ViewDetailsButton({ href }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        display: 'block',
        marginTop: '1rem',
        padding: '0.75rem',
        background: isHovered ? '#0051cc' : '#0070f3',
        color: 'white',
        textAlign: 'center',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'background 0.2s'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      View Details
    </Link>
  );
}
