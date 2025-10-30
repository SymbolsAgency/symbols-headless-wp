import { getAllPages, getAllCategories } from '@/lib/wordpress';
import Navigation from './components/Navigation';
import './globals.css';

export const metadata = {
  title: 'Symbols - Creative Branding Agency',
  description: 'Professional branding, rebranding, and logo design services in Greece',
}

export default async function RootLayout({ children }) {
  const pages = await getAllPages();
  const categories = await getAllCategories();

  return (
    <html lang="el">
      <body>
        {/* Top Promo Banner */}
        <div className="promo-banner">
          &gt;&gt; ΠΡΟΣΦΟΡΑ ΟΚΤΩΒΡΙΟΥ: ΔΗΜΙΟΥΡΓΙΑ ΛΟΓΟΤΥΠΟΥ ΑΠΟ 250€ &lt;&lt;
        </div>

        {/* Main Header with Logo */}
        <header className="main-header">
          <div className="header-container">
            <div className="logo">
              <span className="logo-s">S</span>
              <span className="logo-y">Y</span>
              <span className="logo-n">N</span>
              <span className="logo-m">M</span>
              <span className="logo-b">B</span>
              <span className="logo-o">O</span>
              <span className="logo-l">L</span>
              <span className="logo-s2">S</span>
              <span className="logo-r">®</span>
            </div>
            <p className="tagline">Branding Agency</p>
          </div>
        </header>

        <Navigation pages={pages} categories={categories} />

        {children}

        <footer>
          <p>© 2025 Symbols® - Creative Branding Agency | Powered by WordPress + Next.js</p>
        </footer>
      </body>
    </html>
  )
}
