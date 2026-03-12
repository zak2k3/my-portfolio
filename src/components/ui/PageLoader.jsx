import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100000] bg-[#020408] flex flex-col items-center justify-center gap-6"
    >
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
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
          >
            <div style={{
              transform: `translateX(${45 + i * 10}px)`,
              width: 6 - i,
              height: 6 - i,
              borderRadius: '50%',
              background: ['#00f5ff', '#bf00ff', '#ff0080'][i],
              boxShadow: `0 0 8px ${['#00f5ff', '#bf00ff', '#ff0080'][i]}`,
            }} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="font-display text-sm tracking-[0.4em] text-[#00f5ff] uppercase mb-3">Loading</p>
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
