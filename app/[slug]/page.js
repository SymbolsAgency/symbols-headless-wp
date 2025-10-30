import Link from 'next/link';
import Image from 'next/image';
import { getAllPages, getPageBySlug, getFeaturedImage } from '@/lib/wordpress';
import { parseElementorContent, extractSections } from '@/lib/parseContent';

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

  // Parse Elementor content
  const sections = extractSections(page.content.rendered);
  const parsedContent = parseElementorContent(page.content.rendered);

  return (
    <main>
      <article className="page-content">
        <h1>{page.title.rendered}</h1>

        {featuredImage && (
          <img
            src={featuredImage}
            alt={page.title.rendered}
            style={{ width: '100%', height: 'auto', marginBottom: '2rem' }}
          />
        )}

        {/* Render parsed sections */}
        {sections.length > 0 ? (
          <div className="parsed-sections">
            {sections.map((section, idx) => (
              <section key={idx} className="content-section" style={{ marginBottom: '3rem' }}>
                {/* Headings */}
                {section.headings.map((heading, hIdx) => {
                  const HeadingTag = `h${heading.level}`;
                  return (
                    <HeadingTag key={hIdx} style={{ marginBottom: '1rem' }}>
                      {heading.text}
                    </HeadingTag>
                  );
                })}

                {/* Images */}
                {section.images.length > 0 && (
                  <div className="section-images" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '1rem',
                    margin: '2rem 0'
                  }}>
                    {section.images.slice(0, 8).map((img, iIdx) => (
                      <img
                        key={iIdx}
                        src={img.src}
                        alt={img.alt || 'Image'}
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Paragraphs */}
                {section.paragraphs.map((text, pIdx) => (
                  <p key={pIdx} style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
                    {text}
                  </p>
                ))}

                {/* Links */}
                {section.links.length > 0 && (
                  <div className="section-links" style={{ marginTop: '1rem' }}>
                    {section.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.href}
                        style={{
                          display: 'inline-block',
                          marginRight: '1rem',
                          color: 'var(--primary-color)',
                          textDecoration: 'none',
                          fontWeight: '600'
                        }}
                      >
                        {link.text} →
                      </a>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        ) : (
          // Fallback to showing all parsed content if sections extraction fails
          <div className="parsed-content">
            {parsedContent?.headings.map((heading, idx) => {
              const HeadingTag = `h${heading.level}`;
              return (
                <HeadingTag key={idx} style={{ marginBottom: '1rem' }}>
                  {heading.text}
                </HeadingTag>
              );
            })}

            {parsedContent?.images.length > 0 && (
              <div className="content-images" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem',
                margin: '2rem 0'
              }}>
                {parsedContent.images.slice(0, 12).map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.alt || 'Image'}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  />
                ))}
              </div>
            )}

            {parsedContent?.paragraphs.map((text, idx) => (
              <p key={idx} style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
                {text}
              </p>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
