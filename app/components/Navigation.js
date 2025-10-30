import Link from 'next/link';

export default function Navigation({ pages, categories }) {
  return (
    <nav>
      <div className="nav-container">
        <Link href="/" className="nav-primary">
          Αρχική
        </Link>

        <Link href="/shop" className="nav-primary">
          🛒 Shop
        </Link>

        {pages && pages.length > 0 && (
          <>
            {pages.slice(0, 5).map(page => (
              <Link
                key={page.id}
                href={`/${page.slug}`}
              >
                {page.title.rendered}
              </Link>
            ))}
          </>
        )}

        {categories && categories.length > 0 && (
          <div className="nav-categories">
            <span className="nav-categories-label">Κατηγορίες:</span>
            {categories.filter(cat => cat.count > 0).slice(0, 5).map(category => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
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
