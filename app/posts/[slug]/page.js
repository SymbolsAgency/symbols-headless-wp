import Link from 'next/link';
import { getAllPosts, getPostBySlug, getFeaturedImage } from '@/lib/wordpress';

// Generate static paths για όλα τα posts
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata για SEO
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

export default async function Post({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>Το άρθρο δεν βρέθηκε</h1>
        <Link href="/" style={{ color: '#0070f3' }}>
          ← Επιστροφή στην αρχική
        </Link>
      </main>
    );
  }

  const featuredImage = getFeaturedImage(post);

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Link
        href="/"
        style={{
          color: '#0070f3',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '2rem'
        }}
      >
        ← Πίσω στα άρθρα
      </Link>

      <article>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          {post.title.rendered}
        </h1>

        <div style={{
          color: '#666',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e0e0e0'
        }}>
          Δημοσιεύτηκε: {new Date(post.date).toLocaleDateString('el-GR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        {featuredImage && (
          <img
            src={featuredImage}
            alt={post.title.rendered}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}
          />
        )}

        <div
          style={{
            lineHeight: '1.8',
            fontSize: '1.1rem'
          }}
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>

      <style dangerouslySetInnerHTML={{
        __html: `
          .post-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 2rem 0;
          }
          .post-content p {
            margin-bottom: 1.5rem;
          }
          .post-content h2 {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-size: 1.8rem;
          }
          .post-content h3 {
            margin-top: 2rem;
            margin-bottom: 0.8rem;
            font-size: 1.4rem;
          }
          .post-content ul, .post-content ol {
            margin-bottom: 1.5rem;
            padding-left: 2rem;
          }
          .post-content li {
            margin-bottom: 0.5rem;
          }
          .post-content a {
            color: #0070f3;
            text-decoration: none;
          }
          .post-content a:hover {
            text-decoration: underline;
          }
        `
      }} />
    </main>
  );
}
