# 🚀 Zakariya Baaziz — Portfolio

A futuristic, highly animated developer portfolio built with React + Vite.

## ✨ Features
- 🌌 Three.js animated 3D hero scene with floating geometric objects
- ⚡ Framer Motion page transitions & micro-interactions
- 🎨 Neon cyberpunk aesthetic with dark/light mode toggle
- 🌐 Multi-language: English, French, Arabic (RTL support)
- 📊 Animated skill progress bars + 3D badge grid
- 📝 Blog with syntax-highlighted code blocks + typing animation
- 📬 Contact form with validation + success sound
- 🖱️ Custom animated cursor (desktop)
- 🔢 Scroll progress indicator
- 🎯 Particle background with connected dots
- 📱 Fully responsive (desktop-first)
- ⬆️ Back-to-top button
- 🔍 404 animated page with glitch effects
- 📈 Basic localStorage analytics

## 🛠️ Tech Stack
- **React 18** + **Vite 5**
- **TailwindCSS 3** 
- **Framer Motion 11**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **GSAP 3**
- **react-i18next** (EN/FR/AR)
- **react-syntax-highlighter**
- **Lucide React** icons

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── ui/           # ScrollProgress, BackToTop, PageLoader, Particles, ScanLine
│   └── three/        # HeroScene (Three.js)
├── pages/            # Home, About, Projects, Skills, Blog, BlogPost, Contact, 404
├── hooks/            # useCustomCursor, useScrollProgress, useTheme, useTypingAnimation, useAnalytics
├── i18n/             # i18next config (EN/FR/AR)
├── styles/           # globals.css (Tailwind + custom animations)
└── utils/
    └── data.js       # Personal info, projects, skills, blog posts
```

## ⚙️ Customization

Edit `src/utils/data.js` to update:
- Personal information
- Projects
- Skills & percentages
- Blog posts (markdown supported)

## 🌐 Deployment

Works on Vercel, Netlify, GitHub Pages. Just run `npm run build` and deploy the `dist/` folder.

---
Built with ❤️ by Zakariya Baaziz | Tangier, Morocco
