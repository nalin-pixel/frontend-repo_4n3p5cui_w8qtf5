import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Github, Linkedin } from 'lucide-react'

const TEAM = [
  { id: 1, name: 'Aanya', role: 'Product Designer', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop' },
  { id: 2, name: 'Rishi', role: 'Frontend Engineer', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=500&auto=format&fit=crop' },
  { id: 3, name: 'Ira', role: 'ML Researcher', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=500&auto=format&fit=crop' },
  { id: 4, name: 'Kabir', role: 'Backend Engineer', img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2f?q=80&w=500&auto=format&fit=crop' },
  { id: 5, name: 'Meera', role: 'Data Engineer', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop' },
  { id: 6, name: 'Arav', role: '3D Generalist', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=500&auto=format&fit=crop' }
]

function useVisibility(ids) {
  const [visible, setVisible] = useState(new Set())
  const refs = useMemo(() => new Map(ids.map((id) => [id, React.createRef()])), [ids])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const next = new Set(visible)
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-id'))
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) next.add(id)
          else next.delete(id)
        })
        setVisible(next)
      },
      { threshold: [0.2, 0.5, 0.8] }
    )

    refs.forEach((r) => r.current && io.observe(r.current))
    return () => io.disconnect()
  }, [refs])

  return { visible, refs }
}

function MemberCard({ person, row, index, visible, scrollY, prefersReduced, isMobile, exitedMap }) {
  const isTop = row === 'top'
  const baseZ = isMobile ? 0 : isTop ? 100 : -50
  const translateXStart = isTop ? 150 : -150
  const exitX = isTop ? -100 : 100

  const inView = visible.has(person.id)
  const isExited = exitedMap.get(person.id)

  const transformIn = `translateX(0px) translateZ(${baseZ}px) scale(1)`
  const transformOut = `translateX(${translateXStart}px) translateZ(${baseZ}px) scale(0.85)`
  const transformExit = `translateX(${exitX}px) translateZ(${baseZ}px) scale(0.95)`

  const speed = prefersReduced || isMobile ? 0 : isTop ? 0.3 : 0.15
  const parallaxY = scrollY * speed

  const transitionIn = 'transform 800ms cubic-bezier(0.34,1.56,0.64,1), opacity 800ms cubic-bezier(0.34,1.56,0.64,1)'
  const transitionOut = 'transform 500ms ease-in, opacity 500ms ease-in'

  const style = {
    transform: inView ? transformIn : isExited ? transformExit : transformOut,
    opacity: inView ? 1 : isExited ? 0.3 : 0,
    transition: inView ? transitionIn : transitionOut,
    willChange: 'transform, opacity',
  }

  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div
      data-id={person.id}
      role="group"
      className="relative w-[260px] md:w-[280px] lg:w-[300px] rounded-2xl border bg-white/70 dark:bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300 ease-out"
      style={{ ...style, transformStyle: 'preserve-3d', translate: `0 ${parallaxY}px` }}
    >
      {/* Hover border gradient animation */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-blue-700/30 group-hover:border-transparent"></div>
      <div className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
        background: 'linear-gradient(120deg, rgba(249,115,22,0.8), rgba(59,130,246,0.8), rgba(34,211,238,0.8))'
      }} />

      {/* Image with skeleton */}
      <div className="relative h-44 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-blue-400/10 via-cyan-300/10 to-sky-500/10" />
        )}
        <img
          src={person.img}
          alt={`${person.name} portrait`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:[transform:scale(1.15)_rotateY(5deg)]"
          loading={index > 1 ? 'lazy' : 'eager'}
          onLoad={() => setImgLoaded(true)}
        />
        {/* shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{person.name}</h3>
        <p className="text-sm text-blue-600 dark:text-cyan-400">{person.role}</p>
        <div className="mt-4 flex items-center gap-3 text-blue-500">
          <a href="#" aria-label={`${person.name} on GitHub`} className="transition transform hover:scale-125 text-blue-500 hover:text-cyan-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <Github size={18} />
          </a>
          <a href="#" aria-label={`${person.name} on LinkedIn`} className="transition transform hover:scale-125 text-blue-500 hover:text-cyan-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <Linkedin size={18} />
          </a>
        </div>
      </div>

      {/* corner accents */}
      <span className="pointer-events-none absolute left-0 top-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:w-20 transition-all duration-400" />
      <span className="pointer-events-none absolute left-0 top-0 w-0.5 h-0 bg-gradient-to-b from-blue-400 to-cyan-300 group-hover:h-20 transition-all duration-400" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-0.5 w-0 bg-gradient-to-l from-orange-400 to-blue-500 group-hover:w-20 transition-all duration-400" />
      <span className="pointer-events-none absolute right-0 bottom-0 w-0.5 h-0 bg-gradient-to-t from-orange-400 to-blue-500 group-hover:h-20 transition-all duration-400" />
    </div>
  )
}

export default function TeamShowcase() {
  const containerRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [prefersReduced, setPrefersReduced] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [exitedMap, setExitedMap] = useState(new Map())

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const listener = (e) => setPrefersReduced(e.matches)
    mq.addEventListener?.('change', listener)
    return () => mq.removeEventListener?.('change', listener)
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // rAF parallax + exit detection
  const refsReady = useRef(false)
  const ids = useMemo(() => TEAM.map((m) => m.id), [])
  const { visible, refs } = useVisibility(ids)

  useEffect(() => {
    let raf
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        // exit detection per card: past 70% viewport height
        const map = new Map()
        refs.forEach((r, id) => {
          const el = r.current
          if (!el) return
          const rect = el.getBoundingClientRect()
          const past = rect.top > window.innerHeight * 0.7
          map.set(id, past)
        })
        setExitedMap(map)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [refs])

  const top = TEAM.slice(0, 3)
  const bottom = TEAM.slice(3)

  return (
    <section ref={containerRef} className="relative py-16 md:py-24" style={{ perspective: '1000px' }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-[160px] md:gap-[200px]">
          {/* top row */}
          <div className="flex flex-wrap justify-center gap-x-20 gap-y-10" style={{ transformStyle: 'preserve-3d' }}>
            {top.map((m, idx) => (
              <div key={m.id} ref={refs.get(m.id)} data-id={m.id}>
                <MemberCard person={m} row="top" index={idx} visible={visible} scrollY={scrollY} prefersReduced={prefersReduced} isMobile={isMobile} exitedMap={exitedMap} />
              </div>
            ))}
          </div>
          {/* bottom row */}
          <div className="flex flex-wrap justify-center gap-x-20 gap-y-10" style={{ transformStyle: 'preserve-3d' }}>
            {bottom.map((m, idx) => (
              <div key={m.id} ref={refs.get(m.id)} data-id={m.id} style={{ transitionDelay: `${idx * 100}ms` }}>
                <MemberCard person={m} row="bottom" index={idx} visible={visible} scrollY={scrollY} prefersReduced={prefersReduced} isMobile={isMobile} exitedMap={exitedMap} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
