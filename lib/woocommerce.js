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
 * Παίρνει το κύριο image URL ενός product
 */
export function getProductImage(product) {
  if (product.images && product.images.length > 0) {
    return product.images[0].src;
  }
  return null;
}

/**
 * Format price με σύμβολο νομίσματος
 */
export function formatPrice(price, currency = '€') {
  return `${parseFloat(price).toFixed(2)}${currency}`;
}
