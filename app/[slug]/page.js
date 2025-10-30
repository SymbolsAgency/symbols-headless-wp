import Link from 'next/link';
import { getAllPages, getPageBySlug, getFeaturedImage } from '@/lib/wordpress';

// Generate static paths για όλες τις pages
export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata για SEO
export async function generateMetadata({ params }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.title.rendered,
    description: page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

export default async function Page({ params }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return (
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>Η σελίδα δεν βρέθηκε</h1>
        <Link href="/" style={{ color: '#0070f3' }}>
          ← Επιστροφή στην αρχική
        </Link>
      </main>
    );
  }

  const featuredImage = getFeaturedImage(page);

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <article>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          lineHeight: '1.2'
        }}>
          {page.title.rendered}
        </h1>

        {featuredImage && (
          <img
            src={featuredImage}
            alt={page.title.rendered}
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
          className="page-content"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </article>

      <style dangerouslySetInnerHTML={{
        __html: `
          .page-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 2rem 0;
          }
          .page-content p {
            margin-bottom: 1.5rem;
          }
          .page-content h2 {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-size: 1.8rem;
          }
          .page-content a {
            color: #0070f3;
            text-decoration: none;
          }
          .page-content a:hover {
            text-decoration: underline;
          }
        `
      }} />
    </main>
  );
}
