import Link from 'next/link';
import { getAllProducts, getProductBySlug, formatPrice } from '@/lib/woocommerce';

// Generate static paths για όλα τα products
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Shop`,
    description: product.short_description?.replace(/<[^>]*>/g, '').substring(0, 160) || product.name,
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return (
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1>Product Not Found</h1>
        <Link href="/shop" style={{ color: '#0070f3' }}>
          ← Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Link
        href="/shop"
        style={{
          color: '#0070f3',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '2rem'
        }}
      >
        ← Back to Shop
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        {/* Product Images */}
        <div>
          {product.images && product.images.length > 0 && (
            <div>
              <img
                src={product.images[0].src}
                alt={product.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              />

              {product.images.length > 1 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem'
                }}>
                  {product.images.slice(1, 5).map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={`${product.name} ${index + 2}`}
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #e0e0e0'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            {product.name}
          </h1>

          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#0070f3',
            marginBottom: '1.5rem'
          }}>
            {formatPrice(product.price)}
          </div>

          {product.short_description && (
            <div
              style={{
                color: '#666',
                marginBottom: '2rem',
                lineHeight: '1.6',
                fontSize: '1.1rem'
              }}
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          {/* Stock Status */}
          <div style={{
            padding: '1rem',
            borderRadius: '6px',
            marginBottom: '2rem',
            background: product.stock_status === 'instock' ? '#ecfdf5' : '#fee2e2'
          }}>
            <strong style={{
              color: product.stock_status === 'instock' ? '#10b981' : '#ef4444'
            }}>
              {product.stock_status === 'instock' ? '✓ In Stock' : '✗ Out of Stock'}
            </strong>
            {product.stock_quantity && (
              <span style={{ marginLeft: '1rem', color: '#666' }}>
                ({product.stock_quantity} available)
              </span>
            )}
          </div>

          {/* Buy Button */}
          <a
            href={product.permalink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '1rem 2rem',
              background: '#0070f3',
              color: 'white',
              textAlign: 'center',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              transition: 'background 0.2s'
            }}
          >
            Buy on symbols.gr →
          </a>

          {/* Categories & Tags */}
          {product.categories && product.categories.length > 0 && (
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Categories:</strong>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.categories.map(cat => (
                  <span
                    key={cat.id}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: '#f0f0f0',
                      borderRadius: '4px',
                      fontSize: '0.9rem'
                    }}
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Description */}
      {product.description && (
        <div style={{
          marginTop: '3rem',
          paddingTop: '3rem',
          borderTop: '2px solid #e0e0e0'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Description</h2>
          <div
            style={{
              lineHeight: '1.8',
              color: '#333'
            }}
            className="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          .product-description img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 2rem 0;
          }
          .product-description p {
            margin-bottom: 1rem;
          }
          .product-description ul,
          .product-description ol {
            margin-bottom: 1rem;
            padding-left: 2rem;
          }
        `
      }} />
    </main>
  );
}

// Revalidate every 5 minutes
export const revalidate = 300;
