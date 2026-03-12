import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sun, Moon, Menu, X, Globe } from 'lucide-react'

const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'ar', flag: '🇲🇦', label: 'AR' },
]

export default function Navbar({ theme, toggleTheme }) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/skills', label: t('nav.skills') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const changeLang = (code) => {
    i18n.changeLanguage(code)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    setLangOpen(false)
  }

  const currentLang = LANGS.find(l => l.code === i18n.language) || LANGS[0]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#020408]/90 backdrop-blur-xl border-b border-[#00f5ff]/20 shadow-[0_0_30px_rgba(0,245,255,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 rounded-lg bg-[#020408] border border-[#00f5ff]/50 flex items-center justify-center relative overflow-hidden"
              style={{ boxShadow: '0 0 10px rgba(0,245,255,0.3)' }}
            >
              <span className="font-display font-bold text-lg text-[#00f5ff]">Z</span>
              <div className="absolute inset-0 bg-[#00f5ff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <span className="font-display font-bold text-lg hidden sm:block">
              <span className="text-[#00f5ff]">Zak</span>
              <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>ariya</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 text-sm font-body font-medium group"
                >
                  <span className={`relative z-10 transition-colors duration-200 ${
                    active ? 'text-[#00f5ff]' : theme === 'dark' ? 'text-slate-400 group-hover:text-[#00f5ff]' : 'text-slate-600 group-hover:text-[#00f5ff]'
                  }`}>
                    {item.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-md bg-[#00f5ff]/10 border border-[#00f5ff]/30"
                      style={{ boxShadow: '0 0 10px rgba(0,245,255,0.1)' }}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00f5ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Language selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border transition-all ${
                  theme === 'dark'
                    ? 'border-[#00f5ff]/30 text-slate-300 hover:border-[#00f5ff]/60 bg-[#00f5ff]/5'
                    : 'border-slate-300 text-slate-600 hover:border-[#00f5ff]/60'
                }`}
              >
                <Globe size={14} />
                <span>{currentLang.flag}</span>
                <span className="font-mono text-xs">{currentLang.label}</span>
              </motion.button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className={`absolute top-full mt-2 right-0 rounded-lg border overflow-hidden z-50 min-w-[120px] ${
                      theme === 'dark'
                        ? 'bg-[#050d14] border-[#00f5ff]/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]'
                        : 'bg-white border-slate-200 shadow-lg'
                    }`}
                  >
                    {LANGS.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => changeLang(lang.code)}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                          i18n.language === lang.code
                            ? 'text-[#00f5ff] bg-[#00f5ff]/10'
                            : theme === 'dark'
                              ? 'text-slate-300 hover:bg-[#00f5ff]/5 hover:text-[#00f5ff]'
                              : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="font-body">{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-md border transition-all ${
                theme === 'dark'
                  ? 'border-[#00f5ff]/30 text-[#00f5ff] bg-[#00f5ff]/5 hover:bg-[#00f5ff]/15'
                  : 'border-slate-300 text-amber-500 hover:border-amber-400'
              }`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-md border transition-all ${
                theme === 'dark'
                  ? 'border-[#00f5ff]/30 text-[#00f5ff]'
                  : 'border-slate-300 text-slate-600'
              }`}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t overflow-hidden ${
              theme === 'dark'
                ? 'border-[#00f5ff]/20 bg-[#020408]/95 backdrop-blur-xl'
                : 'border-slate-200 bg-white/95 backdrop-blur-xl'
            }`}
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg transition-colors font-body text-sm ${
                      location.pathname === item.path
                        ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/30'
                        : theme === 'dark'
                          ? 'text-slate-400 hover:text-[#00f5ff] hover:bg-[#00f5ff]/5'
                          : 'text-slate-600 hover:text-[#00f5ff] hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
