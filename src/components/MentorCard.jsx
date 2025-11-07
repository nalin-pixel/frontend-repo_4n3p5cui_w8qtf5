import React, { useEffect, useRef, useState } from 'react'

export default function MentorCard() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting && entry.intersectionRatio > 0.3)
        })
      },
      { threshold: [0.2, 0.5, 0.8] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-3xl will-change-transform"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`mx-auto w-full rounded-2xl border-2 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md p-6 flex items-center gap-6 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
        } border-blue-500 shadow-blue-500/40 animate-[pulse_3s_ease-in-out_infinite]`}
        style={{ transform: visible ? 'translateZ(150px) scale(1)' : 'translateZ(0px) scale(0.98)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&auto=format&fit=crop"
          alt="Mentor Saikat"
          className="h-24 w-24 rounded-xl object-cover ring-2 ring-blue-500/60"
          loading="eager"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Saikat
          </h2>
          <p className="text-blue-600 dark:text-cyan-400">Mentor • The Last neuron</p>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Guiding the squad with clarity and momentum. Scroll to meet the team.
          </p>
        </div>
      </div>
    </section>
  )
}
