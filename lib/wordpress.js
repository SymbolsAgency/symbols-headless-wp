// WordPress REST API URL
const WP_API_URL = 'https://symbols.gr/wp-json/wp/v2';

// ========== POSTS ==========

/**
 * Παίρνει όλα τα posts από το WordPress
 */
export async function getAllPosts() {
  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Παίρνει ένα post από το slug του
 */
export async function getPostBySlug(slug) {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const posts = await res.json();
    return posts[0];
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// ========== PAGES ==========

/**
 * Παίρνει όλες τις WordPress Pages
 */
export async function getAllPages() {
  try {
    const res = await fetch(`${WP_API_URL}/pages?_embed&per_page=100`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch pages: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

/**
 * Παίρνει μια Page από το slug της
 */
export async function getPageBySlug(slug) {
  try {
    const res = await fetch(`${WP_API_URL}/pages?slug=${slug}&_embed`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch page: ${res.status}`);
    }

    const pages = await res.json();
    return pages[0];
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// ========== CATEGORIES ==========

/**
 * Παίρνει όλες τις Categories
 */
export async function getAllCategories() {
  try {
    const res = await fetch(`${WP_API_URL}/categories?per_page=100`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Παίρνει posts από συγκεκριμένη category
 */
export async function getPostsByCategory(categoryId) {
  try {
    const res = await fetch(`${WP_API_URL}/posts?categories=${categoryId}&_embed&per_page=100`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts by category: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

/**
 * Παίρνει category από το slug του
 */
export async function getCategoryBySlug(slug) {
  try {
    const res = await fetch(`${WP_API_URL}/categories?slug=${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch category: ${res.status}`);
    }

    const categories = await res.json();
    return categories[0];
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

// ========== TAGS ==========

/**
 * Παίρνει όλα τα Tags
 */
export async function getAllTags() {
  try {
    const res = await fetch(`${WP_API_URL}/tags?per_page=100`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tags: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// ========== UTILITIES ==========

/**
 * Παίρνει το featured image URL από ένα post/page
 */
export function getFeaturedImage(post) {
  if (post._embedded && post._embedded['wp:featuredmedia']) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

/**
 * Παίρνει τις categories ενός post
 */
export function getPostCategories(post) {
  if (post._embedded && post._embedded['wp:term']) {
    return post._embedded['wp:term'][0] || [];
  }
  return [];
}

/**
 * Παίρνει τα tags ενός post
 */
export function getPostTags(post) {
  if (post._embedded && post._embedded['wp:term']) {
    return post._embedded['wp:term'][1] || [];
  }
  return [];
}
