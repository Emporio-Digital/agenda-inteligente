'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'
import Link from 'next/link'

interface HeaderActionsProps {
  shareUrl: string
  tenantSlug: string
}

export default function HeaderActions({ shareUrl, tenantSlug }: HeaderActionsProps) {
  const [isQrOpen, setIsQrOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // NOVA LÓGICA: Salvar Imagem na Galeria em vez de Imprimir
  const handleSaveImage = () => {
    const svg = document.getElementById('qr-wrapper')?.querySelector('svg')
    
    if (svg) {
        // Serializa o SVG para converter em imagem
        const svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        // Definimos uma resolução alta para a imagem ficar nítida na impressão (1000x1000)
        const size = 1000
        canvas.width = size
        canvas.height = size

        img.onload = () => {
            if (ctx) {
                // Fundo Branco (importante para não ficar transparente na galeria do celular)
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, size, size)
                
                // Desenha o QR Code
                ctx.drawImage(img, 0, 0, size, size)
                
                // Converte para PNG e força o download
                const pngUrl = canvas.toDataURL('image/png')
                const downloadLink = document.createElement('a')
                downloadLink.download = `Kairós-QR-${tenantSlug}.png`
                downloadLink.href = pngUrl
                downloadLink.click()
            }
        }

        // Truque para carregar SVG no Canvas
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    }
  }

  return (
    <>
      <div className="flex gap-2 items-center bg-slate-900 p-1.5 rounded-2xl shadow-lg border border-slate-800">
        
        {/* BOTÃO LINK / COPIAR */}
        <button 
            onClick={handleCopy}
            className="flex items-center gap-3 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all border border-slate-700/50 group"
            title="Copiar Link"
        >
            <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold uppercase text-slate-500 group-hover:text-slate-400 transition-colors">
                    {copied ? 'Copiado!' : 'Link Público'}
                </span>
                <span className="text-blue-400 font-bold text-xs truncate max-w-[100px] sm:max-w-[140px]">
                    {shareUrl.replace('https://', '')}
                </span>
            </div>
            {copied ? (
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : (
                <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            )}
        </button>

        {/* BOTÃO QR CODE */}
        <button 
            onClick={() => setIsQrOpen(true)}
            className="h-full px-3 py-2 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-700/50 flex items-center justify-center"
            title="Gerar QR Code de Balcão"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4h-4v-2h-2v4h6v-4h2v4h2v-4h2l-2-4h-2l2-4h-2l2-4h-2l2-4h-2l2-4h-2zM3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6z" />
            </svg>
        </button>

        {/* BOTÃO VER SITE */}
        <a 
            href={shareUrl} 
            target="_blank" 
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all h-[42px]"
        >
            Ver Site 
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>

      {/* MODAL QR CODE */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative">
                
                <button 
                    onClick={() => setIsQrOpen(false)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white">QR Code de Balcão</h3>
                    <p className="text-sm text-slate-400 mt-2">Use na recepção para clientes agendarem sozinhos.</p>
                </div>

                {/* ID Adicionado aqui para captura */}
                <div className="bg-white p-4 rounded-2xl mx-auto w-fit mb-6 shadow-inner" id="qr-wrapper">
                    <QRCode 
                        value={shareUrl}
                        size={200}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox={`0 0 256 256`}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    {/* BOTÃO ALTERADO PARA SALVAR */}
                    <button 
                        onClick={handleSaveImage}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        {/* Ícone de Download */}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Salvar QR Code
                    </button>
                    <p className="text-xs text-center text-slate-500">
                        A imagem será salva na sua galeria.
                    </p>
                </div>
            </div>
        </div>
      )}
    </>
  )
}