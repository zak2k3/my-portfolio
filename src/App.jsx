import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCustomCursor, useScrollProgress, useTheme, useAnalytics } from './hooks'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import BackToTop from './components/ui/BackToTop'
import PageLoader from './components/ui/PageLoader'
import ScanLine from './components/ui/ScanLine'
import ParticleBackground from './components/ui/ParticleBackground'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 1.02 },
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function AppContent() {
  const { cursorRef, followerRef, isHovering } = useCustomCursor()
  const scrollProgress = useScrollProgress()
  const { theme, toggleTheme } = useTheme()
  const { trackEvent } = useAnalytics()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative min-h-screen ${theme === 'dark' ? 'bg-[#020408]' : 'bg-slate-50'}`}>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor hidden md:block ${isHovering ? 'hovering' : ''}`}
      />
      <div
        ref={followerRef}
        className={`custom-cursor-follower hidden md:block ${isHovering ? 'hovering' : ''}`}
      />

      {/* Scan line effect */}
      <ScanLine />

      {/* Particle background */}
      <ParticleBackground theme={theme} />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Scroll progress */}
      <ScrollProgress progress={scrollProgress} />

      {/* Page loader */}
      <AnimatePresence>
        {loading && <PageLoader />}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main className="relative z-10">
            <AnimatedRoutes />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
