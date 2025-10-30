import { getAllProducts, getProductImage, formatPrice } from '@/lib/woocommerce';
import ProductCard from './components/ProductCard';

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
            const price = formatPrice(product.price);

            return (
              <ProductCard
                key={product.id}
                product={product}
                image={image}
                formattedPrice={price}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}

// Revalidate every 5 minutes
export const revalidate = 300;
