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

  // 3. Mapeia as Páginas de SEO Local (Hub e Cidades)
  // Links atualizados para o novo padrão: sistema-de-gestao-para-barbearias
  const locaisRoutes = [
    '/sistema-de-gestao-para-barbearias', // O Hub Principal
    '/sistema-de-gestao-para-barbearias/sao-paulo',
    '/sistema-de-gestao-para-barbearias/tatuape',
    '/sistema-de-gestao-para-barbearias/carrao',
    '/sistema-de-gestao-para-barbearias/vila-formosa',
    '/sistema-de-gestao-para-barbearias/vila-prudente',
    '/sistema-de-gestao-para-barbearias/sao-bernardo',
    '/sistema-de-gestao-para-barbearias/santo-andre',
    '/sistema-de-gestao-para-barbearias/sao-caetano',
    '/sistema-de-gestao-para-barbearias/campinas',
    '/sistema-de-gestao-para-barbearias/belo-horizonte',
    '/sistema-de-gestao-para-barbearias/aruja',
    '/sistema-de-gestao-para-barbearias/ferraz-de-vasconcelos',
    '/sistema-de-gestao-para-barbearias/guarulhos',
    '/sistema-de-gestao-para-barbearias/itaquera',
    '/sistema-de-gestao-para-barbearias/rio-de-janeiro',
    '/sistema-de-gestao-para-barbearias/santos',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Prioridade alta para dominação local
  }))

  // Junta tudo e entrega para o Google
  return [...routes, ...blogs, ...locaisRoutes]
}