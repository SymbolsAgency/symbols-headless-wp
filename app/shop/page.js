import { getAllProducts, getProductImage, formatPrice } from '@/lib/woocommerce';
import ProductCard from './components/ProductCard';

export const metadata = {
  title: 'Shop - Symbols',
  description: 'Browse our products',
}

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main>
      <h1>🛒 Shop the Brand</h1>

      {products.length === 0 ? (
        <div className="card text-center">
          <div className="card-content">
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              Δεν βρέθηκαν προϊόντα.
            </p>
          </div>
        </div>
      ) : (
        <div className="card-grid">
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
