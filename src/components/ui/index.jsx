import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

// Scroll Progress Bar
export function ScrollProgress({ progress }) {
  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  )
}

// Back to Top Button
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-[#020408] border border-[#00f5ff]/50 text-[#00f5ff] transition-all"
          style={{
            boxShadow: '0 0 15px rgba(0,245,255,0.3), 0 0 30px rgba(0,245,255,0.1)',
          }}
        >
          <ChevronUp size={20} />
          {/* Animated ring */}
          <span className="absolute inset-0 rounded-full border border-[#00f5ff]/20 animate-ping" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Page Loader
export function PageLoader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-loader flex-col gap-6"
    >
      {/* Logo animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'backOut' }}
        className="relative"
      >
        <div
          className="w-20 h-20 rounded-2xl border-2 border-[#00f5ff]/50 flex items-center justify-center"
          style={{ boxShadow: '0 0 30px rgba(0,245,255,0.4), inset 0 0 15px rgba(0,245,255,0.1)' }}
        >
          <span className="font-display text-4xl font-black text-[#00f5ff]">Z</span>
        </div>
        {/* Orbiting dots */}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
          >
            <div
              style={{
                transform: `translateX(${45 + i * 10}px)`,
                width: 6 - i,
                height: 6 - i,
                borderRadius: '50%',
                background: ['#00f5ff', '#bf00ff', '#ff0080'][i],
                boxShadow: `0 0 8px ${['#00f5ff', '#bf00ff', '#ff0080'][i]}`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="font-display text-sm tracking-[0.4em] text-[#00f5ff] uppercase mb-3">
          Loading
        </p>
        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-[#00f5ff]/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 8px #00f5ff' }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

// Scan Line Effect
export function ScanLine() {
  return <div className="scan-line pointer-events-none" />
}

// Section Title component
export function SectionTitle({ title, subtitle, centered = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-mono text-xs text-[#00f5ff] tracking-[0.4em] uppercase mb-3"
      >
        // {subtitle}
      </motion.p>
      <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
        {title.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.03 }}
            className={char === ' ' ? 'inline' : ''}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className={`mt-4 h-px bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] ${centered ? 'mx-auto w-24' : 'w-24'}`}
        style={{ boxShadow: '0 0 10px #00f5ff' }}
      />
    </motion.div>
  )
}

export default { ScrollProgress, BackToTop, PageLoader, ScanLine, SectionTitle }
