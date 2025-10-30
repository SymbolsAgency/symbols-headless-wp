import Link from 'next/link';
import { getAllPosts, getFeaturedImage } from '@/lib/wordpress';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <h1>Τελευταία Άρθρα</h1>

      {posts.length === 0 ? (
        <div className="card text-center">
          <div className="card-content">
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              Δεν βρέθηκαν άρθρα. Βεβαιώσου ότι το WordPress API είναι προσβάσιμο.
            </p>
            <p style={{ marginTop: '1rem', color: '#999' }}>
              API URL: https://symbols.gr/wp-json/wp/v2/posts
            </p>
          </div>
        </div>
      ) : (
        <div className="card-grid">
          {posts.map((post) => {
            const featuredImage = getFeaturedImage(post);

            return (
              <article key={post.id} className="card">
                {featuredImage && (
                  <img
                    src={featuredImage}
                    alt={post.title.rendered}
                    className="card-image"
                  />
                )}

                <div className="card-content">
                  <h2 className="card-title">
                    <Link href={`/posts/${post.slug}`}>
                      {post.title.rendered}
                    </Link>
                  </h2>

                  <div
                    className="card-excerpt"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />

                  <Link href={`/posts/${post.slug}`} className="card-link">
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
