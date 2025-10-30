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
        <header>
          <div className="container">
            <h1>Symbols Blog</h1>
            <p>Headless WordPress + Next.js</p>
          </div>
        </header>

        <Navigation pages={pages} categories={categories} />

        {children}

        <footer>
          <p>© 2025 Symbols - Creative Branding Agency | Powered by WordPress + Next.js</p>
        </footer>
      </body>
    </html>
  )
}
