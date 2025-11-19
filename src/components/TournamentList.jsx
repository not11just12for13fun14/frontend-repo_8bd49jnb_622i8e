import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function TournamentList({ onJoin }) {
  const [loading, setLoading] = useState(true)
  const [tournaments, setTournaments] = useState([])
  const [error, setError] = useState(null)

  const fetchTournaments = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}/api/tournaments`)
      if (!res.ok) throw new Error('Failed to fetch tournaments')
      const data = await res.json()
      setTournaments(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTournaments()
  }, [])

  return (
    <section id="tournaments" className="relative py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Live & Upcoming</h2>
          <button onClick={fetchTournaments} className="text-cyan-200 hover:text-white">Refresh</button>
        </div>

        {loading && <p className="text-cyan-100/80">Loading tournaments...</p>}
        {error && <p className="text-rose-300">{error}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map(t => (
            <div key={t.id} className="group rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 hover:shadow-[0_0_50px_rgba(0,212,255,0.25)] transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-cyan-200/70 uppercase tracking-widest">{t.asset}</p>
                  <h3 className="mt-1 text-white font-semibold text-lg">{t.title}</h3>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-white/10 text-fuchsia-200 border border-white/10">{t.status}</span>
              </div>
              <div className="mt-4 text-cyan-100/80 text-sm space-y-1">
                <p>Entry: {t.entry_fee} chips</p>
                <p>Prize Pool: {t.prize_pool} chips</p>
              </div>
              <button
                onClick={() => onJoin(t)}
                className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-semibold border border-white/10"
              >
                Enter
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
