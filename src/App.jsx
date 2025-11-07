import React from 'react'
import MentorCard from './components/MentorCard'
import TeamShowcase from './components/TeamShowcase'
import FlameGlow from './components/FlameGlow'
import ScrollHint from './components/ScrollHint'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white antialiased">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-[40vh] bg-gradient-to-br from-blue-400 via-cyan-300 to-sky-500 opacity-20" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pt-20 md:pt-28">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-500">
            The Last neuron — Team
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            A cinematic scroll reveal through the people who build and mentor the mission.
          </p>
          <ScrollHint />
        </div>
        <FlameGlow />
      </header>

      {/* Mentor */}
      <div className="mt-10 px-6">
        <MentorCard />
      </div>

      {/* Team */}
      <main className="px-6">
        <TeamShowcase />
      </main>

      {/* Footer */}
      <footer className="mt-24 py-10 text-center text-sm text-slate-500">
        Crafted with a Flames.Blue gradient and motion-aware interactions.
      </footer>
    </div>
  )
}
