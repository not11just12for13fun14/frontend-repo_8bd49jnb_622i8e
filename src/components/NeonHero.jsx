import { motion, useMotionValue, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function NeonHero({ onCTAClick }) {
  // 3D tilt for central card
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-200, 200], [12, -12])
  const rotateY = useTransform(x, [-200, 200], [-12, 12])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const posX = e.clientX - rect.left - rect.width / 2
    const posY = e.clientY - rect.top - rect.height / 2
    x.set(posX)
    y.set(posY)
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Casino neon gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(255,0,122,0.35),rgba(0,212,255,0.25)_40%,transparent_70%)]" />
      <div className="absolute -inset-[20%] blur-3xl opacity-40" style={{
        background:
          'conic-gradient(from 220deg at 50% 50%, #00D2FF44, #7A00FF44, #FF008C44, #00D2FF44)'
      }} />

      {/* Spline 3D accent (subtle, behind content) */}
      <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen">
        <Spline scene="https://prod.spline.design/0P5mXiQzkUS0m5sP/scene.splinecode" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-6xl w-full px-6">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0) }}
          style={{ perspective: 1200 }}
          className="mx-auto"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_0_80px_rgba(255,0,128,0.25)]"
          >
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-fuchsia-200/80 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Crypto Tournaments
              </span>
              <h1 className="mt-6 text-5xl sm:text-6xl font-black bg-gradient-to-br from-fuchsia-300 via-emerald-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_10px_40px_rgba(255,0,128,0.25)]">
                Predict The Next Move. Win The Pot.
              </h1>
              <p className="mt-5 text-lg text-cyan-100/80 max-w-2xl">
                Join time-boxed, on-chain inspired tournaments. Pick Up or Down on your favorite coins. Climb the leaderboard and cash the prize pool.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onCTAClick}
                  className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 shadow-[0_10px_30px_rgba(255,0,128,0.45)] border border-white/10"
                >
                  Enter a Tournament
                </button>
                <a
                  href="#tournaments"
                  className="inline-flex px-6 py-3 rounded-xl font-semibold text-cyan-100/90 bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  Browse Tournaments
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Glow bars */}
      <div className="pointer-events-none absolute top-10 left-10 w-40 h-40 bg-fuchsia-500/30 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-40 h-40 bg-cyan-500/30 blur-3xl rounded-full" />
    </section>
  )
}
