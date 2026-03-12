import { Suspense, lazy, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, Download, Github, Linkedin, ExternalLink, ChevronDown } from 'lucide-react'
import { useTypingAnimation, useAnalytics } from '../hooks'
import { PERSONAL_INFO } from '../utils/data'

const HeroScene = lazy(() => import('../components/three/HeroScene'))

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Home() {
  const { t } = useTranslation()
  const { trackEvent } = useAnalytics()
  const typedText = useTypingAnimation(t('hero.roles', { returnObjects: true }), 80, 40, 2500)

  useEffect(() => {
    trackEvent('page_view', { page: 'home' })
  }, [])

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.social.github, label: 'GitHub' },
    { icon: Linkedin, href: PERSONAL_INFO.social.linkedin, label: 'LinkedIn' },
    { icon: ExternalLink, href: PERSONAL_INFO.social.fiverr, label: 'Fiverr' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-40" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(0,245,255,0.08) 0%, transparent 60%)' }}
      />

      {/* Three.js scene */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Hero content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            {/* Status badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#00ff9f] animate-pulse"
                  style={{ boxShadow: '0 0 8px #00ff9f' }} />
                <span className="font-mono text-xs text-[#00ff9f] tracking-wider">
                  {t('hero.available')}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm font-mono">
                <MapPin size={12} className="text-[#00f5ff]" />
                <span>{t('hero.location')}</span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={fadeUp}
              className="font-mono text-[#00f5ff] text-lg mb-2 tracking-wider"
            >
              {t('hero.greeting')}
            </motion.p>

            {/* Name with glitch effect */}
            <motion.div variants={fadeUp}>
              <h1
                className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-[1.1] relative"
              >
                <span className="text-white">
                  Zakariya
                </span>
                <br />
                <span
                  className="text-[#00f5ff]"
                  style={{
                    textShadow: '0 0 30px rgba(0,245,255,0.5), 0 0 60px rgba(0,245,255,0.2)',
                  }}
                >
                  Baaziz
                </span>
              </h1>
            </motion.div>

            {/* Animated role */}
            <motion.div variants={fadeUp} className="mb-6 h-10 flex items-center">
              <span className="font-body text-xl sm:text-2xl text-slate-300">
                {'< '}
                <span className="text-[#bf00ff] font-semibold">{typedText}</span>
                <span className="text-[#00f5ff] animate-[blink_1s_infinite]">|</span>
                {' />'}
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="text-slate-400 text-base sm:text-lg font-body leading-relaxed max-w-xl mb-10"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glow-btn group flex items-center gap-2 px-8 py-3.5 rounded-lg font-body font-semibold text-sm relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                    boxShadow: '0 0 20px rgba(0,245,255,0.4)',
                  }}
                >
                  <span className="text-[#020408]">{t('hero.cta')}</span>
                  <ArrowRight size={16} className="text-[#020408] group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-[#0a1628]/80 border border-[#00f5ff]/20 flex items-center justify-center text-slate-400 hover:text-[#00f5ff] hover:border-[#00f5ff]/50 transition-all backdrop-blur-sm"
                  title={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}

              <div className="w-px h-8 bg-[#00f5ff]/20 mx-2" />

              <span className="font-mono text-xs text-slate-500">
                zak2k3@github
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-xs text-slate-500 tracking-wider">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#00f5ff]"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="hidden lg:flex items-center justify-end gap-8">
            {[
              { value: '3+', label: 'Projects' },
              { value: '2+', label: 'Years Coding' },
              { value: '10+', label: 'Technologies' },
            ].map(({ value, label }) => (
              <div key={label} className="text-right">
                <p className="font-display font-bold text-xl text-[#00f5ff]">{value}</p>
                <p className="font-mono text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
