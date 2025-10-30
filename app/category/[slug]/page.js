import Link from 'next/link';
import { getAllCategories, getCategoryBySlug, getPostsByCategory, getFeaturedImage } from '@/lib/wordpress';

// Generate static paths για όλες τις categories
export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - Κατηγορία`,
    description: category.description || `Όλα τα άρθρα από την κατηγορία ${category.name}`,
  };
}

export default async function CategoryPage({ params }) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return (
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1>Η κατηγορία δεν βρέθηκε</h1>
        <Link href="/" style={{ color: '#0070f3' }}>
          ← Επιστροφή στην αρχική
        </Link>
      </main>
    );
  }

  const posts = await getPostsByCategory(category.id);

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/"
          style={{
            color: '#0070f3',
            textDecoration: 'none'
          }}
        >
          ← Πίσω στην αρχική
        </Link>
      </div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Κατηγορία: {category.name}
      </h1>

      {category.description && (
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
          {category.description}
        </p>
      )}

      <p style={{ color: '#999', marginBottom: '2rem' }}>
        {posts.length} {posts.length === 1 ? 'άρθρο' : 'άρθρα'}
      </p>

      {posts.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '3rem', background: '#f9f9f9', borderRadius: '8px' }}>
          Δεν υπάρχουν άρθρα σε αυτή την κατηγορία.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}>
          {posts.map((post) => {
            const featuredImage = getFeaturedImage(post);

            return (
              <article
                key={post.id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {featuredImage && (
                  <img
                    src={featuredImage}
                    alt={post.title.rendered}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                )}

                <div style={{ padding: '1.5rem' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <Link
                      href={`/posts/${post.slug}`}
                      style={{
                        color: '#0070f3',
                        textDecoration: 'none'
                      }}
                    >
                      {post.title.rendered}
                    </Link>
                  </h2>

                  <div
                    style={{
                      color: '#666',
                      marginBottom: '1rem',
                      lineHeight: '1.6'
                    }}
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />

                  <Link
                    href={`/posts/${post.slug}`}
                    style={{
                      color: '#0070f3',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Διάβασε περισσότερα →
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
