import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuração de Visualização e Cor do Tema (O que o Android exige para mostrar o logo)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000", // Define a identidade do app para o Chrome
};

export const metadata: Metadata = {
  title: {
    template: "%s | Kairós", 
    default: "Kairós - Sua Agenda Inteligente",
  },
  description: "O sistema de agendamento mais simples e poderoso do mercado. Teste grátis.",
  // FORÇANDO ÍCONES MANUALMENTE (Estratégia Força Bruta para iPhone e Android)
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}