/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static HTML export για shared hosting
  images: {
    unoptimized: true, // Απαραίτητο για static export
  },
}

module.exports = nextConfig
