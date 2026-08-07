import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/admin/'], // Hindari bot dari meng-crawl halaman admin
    },
    sitemap: 'https://educoloring.ubpkarawang.ac.id/sitemap.xml',
  }
}
