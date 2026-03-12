import { useState, useEffect, useCallback, useRef } from 'react'

// Custom cursor hook
export const useCustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1
      follower.style.left = followerX + 'px'
      follower.style.top = followerY + 'px'
      requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', onMouseMove)
    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return { cursorRef, followerRef, isHovering }
}

// Scroll progress hook
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return progress
}

// Theme hook
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, toggleTheme }
}

// Intersection observer hook
export const useInView = (options = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once) observer.disconnect()
        } else if (!options.once) {
          setInView(false)
        }
      },
      { threshold: options.threshold || 0.1, ...options }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

// Analytics hook
export const useAnalytics = () => {
  const trackEvent = useCallback((event, data = {}) => {
    // Basic analytics tracking
    const analytics = JSON.parse(localStorage.getItem('portfolio_analytics') || '{"events":[],"pageViews":{}}')
    analytics.events.push({ event, data, timestamp: Date.now() })
    // Track page views
    if (event === 'page_view') {
      analytics.pageViews[data.page] = (analytics.pageViews[data.page] || 0) + 1
    }
    localStorage.setItem('portfolio_analytics', JSON.stringify(analytics))
  }, [])

  useEffect(() => {
    trackEvent('page_view', { page: window.location.pathname, referrer: document.referrer })
  }, [])

  return { trackEvent }
}

// Typing animation hook
export const useTypingAnimation = (texts, speed = 100, deleteSpeed = 50, pause = 2000) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!texts || texts.length === 0) return

    const current = texts[currentIndex]
    let timeout

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setCurrentIndex(prev => (prev + 1) % texts.length)
    } else {
      const delta = isDeleting ? deleteSpeed : speed
      timeout = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        )
      }, delta)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, texts, speed, deleteSpeed, pause])

  return displayText
}
