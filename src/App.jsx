import { useState } from 'react'
import NeonHero from './components/NeonHero'
import TournamentList from './components/TournamentList'
import PredictionPanel from './components/PredictionPanel'

function App() {
  const [selectedTournament, setSelectedTournament] = useState(null)

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <header className="relative z-20 flex items-center justify-between max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 shadow-[0_0_25px_rgba(255,0,128,0.6)]" />
          <span className="text-lg font-bold tracking-tight">Orbital Odds</span>
        </div>
        <nav className="flex items-center gap-4 text-cyan-100/90">
          <a href="#tournaments" className="hover:text-white">Tournaments</a>
          <a href="/test" className="hover:text-white">System Check</a>
        </nav>
      </header>

      <NeonHero onCTAClick={() => {
        const el = document.getElementById('tournaments')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }} />

      <TournamentList onJoin={(t) => setSelectedTournament(t)} />

      <footer className="relative z-20 py-10 text-center text-xs text-cyan-200/60">
        Built for immersive predictions • Casino neon aesthetic • Demo only
      </footer>

      {selectedTournament && (
        <PredictionPanel
          tournament={selectedTournament}
          onClose={() => setSelectedTournament(null)}
          onSubmitted={() => {}}
        />
      )}
    </div>
  )
}

export default App
