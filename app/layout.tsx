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
    template: "%s | Kairós",
    default: "Kairós - Sua Agenda Inteligente", // Título padrão se não houver um específico
  },
  description: "O sistema de agendamento mais simples e poderoso do mercado. Teste grátis.",
  icons: {
    icon: "/logo.png", // Usa o arquivo que já existe na sua pasta public
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Kairós",
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