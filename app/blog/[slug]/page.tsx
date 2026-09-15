import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
// IMPORT CORRIGIDO: Sobe dois níveis (../../) para sair de [slug], sair de blog e achar a lib
import { getPostBySlug } from "../../lib/blog-data"
import BrandTitle from "@/app/admin/brand-title"

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
      url: `https://egkairos.com.br/blog/${slug}`,
      siteName: "Kairós",
      locale: "pt_BR",
    },
    alternates: {
      canonical: `https://egkairos.com.br/blog/${slug}`,
    },
    icons: { icon: "/logo.png", apple: "/logo.png" },
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
        "url": "https://egkairos.com.br/logo.png"
      }
    },
    "datePublished": "2026-02-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://egkairos.com.br/blog/${slug}`
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- ESTILOS GLOBAIS --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        .brand-scanner {
          font-family: 'Orbitron', sans-serif;
          position: relative;
          color: #0f172a;
          white-space: nowrap;
        }
        .brand-scanner::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(to right, #090d16 20%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.5px #1d4ed8;
          border-right: 2.5px solid #2563eb;
          overflow: hidden;
          animation: fillScannerLoop 5s linear infinite;
        }
        @keyframes fillScannerLoop {
          0%, 5% { width: 0; border-right-color: #2563eb; }
          40% { width: 100%; border-right-color: #2563eb; }
          45%, 75% { width: 100%; border-right-color: transparent; }
          80% { width: 100%; border-right-color: #2563eb; }
          95%, 100% { width: 0; border-right-color: #2563eb; }
        }
      `}} />

      {/* --- BACKGROUND FIXO --- */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden bg-slate-50 transform-gpu will-change-transform">
        <div className="absolute w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-blue-400/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] opacity-35 transition-all">
          <img src="/logo-fundo.png" alt="" className="w-full h-auto object-contain drop-shadow-[0_10px_35px_rgba(37,99,235,0.15)]" />
        </div>
        
        <div className="absolute inset-0 bg-slate-50/30 backdrop-blur-[1px]"></div> 
      </div>

      {/* WRAPPER FIXO DO HEADER + MENU DESLIZANTE */}
      <div className="fixed top-0 left-0 w-full z-50">
        <input type="checkbox" id="toggle-lp-menu" className="peer sr-only" />

        <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 py-2.5 md:py-3 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* LADO ESQUERDO: DOCK CYBER-GLASS + BRANDTITLE */}
            <div className="flex items-center gap-4 min-w-0">
              <Link href="/" className="relative w-14 h-14 md:w-15 md:h-15 rounded-2xl p-[3px] bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_24px_-6px_rgba(15,23,42,0.2),0_0_14px_rgba(0,240,255,0.25),inset_0_1.5px_1px_rgba(255,255,255,1)] flex items-center justify-center shrink-0">
                <div className="absolute inset-[2.5px] rounded-[13px] border border-cyan-400/50 shadow-[0_0_8px_#00f0ff,inset_0_0_6px_#00f0ff] pointer-events-none" />
                <div className="relative z-10 w-full h-full rounded-[11px] overflow-hidden bg-slate-950 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center border border-slate-900">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
                </div>
              </Link>
              
              <BrandTitle tenantName="SUA AGENDA INTELIGENTE" />
            </div>

            {/* LADO DIREITO DESKTOP */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link 
                href="/blog" 
                className="bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-500/50 hover:bg-slate-50 px-5 py-2.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 whitespace-nowrap flex items-center gap-2"
              >
                <span>←</span> Voltar ao Blog
              </Link>

              <Link 
                href="/cadastro" 
                className="relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95 border border-blue-500/40 whitespace-nowrap flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Teste Grátis
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>

            {/* LADO DIREITO MOBILE: BOTÃO HAMBURGUER */}
            <label 
              htmlFor="toggle-lp-menu" 
              className="md:hidden cursor-pointer relative p-[2px] rounded-2xl overflow-hidden group flex items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <div className="relative z-10 p-2.5 rounded-[calc(1rem-2px)] w-full h-full flex items-center justify-center transition-all bg-white border border-slate-200 group-hover:bg-slate-50 group-hover:border-blue-500/50 shadow-sm">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
            </label>

          </div>
        </header>

        {/* GAVETA DESLIZANTE MOBILE */}
        <div className="md:hidden w-full bg-slate-50/98 backdrop-blur-xl border-b border-slate-200 overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out grid grid-rows-[0fr] peer-checked:grid-rows-[1fr] opacity-0 peer-checked:opacity-100 shadow-xl">
          <div className="min-h-0">
            <div className="px-6 py-6 flex flex-col gap-3">
              <Link 
                href="/blog" 
                className="w-full text-center bg-white border border-slate-200 text-slate-800 hover:text-blue-600 hover:border-blue-500/50 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
              >
                ← Voltar ao Blog
              </Link>

              <Link 
                href="/cadastro" 
                className="w-full text-center relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-blue-500/25 transition-all active:scale-95 border border-blue-500/40 flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Teste Grátis Agora
                  <span>→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10">
        <article className="max-w-4xl mx-auto px-6 pt-36 md:pt-44 pb-20">
          
          {/* BREADCRUMBS */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8 uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-blue-600">{post.category}</span>
          </div>

          {/* HEADER DO POST */}
          <header className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-center gap-3 mb-6">
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-blue-200/80 shadow-sm">
                {post.category}
              </span>
              <span className="bg-white text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-200/80 shadow-sm">
                ⏱ {post.timeToRead}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.15] tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-3 text-sm text-slate-500 border-t border-slate-200/80 pt-6 w-max mx-auto px-10">
              <span>Por <strong className="text-slate-800 font-bold">Equipe Kairós</strong></span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </header>

          {/* CONTAINER ACRÍLICO DO CONTEÚDO (ESTILIZADO PARA O NOVO TEMA LIGHT) */}
          <div className="bg-white/70 backdrop-blur-2xl border border-white/90 rounded-[2.5rem] p-8 md:p-14 shadow-[inset_0_1.5px_1px_rgba(255,255,255,1),0_16px_36px_-10px_rgba(15,23,42,0.1)]">
            <div 
              className="prose prose-lg max-w-none 
              prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-blue-600 prose-h2:pl-4
              prose-h3:text-xl prose-h3:text-indigo-700
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-normal
              prose-li:text-slate-700 prose-strong:text-slate-900 prose-strong:font-bold
              prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50/60 prose-blockquote:p-5 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-800
              transition-colors"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* LINKS INTERNOS PARA OS 7 NICHOS (SEO LOCAL REVERSO) */}
            <div className="mt-14 p-7 bg-slate-50/80 border border-slate-200/80 rounded-2xl shadow-sm">
              <h4 className="text-slate-900 font-black text-base uppercase tracking-wider mb-4">Veja também como o Kairós ajuda:</h4>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-slate-700 font-medium">
                 <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">✓</span> Barbearias e Salões</li>
                 <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">✓</span> Studios de Tattoo</li>
                 <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">✓</span> Clínicas de Estética</li>
                 <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">✓</span> Restaurantes (Reservas)</li>
                 <li className="flex items-center gap-2"><span className="text-blue-600 font-bold">✓</span> Fotógrafos e Escritórios</li>
              </ul>
            </div>
          </div>

          {/* CARD CTA NO FINAL (PREMIUM COM BISEL) */}
          <div className="mt-16 p-[1px] rounded-[2.5rem] bg-gradient-to-r from-blue-500/20 via-blue-600 to-indigo-500/20 shadow-xl">
            <div className="bg-slate-900 text-white rounded-[calc(2.5rem-1px)] p-8 md:p-14 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none"></div>
              
              <h3 className="text-2xl md:text-4xl font-black text-white mb-4 relative z-10 uppercase italic tracking-tight">
                Pare de perder dinheiro com No-Show.
              </h3>
              <p className="text-slate-300 mb-8 max-w-lg mx-auto text-base md:text-lg relative z-10 font-normal">
                O sistema ideal para o seu negócio, seja você barbeiro, tatuador ou dentista.
              </p>
              
              <Link 
                href="/cadastro" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-bold px-9 py-4 rounded-full transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 relative z-10"
              >
                Criar Conta Grátis 🚀
              </Link>
              <p className="mt-4 text-xs text-slate-400 uppercase tracking-widest font-bold relative z-10">Sem cartão de crédito • 7 dias grátis</p>
            </div>
          </div>

        </article>

      {/* --- FOOTER COMPLETO PADRÃO KAIRÓS --- */}
        <footer className="bg-white/80 backdrop-blur-xl pt-10 pb-6 border-t border-slate-200/80 relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* CABEÇALHO DO RODAPÉ - LOGOS */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 mb-8 pb-6 border-b border-slate-200/80">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo Kairós" className="w-10 h-10 object-contain" />
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter text-slate-900 uppercase leading-none">Kairós</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Sua agenda inteligente</span>
                </div>
              </div>
              <div className="hidden md:block w-[1px] h-6 bg-slate-200 mx-4"></div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest leading-none mb-1">Uma solução do grupo</span>
                <Link href="https://egemporiodigital.com.br" target="_blank" className="text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors">
                  EG EMPÓRIO DIGITAL
                </Link>
              </div>
            </div>

            {/* GRID DE CONTEÚDO */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
              
              {/* COLUNA 1 - INSTITUCIONAL */}
              <div className="flex flex-col gap-3">
                <h4 className="text-blue-600 font-black uppercase text-[11px] tracking-widest">Institucional</h4>
                <ul className="flex flex-col gap-2 text-xs text-slate-600 font-medium">
                  <li><Link href="https://egemporiodigital.com.br/sobre" target="_blank" className="hover:text-blue-600 transition-colors">Sobre a EG Empório Digital</Link></li>
                  <li><Link href="https://egemporiodigital.com.br/servicos" target="_blank" className="hover:text-blue-600 transition-colors">Nossos Serviços</Link></li>
                  <li><Link href="https://egemporiodigital.com.br/saas" target="_blank" className="hover:text-blue-600 transition-colors">Outras Automações</Link></li>
                  <li><Link href="#" className="hover:text-blue-600 transition-colors">Política de Privacidade</Link></li>
                </ul>
              </div>

              {/* COLUNA 2 - HUB DE SOLUÇÕES */}
              <div className="flex flex-col gap-3">
                <h4 className="text-blue-600 font-black uppercase text-[11px] tracking-widest">Conheça</h4>
                <ul className="flex flex-col gap-2 text-xs text-slate-600 font-medium">
                  <li><Link href="/sistema-de-gestao-para-barbearias" className="hover:text-blue-600 transition-colors text-slate-900 font-bold tracking-tight">💈 Gestão de Barbearias</Link></li>
                  <li><span className="opacity-40 text-slate-400 italic">💅 Gestão de Salões (Em breve)</span></li>
                  <li><span className="opacity-40 text-slate-400 italic">🏥 Gestão de Clínicas (Em breve)</span></li>
                  <li><span className="opacity-40 text-slate-400 italic">🐉 Gestão de Studios (Em breve)</span></li>
                </ul>
              </div>

              {/* COLUNA 3 - COMERCIAL E REDES */}
              <div className="flex flex-col gap-3">
                <h4 className="text-blue-600 font-black uppercase text-[11px] tracking-widest">Comercial</h4>
                <ul className="flex flex-col gap-2 text-xs text-slate-600 font-medium mb-2">
                  <li><Link href="/cadastro" className="hover:text-blue-700 transition-colors font-bold text-blue-600">Teste Grátis</Link></li>
                  <li><Link href="/sistema-de-gestao-para-barbearias#planos" className="hover:text-blue-600 transition-colors">Planos e Preços</Link></li>
                </ul>
                
                <h4 className="text-blue-600 font-black uppercase text-[10px] tracking-widest">Siga-nos</h4>
                <div className="flex justify-center md:justify-start">
                  <Link href="https://instagram.com/eg.emporio.digital" target="_blank" className="w-8 h-8 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all group shadow-sm">
                    <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* COLUNA 4 - TECNOLOGIA / STATUS */}
              <div className="flex flex-col gap-3">
                <h4 className="text-blue-600 font-black uppercase text-[11px] tracking-widest">Tecnologia</h4>
                <div className="bg-white/80 border border-slate-200/80 p-3 rounded-xl shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Sistema</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-900">Kairós</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RODAPÉ FINAL - COPYRIGHT */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                © EG EMPÓRIO DIGITAL
              </p>
            </div>

          </div>
        </footer>

      </main>

      {/* --- BOTÃO WHATSAPP FLUTUANTE --- */}
      <a 
        href="https://wa.me/5511916053292" 
        target="_blank" 
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl shadow-green-900/30 z-50 transition-all hover:-translate-y-1 flex items-center gap-2 border border-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.68-2.031-9.67-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.586.085-.893.421-.306.335-1.169 1.141-1.169 2.784 0 1.642 1.198 3.227 1.372 3.461.174.234 2.358 3.6 5.714 5.05.798.345 1.42.551 1.902.705 1.05.336 2.007.288 2.756.175.845-.127 1.831-.749 2.088-1.472.257-.723.257-1.343.18-1.472-.078-.129-.276-.203-.574-.352z"/>
        </svg>
        <span className="font-bold text-sm hidden md:block">Suporte</span>
      </a>
    </div>
  )
}