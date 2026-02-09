import Link from "next/link"
import { Metadata } from "next"
// IMPORT CORRIGIDO: Sobe um nível (../) para achar a pasta lib
import { getPosts } from "../lib/blog-data" 

export const metadata: Metadata = {
  title: "Blog Kairós | Agendamento Inteligente para Negócios",
  description: "Dicas de gestão e agendamento online para Barbearias, Salões, Studios de Tattoo, Clínicas, Restaurantes, Fotógrafos e Escritórios.",
  // AQUI GARANTIMOS QUE OS 7 NICHOS SEJAM LIDOS PELO GOOGLE
  keywords: [
    "sistema de agendamento", 
    "agendamento online", 
    "agenda inteligente", 
    "barbearia", 
    "salão de beleza", 
    "studio tattoo", 
    "restaurante", 
    "clínica", 
    "fotografia", 
    "escritório",
    "agenda rápida online"
  ],
  alternates: {
    canonical: "https://kairos.egemporiodigital.com.br/blog",
  },
}

export default function BlogHome() {
  const posts = getPosts();

  // SCHEMA.ORG (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Kairós",
    "description": "Conteúdo sobre gestão e agendamento para negócios de serviços.",
    "url": "https://kairos.egemporiodigital.com.br/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Kairós",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kairos.egemporiodigital.com.br/logo.png"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "articleSection": post.category,
      "url": `https://kairos.egemporiodigital.com.br/blog/${post.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-sm text-gray-400 hover:text-white transition-colors">
            <span>← Voltar para o Sistema</span>
          </Link>
          <div className="font-bold text-xl tracking-tight">
            Blog <span className="text-blue-500">Kairós</span>
          </div>
          <Link href="/cadastro" className="hidden md:block bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-all border border-white/10">
              Criar Conta
          </Link>
        </div>
      </nav>

      <header className="py-20 px-6 text-center border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          Dominando a sua <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
            Agenda e Gestão.
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Estratégias para Barbearias, Salões, Tattoo, Clínicas e muito mais.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="block group h-full">
              <article className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:-translate-y-1 flex flex-col">
                <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-widest">
                  <span className="text-blue-400">{post.category}</span>
                  <span className="text-gray-600">{post.date}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 group-hover:text-blue-200 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="text-sm font-bold text-white flex items-center gap-2 group-hover:gap-3 transition-all mt-auto pt-4 border-t border-white/5">
                  Ler artigo <span className="text-blue-500">→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-12 text-center text-gray-600 text-sm border-t border-white/5">
        <p>© 2026 Kairós Sistema de Agendamento. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}