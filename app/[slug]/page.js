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
      <main>
        <div className="page-content text-center">
          <h1>Η σελίδα δεν βρέθηκε</h1>
          <Link href="/" className="card-link">
            ← Επιστροφή στην αρχική
          </Link>
        </div>
      </main>
    );
  }

  const featuredImage = getFeaturedImage(page);

  return (
    <main>
      <article className="page-content">
        <h1>{page.title.rendered}</h1>

        {featuredImage && (
          <img
            src={featuredImage}
            alt={page.title.rendered}
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </article>
    </main>
  );
}
