import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function PredictionPanel({ tournament, onClose, onSubmitted }) {
  const [direction, setDirection] = useState('up')
  const [amount, setAmount] = useState(10)
  const [name, setName] = useState('Player')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitPrediction = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}/api/predictions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tournament_id: tournament.id,
          user: name,
          direction,
          amount: Number(amount)
        })
      })
      if (!res.ok) throw new Error('Failed to submit prediction')
      await res.json()
      onSubmitted?.()
      onClose?.()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 text-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Enter: {tournament.title}</h3>
          <button onClick={onClose} className="text-cyan-200 hover:text-white">✕</button>
        </div>
        <p className="mt-1 text-cyan-200/80 text-sm">{tournament.asset} • Entry {tournament.entry_fee} • Prize {tournament.prize_pool}</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-cyan-200/80">Display Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" />
          </div>
          <div>
            <label className="text-sm text-cyan-200/80">Direction</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button onClick={()=>setDirection('up')} className={`py-2 rounded-xl border ${direction==='up' ? 'bg-emerald-600/70 border-white/20' : 'bg-white/5 border-white/10'}`}>Up</button>
              <button onClick={()=>setDirection('down')} className={`py-2 rounded-xl border ${direction==='down' ? 'bg-rose-600/70 border-white/20' : 'bg-white/5 border-white/10'}`}>Down</button>
            </div>
          </div>
          <div>
            <label className="text-sm text-cyan-200/80">Stake (chips)</label>
            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" />
          </div>
          {error && <p className="text-rose-300 text-sm">{error}</p>}
          <button disabled={loading} onClick={submitPrediction} className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 font-semibold">
            {loading ? 'Submitting...' : 'Place Prediction'}
          </button>
        </div>
      </div>
    </div>
  )
}
