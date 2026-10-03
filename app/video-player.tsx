"use client"

import { useState } from "react"

export default function VideoPlayer() {
  const [playVideo, setPlayVideo] = useState(false)

  return (
    <div className="relative rounded-[2.3rem] overflow-hidden border-[6px] border-slate-950 bg-black aspect-[9/19] w-full shadow-inner">
      {playVideo ? (
        <iframe 
          src="https://www.youtube.com/embed/TXJnEl8QeJA?autoplay=1" 
          title="Tutorial Kairós"
          className="w-full h-full" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div 
          onClick={() => setPlayVideo(true)} 
          className="relative w-full h-full cursor-pointer group flex items-center justify-center"
        >
          <img 
            src="/capa-video.jpg" 
            alt="Tutorial Kairós" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-blue-600 transition-all border border-white/30">
            <svg className="w-7 h-7 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}