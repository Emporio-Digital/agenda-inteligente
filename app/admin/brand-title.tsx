'use client'

import { useState, useEffect } from 'react'

export default function BrandTitle({ tenantName }: { tenantName: string }) {
  const [text, setText] = useState('KAIRÓS')

  useEffect(() => {
    const timer = setInterval(() => {
      setText(prev => (prev === 'KAIRÓS' ? (tenantName || 'KAIRÓS') : 'KAIRÓS'))
    }, 10000)
    return () => clearInterval(timer)
  }, [tenantName])

  return (
    <div className="flex items-center min-w-0 select-none overflow-hidden max-w-[200px] md:max-w-none">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap');

        .logo-animate {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          position: relative;
          color: transparent;
          -webkit-text-stroke: 0px;
          white-space: nowrap;
          padding-right: 6px;
          animation: slideLogoMobile 10s linear infinite;
        }

        @keyframes slideLogoMobile {
          0%, 2% {
            transform: translateX(0);
          }
          12%, 82% {
            transform: translateX(min(0px, calc(200px - 100%)));
          }
          95%, 100% {
            transform: translateX(0);
          }
        }

        @media (min-width: 768px) {
          .logo-animate {
            animation: none;
            transform: none;
          }
        }

        .logo-animate::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(to right, #090d16 25%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 0.5px #1d4ed8;
          border-right: 2.5px solid #2563eb;
          overflow: hidden;
          animation: fillLogoLoop 10s linear infinite;
        }

        @keyframes fillLogoLoop {
          0%, 2% {
            width: 0;
            border-right-color: #2563eb;
          }
          12% {
            width: 100%;
            border-right-color: #2563eb;
          }
          13%, 80% {
            width: 100%;
            border-right-color: transparent;
          }
          82% {
            width: 100%;
            border-right-color: #2563eb;
          }
          95% {
            width: 0;
            border-right-color: #2563eb;
          }
          98%, 100% {
            width: 0;
            border-right-color: transparent;
          }
        }
          .logo-animate.is-business {
          animation-name: slideLogoMobileBusiness;
        }

        .logo-animate.is-business::before {
          animation-name: fillLogoLoopBusiness;
        }

        @keyframes slideLogoMobileBusiness {
          0%, 2% {
            transform: translateX(0);
          }
          25%, 75% {
            transform: translateX(min(0px, calc(200px - 100%)));
          }
          95%, 100% {
            transform: translateX(0);
          }
        }

        @keyframes fillLogoLoopBusiness {
          0%, 2% {
            width: 0;
            border-right-color: #2563eb;
          }
          25% {
            width: 100%;
            border-right-color: #2563eb;
          }
          26%, 73% {
            width: 100%;
            border-right-color: transparent;
          }
          75% {
            width: 100%;
            border-right-color: #2563eb;
          }
          95% {
            width: 0;
            border-right-color: #2563eb;
          }
          98%, 100% {
            width: 0;
            border-right-color: transparent;
          }
        }
      `}</style>

      <div
        key={text}
        className={`logo-animate font-black tracking-[-0.04em] text-2xl md:text-3xl uppercase italic leading-none shrink-0 ${text !== 'KAIRÓS' ? 'is-business' : ''}`}
        data-text={text}
      >
        {text}
      </div>
    </div>
  )
}