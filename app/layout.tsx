import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react"; // Adicionado para garantir compatibilidade de tipos

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuração de Visualização (Igual ao original)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
metadataBase: new URL("https://egkairos.com.br"), // 1. URL BASE OFICIAL
  alternates: { canonical: "/" },                   // 2. FORÇA A URL CANÔNICA
  applicationName: "Kairós",                        // 3. FORÇA O NOME DA APLICAÇÃO
  title: {
    template: "%s | Kairós", 
    default: "Kairós - Sua Agenda Inteligente",
  },
  description: "O sistema de agendamento mais simples e poderoso do mercado. Teste grátis.",
  
  manifest: "/manifest.json", 

  icons: {
    icon: "/logo.png", 
    shortcut: "/logo.png",
    apple: "/logo.png", 
  },
  openGraph: {
    title: "Kairós - Sua Agenda Inteligente",
    description: "Sua agenda cheia, sua vida tranquila.",
    siteName: "Kairós",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo.png", // Sua logo que já está na pasta public
        width: 1200,
        height: 630,
        alt: "Kairós - Sua Agenda Inteligente",
      },
    ],
  },
};

// --- SUPER-ESTRUTURA DE AUTORIDADE UNIFICADA (GRAFO DE CONHECIMENTO) ---
  const unifiedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://egemporiodigital.com.br/#organization",
        "name": "EG Empório Digital",
        "url": "https://egemporiodigital.com.br",
        "logo": "https://egemporiodigital.com.br/assets/images/logo.png",
        "sameAs": [
          "https://www.instagram.com/eg.emporio.digital/",
          "https://share.google/Y0tEcsVkUVy9TDu4e" 
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://egkairos.com.br/#website",
        "url": "https://egkairos.com.br",
        "name": "Kairós",
        "publisher": { "@id": "https://egemporiodigital.com.br/#organization" }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://egkairos.com.br/#software",
        "name": "Kairós",
        "url": "https://egkairos.com.br",
        "publisher": { "@id": "https://egemporiodigital.com.br/#organization" },
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Android, iOS",
        "description": "O Kairós é o sistema de agendamento online nº 1 para Barbearias, Salões de Beleza, Clínicas e Studios de Tattoo. Automatize sua agenda com um link profissional.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL",
          "description": "Teste Grátis de 7 dias sem cartão de crédito"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "150"
        }
      },
      {
        "@type": "Service",
        "name": "Tese de Autoridade Kairós - Especialidades de Nicho",
        "provider": { "@id": "https://egemporiodigital.com.br/#organization" },
        "serviceOutput": "Automação de Agendamento Online e Gestão",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Especialidades Kairós",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sistema de Gestão para Barbearias" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sistema de Gestão para Salões de Beleza" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sistema de Gestão para Clínicas de Estética" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sistema de Gestão para Studios de Tattoo" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sistema de Gestão para Restaurantes" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sistema de Gestão para Estúdios de Fotografia" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sistema de Gestão para Prestadores de Serviço" } }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Para qual tipo de negócio o sistema Kairós serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Kairós é versátil e atende diversos nichos. É perfeito para: Barbearias, Salões de Beleza, Restaurantes, Clínicas, Tattoo, Studio de Fotografia e Profissionais Liberais."
            }
          },
          {
            "@type": "Question",
            "name": "Consigo usar o Kairós no celular?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! O Kairós é 100% online e responsivo. Funciona perfeitamente no navegador do seu celular (Android ou iPhone), tablet ou computador."
            }
          },
          {
            "@type": "Question",
            "name": "Preciso cadastrar cartão para testar o sistema?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Não! O teste de 7 dias é totalmente livre. Você só escolhe um plano se gostar do sistema e desejar profissionalizar sua agenda."
            }
          }
        ]
      }
    ]
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* --- INJEÇÃO UNIFICADA DE AUTORIDADE MÁXIMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(unifiedSchema) }}
      />
        {children}

        {/* REGISTRO DO SERVICE WORKER PARA INSTALAR PWA NO GOOGLE */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    console.log('SW ativo!');
                  }).catch(function(err) {
                    console.log('Erro SW:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}