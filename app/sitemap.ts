import { MetadataRoute } from 'next'
import { getPosts } from './lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts()
  const baseUrl = 'https://kairos.egemporiodigital.com.br'

  // FUNÇÃO DE SEGURANÇA: Converte datas PT-BR para ISO Internacional
  // O JavaScript não entende "FEV", então traduzimos para "Feb"
  const parseDate = (dateStr: string) => {
    try {
      const monthMap: Record<string, string> = {
        'JAN': 'Jan', 'FEV': 'Feb', 'MAR': 'Mar', 'ABR': 'Apr',
        'MAI': 'May', 'JUN': 'Jun', 'JUL': 'Jul', 'AGO': 'Aug',
        'SET': 'Sep', 'OUT': 'Oct', 'NOV': 'Nov', 'DEZ': 'Dec'
      };
      
      const parts = dateStr.toUpperCase().split(' '); // Separa ["08", "FEV", "2026"]
      
      if (parts.length === 3) {
        const enMonth = monthMap[parts[1]] || parts[1];
        // Retorna formato que o Google ama: YYYY-MM-DD
        return new Date(`${enMonth} ${parts[0]} ${parts[2]}`).toISOString();
      }
      return new Date().toISOString(); // Se falhar, usa data de hoje
    } catch (e) {
      return new Date().toISOString(); // Fallback de segurança
    }
  }

  // 1. Mapeia os Artigos do Blog
  const blogs = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: parseDate(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 2. Mapeia as Páginas Estáticas Principais
  const routes = [
    '',           // Home
    '/blog',      // Blog Home
    '/cadastro',  // Página de Vendas (Alta prioridade)
    '/login',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 1, // Prioridade máxima
  }))

  // Junta tudo e entrega para o Google
  return [...routes, ...blogs]
}