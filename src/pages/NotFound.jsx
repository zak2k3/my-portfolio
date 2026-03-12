import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

function TypedLine({ text, delay, color }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, ++i))
        } else {
          clearInterval(interval)
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <p style={{ color }} className="mb-1 min-h-[1.2em] font-mono text-xs">
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse inline-block w-2 h-3 ml-0.5 align-middle" style={{background: color}} />
      )}
    </p>
  )
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-8 relative inline-block"
        >
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px #00f5ff, 0 0 40px #00f5ff',
                '2px 0 0 #ff0080, -2px 0 0 #00f5ff',
                '0 0 20px #00f5ff, 0 0 40px #00f5ff',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="font-display font-black text-[8rem] sm:text-[12rem] leading-none text-[#00f5ff] select-none"
          >
            404
          </motion.h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <div className="inline-block px-4 py-2 rounded-lg border border-[#ff0080]/30 bg-[#ff0080]/5 mb-4">
            <p className="font-mono text-[#ff0080] text-sm">ERROR_CODE: PAGE_NOT_FOUND</p>
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">Lost in the Matrix</h2>
          <p className="font-body text-slate-400 text-sm max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved to another dimension.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto max-w-sm mb-8 rounded-xl overflow-hidden border border-[#00f5ff]/20"
          style={{ background: 'rgba(5,13,20,0.9)' }}
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#00f5ff]/10">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="font-mono text-xs text-slate-500 ml-2">terminal</span>
          </div>
          <div className="p-4 text-left">
            <TypedLine text="$ navigate to /lost-page" delay={0.6} color="#94a3b8" />
            <TypedLine text="Error: 404 - Page not found" delay={1.2} color="#ff0080" />
            <TypedLine text="$ suggest --alternatives" delay={1.8} color="#94a3b8" />
            <TypedLine text="→ Try going home or going back" delay={2.4} color="#00f5ff" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-body font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', color: '#020408', boxShadow: '0 0 20px rgba(0,245,255,0.4)' }}
            >
              <Home size={16} /> Go Home
            </motion.button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-body font-semibold text-sm border border-[#00f5ff]/30 text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-all"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </motion.div>

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: `${10 + i * 14}%`,
              top: `${15 + (i % 3) * 25}%`,
              width: 4 + i,
              height: 4 + i,
              borderRadius: '50%',
              background: ['#00f5ff','#bf00ff','#ff0080','#00ff9f','#00f5ff','#bf00ff'][i],
              boxShadow: `0 0 10px ${['#00f5ff','#bf00ff','#ff0080','#00ff9f','#00f5ff','#bf00ff'][i]}`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
    </div>
  )
}
