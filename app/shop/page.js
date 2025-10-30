import Link from 'next/link';
import { getAllProducts, getProductImage, formatPrice } from '@/lib/woocommerce';

export const metadata = {
  title: 'Shop - Symbols',
  description: 'Browse our products',
}

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        Shop
      </h1>

      {products.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          background: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>
            Δεν βρέθηκαν προϊόντα.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
        }}>
          {products.map((product) => {
            const image = getProductImage(product);

            return (
              <article
                key={product.id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  background: 'white'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
                      {formatPrice(product.price)}
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

                  <Link
                    href={`/shop/${product.slug}`}
                    style={{
                      display: 'block',
                      marginTop: '1rem',
                      padding: '0.75rem',
                      background: '#0070f3',
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: '500',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#0051cc'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#0070f3'}
                  >
                    View Details
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

// Revalidate every 5 minutes
export const revalidate = 300;
