import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    template: "%s | Kairós", // Ex: "Barbearia do Zé | Kairós"
    default: "Sua agenda inteligente", // Ex: Apenas "Sua agenda inteligente" na home
  },
  description: "Agendamento online simples e rápido. Teste grátis.",
  // REMOVIDO O BLOCO "icons" PARA PERMITIR QUE O NEXT.JS USE OS ARQUIVOS app/icon.png E app/apple-icon.png AUTOMATICAMENTE
  openGraph: {
    title: "Sua agenda inteligente",
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