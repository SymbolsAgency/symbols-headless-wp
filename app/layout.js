import { getAllPages, getAllCategories } from '@/lib/wordpress';
import Navigation from './components/Navigation';

export const metadata = {
  title: 'Symbols Blog - Headless WordPress',
  description: 'Powered by WordPress + Next.js',
}

export default async function RootLayout({ children }) {
  const pages = await getAllPages();
  const categories = await getAllCategories();

  return (
    <html lang="el">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <header style={{
          background: '#0070f3',
          color: 'white',
          padding: '1.5rem 2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ margin: 0 }}>Symbols Blog</h1>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
              Headless WordPress + Next.js
            </p>
          </div>
        </header>

        <Navigation pages={pages} categories={categories} />

        {children}

        <footer style={{
          background: '#f0f0f0',
          padding: '2rem',
          textAlign: 'center',
          marginTop: '3rem'
        }}>
          <p>© 2025 Symbols Blog - Powered by WordPress + Next.js</p>
        </footer>
      </body>
    </html>
  )
}
