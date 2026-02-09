import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
// IMPORT CORRIGIDO: Sobe dois níveis (../../) para sair de [slug], sair de blog e achar a lib
import { getPostBySlug } from "../../lib/blog-data"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) return { title: "Artigo não encontrado | Kairós" }
  
  return {
    title: `${post.title} | Blog Kairós`,
    description: post.excerpt,
    keywords: post.keywords, // Puxa as keywords específicas do post (tattoo, barbearia, etc)
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://kairos.egemporiodigital.com.br/blog/${slug}`,
      siteName: "Sistema Kairós",
      locale: "pt_BR",
    },
    alternates: {
      canonical: `https://kairos.egemporiodigital.com.br/blog/${slug}`,
    }
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return notFound()
  }

  // SCHEMA.ORG PARA ARTIGO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "Equipe Kairós"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kairós",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kairos.egemporiodigital.com.br/logo.png"
      }
    },
    "datePublished": "2026-02-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://kairos.egemporiodigital.com.br/blog/${slug}`
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-blue-500 selection:text-white">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/blog" className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            ← Voltar para o Blog
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs text-gray-500 font-medium">Automatize seu negócio</span>
            <Link href="/cadastro" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]">
              Teste Grátis
            </Link>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 uppercase tracking-widest font-bold">
          <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-blue-500">{post.category}</span>
        </div>

        {/* HEADER DO POST */}
        <header className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-center gap-3 mb-6">
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20">
              {post.category}
            </span>
            <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
              ⏱ {post.timeToRead}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500 border-t border-white/5 pt-6 w-max mx-auto px-10">
            <span>Por <strong>Equipe Kairós</strong></span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </header>

        {/* CONTEÚDO (ESTILIZADO) */}
        <div 
          className="prose prose-invert prose-lg mx-auto 
          prose-headings:text-white prose-headings:font-bold 
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4
          prose-h3:text-xl prose-h3:text-blue-200
          prose-p:text-gray-300 prose-p:leading-relaxed 
          prose-li:text-gray-300 prose-strong:text-white 
          prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-blue-500 prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
          transition-colors"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* LINKS INTERNOS PARA OS 7 NICHOS (SEO LOCAL REVERSO) */}
        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
          <h4 className="text-white font-bold mb-4">Veja também como o Kairós ajuda:</h4>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-400">
             <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Barbearias e Salões</li>
             <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Studios de Tattoo</li>
             <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Clínicas de Estética</li>
             <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Restaurantes (Reservas)</li>
             <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Fotógrafos e Escritórios</li>
          </ul>
        </div>

        {/* CARD CTA NO FINAL */}
        <div className="mt-20 p-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl transform hover:scale-[1.01] transition-transform duration-300">
          <div className="bg-black rounded-[22px] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-20"></div>
            
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 relative z-10">
              Pare de perder dinheiro com No-Show.
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto text-lg relative z-10">
              O sistema ideal para o seu negócio, seja você tatuador, barbeiro ou dentista.
            </p>
            
            <Link 
              href="/cadastro" 
              className="inline-flex items-center gap-2 bg-white text-black text-lg font-bold px-8 py-4 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)] relative z-10"
            >
              Criar Conta Grátis 🚀
            </Link>
            <p className="mt-4 text-xs text-gray-600 uppercase tracking-widest font-bold relative z-10">Sem cartão de crédito • 3 dias grátis</p>
          </div>
        </div>

      </article>

      <footer className="py-12 text-center border-t border-white/5 mt-12 bg-black/50">
        <div className="text-gray-500 text-sm mb-2">Blog Kairós | EG Empório Digital</div>
        <div className="text-xs text-gray-700">O sistema ideal para Barbearia, Salão, Tattoo, Restaurante e Clínicas.</div>
      </footer>
    </div>
  )
}