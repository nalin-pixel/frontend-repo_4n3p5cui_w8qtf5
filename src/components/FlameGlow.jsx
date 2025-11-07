import React from 'react'

export default function FlameGlow({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-visible ${className}`} aria-hidden>
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-30 animate-[pulse_3s_ease-in-out_infinite]" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.6), rgba(34,211,238,0.45), rgba(37,99,235,0.5))'
      }} />
      <div className="absolute right-1/4 bottom-1/4 w-[35vw] h-[35vw] rounded-full blur-2xl opacity-20 animate-[pulse_3s_ease-in-out_infinite]" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.25), rgba(59,130,246,0.25), rgba(34,211,238,0.25))',
        animationDelay: '1.2s'
      }} />
    </div>
  )
}
