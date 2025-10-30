import Link from 'next/link';

export default function Navigation({ pages, categories }) {
  return (
    <nav style={{
      background: '#f8f9fa',
      padding: '1rem 2rem',
      borderBottom: '2px solid #e9ecef'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <Link
          href="/"
          style={{
            fontWeight: 'bold',
            color: '#0070f3',
            textDecoration: 'none',
            fontSize: '1.2rem'
          }}
        >
          Αρχική
        </Link>

        <Link
          href="/shop"
          style={{
            fontWeight: 'bold',
            color: '#0070f3',
            textDecoration: 'none',
            fontSize: '1.2rem'
          }}
        >
          🛒 Shop
        </Link>

        {pages && pages.length > 0 && (
          <>
            {pages.slice(0, 5).map(page => (
              <Link
                key={page.id}
                href={`/${page.slug}`}
                style={{
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                {page.title.rendered}
              </Link>
            ))}
          </>
        )}

        {categories && categories.length > 0 && (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ color: '#666', fontWeight: 'bold' }}>Κατηγορίες:</span>
            {categories.filter(cat => cat.count > 0).slice(0, 5).map(category => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                style={{
                  color: '#0070f3',
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                {category.name} ({category.count})
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
