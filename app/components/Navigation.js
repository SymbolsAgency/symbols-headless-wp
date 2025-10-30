import Link from 'next/link';

export default function Navigation({ pages, categories }) {
  return (
    <nav>
      <div className="nav-container">
        {/* Main Navigation Items */}
        <div className="nav-main">
          <Link href="/" className="nav-item">
            ΑΡΧΙΚΗ
          </Link>

          <div className="nav-item-dropdown">
            <span className="nav-item">ΛΟΓΟΤΥΠΑ ▼</span>
            <div className="dropdown-content">
              <Link href="/category/branding">Branding</Link>
              <Link href="/category/open-source">Open Source</Link>
            </div>
          </div>

          {pages && pages.length > 0 && pages.slice(0, 3).map(page => (
            <Link
              key={page.id}
              href={`/${page.slug}`}
              className="nav-item"
            >
              {page.title.rendered.toUpperCase()}
            </Link>
          ))}

          <Link href="/shop" className="nav-item nav-shop">
            SHOP
          </Link>
        </div>

        {/* Categories - Right Side */}
        {categories && categories.length > 0 && (
          <div className="nav-categories">
            <span className="nav-categories-label">Κατηγορίες:</span>
            {categories.filter(cat => cat.count > 0).slice(0, 4).map(category => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="nav-category-link"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
