import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Protege sua área administrativa se houver
    },
    sitemap: 'https://egkairos.com.br/sitemap.xml',
  }
}