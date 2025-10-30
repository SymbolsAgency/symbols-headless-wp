'use client';

import Link from 'next/link';

export default function ProductCard({ product, image, formattedPrice }) {
  return (
    <article className="card">
      {image ? (
        <Link href={`/shop/${product.slug}`}>
          <img
            src={image}
            alt={product.name}
            className="card-image"
            style={{ cursor: 'pointer' }}
          />
        </Link>
      ) : (
        <Link href={`/shop/${product.slug}`}>
          <div style={{
            width: '100%',
            height: '220px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {product.name.charAt(0).toUpperCase()}
          </div>
        </Link>
      )}

      <div className="card-content">
        <h2 className="card-title" style={{ minHeight: '3rem' }}>
          <Link href={`/shop/${product.slug}`}>
            {product.name}
          </Link>
        </h2>

        {product.short_description && (
          <div
            className="card-excerpt"
            style={{
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
          marginTop: '1rem',
          marginBottom: '1rem'
        }}>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--primary-color)'
          }}>
            {formattedPrice}
          </span>

          {product.stock_status === 'instock' ? (
            <span style={{
              color: '#10b981',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              ✓ In Stock
            </span>
          ) : (
            <span style={{
              color: '#ef4444',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              ✗ Out of Stock
            </span>
          )}
        </div>

        <Link href={`/shop/${product.slug}`} className="card-link" style={{
          display: 'block',
          textAlign: 'center',
          padding: '0.75rem',
          background: 'var(--gradient-primary)',
          color: 'white',
          borderRadius: '8px',
          fontWeight: '600'
        }}>
          View Details →
        </Link>
      </div>
    </article>
  );
}
