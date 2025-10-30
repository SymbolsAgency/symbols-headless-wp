import Link from 'next/link';
import { getAllPosts, getFeaturedImage } from '@/lib/wordpress';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        Τελευταία Άρθρα
      </h1>

      {posts.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          background: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>
            Δεν βρέθηκαν άρθρα. Βεβαιώσου ότι το WordPress API είναι προσβάσιμο.
          </p>
          <p style={{ marginTop: '1rem', color: '#999' }}>
            API URL: https://symbols.gr/wp-json/wp/v2/posts
          </p>
        </div>
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
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
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
