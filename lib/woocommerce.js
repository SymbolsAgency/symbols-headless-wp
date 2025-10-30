import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// WooCommerce API Configuration
const api = new WooCommerceRestApi({
  url: "https://symbols.gr",
  consumerKey: "ck_705f42c3ba4bcc23ebb4def0be799a0cebe21b3d",
  consumerSecret: "cs_178ab1df9894c81b92aafd411afc9a8a9adb6656",
  version: "wc/v3"
});

// ========== PRODUCTS ==========

/**
 * Παίρνει όλα τα products από το WooCommerce
 */
export async function getAllProducts() {
  try {
    const response = await api.get("products", {
      per_page: 100,
      status: 'publish'
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Παίρνει ένα product από το ID του
 */
export async function getProduct(productId) {
  try {
    const response = await api.get(`products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Παίρνει ένα product από το slug του
 */
export async function getProductBySlug(slug) {
  try {
    const response = await api.get("products", {
      slug: slug
    });
    return response.data[0];
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

// ========== CATEGORIES ==========

/**
 * Παίρνει όλες τις product categories
 */
export async function getProductCategories() {
  try {
    const response = await api.get("products/categories", {
      per_page: 100
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Παίρνει products από συγκεκριμένη category
 */
export async function getProductsByCategory(categoryId) {
  try {
    const response = await api.get("products", {
      category: categoryId,
      per_page: 100,
      status: 'publish'
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// ========== UTILITIES ==========

/**
 * Ελέγχει αν η εικόνα είναι WooCommerce placeholder
 */
function isPlaceholderImage(imageUrl) {
  if (!imageUrl) return true;

  // Check για WooCommerce placeholder patterns
  const placeholderPatterns = [
    'woocommerce-placeholder',
    'placeholder.png',
    'placeholder.jpg',
    'wc-placeholder',
    'product-placeholder'
  ];

  return placeholderPatterns.some(pattern =>
    imageUrl.toLowerCase().includes(pattern)
  );
}

/**
 * Παίρνει το κύριο image URL ενός product
 * Επιστρέφει null αν είναι placeholder
 */
export function getProductImage(product) {
  if (product.images && product.images.length > 0) {
    const imageUrl = product.images[0].src;

    // Αν είναι placeholder, επέστρεψε null
    if (isPlaceholderImage(imageUrl)) {
      return null;
    }

    return imageUrl;
  }
  return null;
}

/**
 * Παίρνει όλες τις πραγματικές εικόνες (χωρίς placeholders)
 */
export function getProductImages(product) {
  if (product.images && product.images.length > 0) {
    return product.images
      .filter(img => !isPlaceholderImage(img.src))
      .map(img => img.src);
  }
  return [];
}

/**
 * Format price με σύμβολο νομίσματος
 */
export function formatPrice(price, currency = '€') {
  return `${parseFloat(price).toFixed(2)}${currency}`;
}
