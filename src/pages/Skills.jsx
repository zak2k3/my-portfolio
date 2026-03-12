import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SKILLS } from '../utils/data'
import { useAnalytics } from '../hooks'
import { SectionTitle } from '../components/ui/index.jsx'

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools']

const categoryColors = {
  Frontend: '#00f5ff',
  Backend: '#ff2d20',
  Database: '#4479a1',
  DevOps: '#2496ed',
  Tools: '#bf00ff',
}

function SkillBadge({ skill, index }) {
  const [hovered, setHovered] = useState(false)
  const color = skill.color

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 150 }}
      whileHover={{
        scale: 1.1,
        y: -8,
        rotateZ: [-2, 2, -2, 0],
        transition: { rotateZ: { duration: 0.3 } }
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center gap-3 p-5 rounded-2xl border cursor-pointer group"
      style={{
        background: hovered ? `${color}10` : 'rgba(10,22,40,0.6)',
        borderColor: hovered ? `${color}60` : `${color}20`,
        boxShadow: hovered ? `0 0 20px ${color}20, 0 10px 40px rgba(0,0,0,0.3)` : 'none',
        backdropFilter: 'blur(10px)',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* 3D icon glow */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-black text-lg transition-all duration-300"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}30`,
          color: color,
          boxShadow: hovered ? `0 0 15px ${color}40, 0 0 30px ${color}20` : `0 0 5px ${color}20`,
          textShadow: `0 0 10px ${color}`,
          transform: hovered ? 'perspective(200px) translateZ(10px)' : 'perspective(200px) translateZ(0)',
        }}
      >
        {skill.name.slice(0, 2)}
      </div>

      {/* Name */}
      <span className="font-display font-semibold text-sm text-center transition-colors"
        style={{ color: hovered ? color : '#e2e8f0' }}
      >
        {skill.name}
      </span>

      {/* Circular progress */}
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <motion.circle
            cx="32" cy="32" r="28"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 28}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
            whileInView={{
              strokeDashoffset: 2 * Math.PI * 28 * (1 - skill.percent / 100)
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono font-bold text-xs" style={{ color }}>
            {skill.percent}%
          </span>
        </div>
      </div>

      {/* Category tag */}
      <div
        className="px-2 py-0.5 rounded-full text-xs font-mono"
        style={{
          background: `${categoryColors[skill.category] || '#00f5ff'}15`,
          color: categoryColors[skill.category] || '#00f5ff',
          border: `1px solid ${categoryColors[skill.category] || '#00f5ff'}30`,
        }}
      >
        {skill.category}
      </div>
    </motion.div>
  )
}

function ProgressBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}` }}
          />
          <span className="font-body font-medium text-sm text-slate-300 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="font-mono text-xs" style={{ color: skill.color }}>{skill.percent}%</span>
      </div>

      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.05 + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            boxShadow: `0 0 8px ${skill.color}40`,
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useTranslation()
  const { trackEvent } = useAnalytics()
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    trackEvent('page_view', { page: 'skills' })
  }, [])

  const filtered = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('skills.title')} subtitle={t('skills.subtitle')} />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full font-mono text-xs font-medium border transition-all"
              style={{
                borderColor: activeCategory === cat ? '#00f5ff' : 'rgba(255,255,255,0.1)',
                background: activeCategory === cat ? 'rgba(0,245,255,0.1)' : 'transparent',
                color: activeCategory === cat ? '#00f5ff' : '#64748b',
                boxShadow: activeCategory === cat ? '0 0 10px rgba(0,245,255,0.2)' : 'none',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* 3D Badge Grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2"
            >
              <span className="text-[#00f5ff]">&lt;</span>
              Skill Badges
              <span className="text-[#00f5ff]">/&gt;</span>
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filtered.map((skill, i) => (
                <SkillBadge key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Progress bars */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2"
            >
              <span className="text-[#bf00ff]">&lt;</span>
              Proficiency
              <span className="text-[#bf00ff]">/&gt;</span>
            </motion.h3>

            <div
              className="p-6 rounded-2xl border border-[#00f5ff]/10 space-y-5"
              style={{ background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(10px)' }}
            >
              {filtered.map((skill, i) => (
                <ProgressBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: `${SKILLS.length}+`, label: 'Technologies', color: '#00f5ff' },
            { value: `${SKILLS.filter(s => s.percent >= 80).length}`, label: 'Expert Level', color: '#00ff9f' },
            { value: `${Math.round(SKILLS.reduce((a, s) => a + s.percent, 0) / SKILLS.length)}%`, label: 'Avg. Proficiency', color: '#bf00ff' },
            { value: `${categories.length - 1}`, label: 'Categories', color: '#ff0080' },
          ].map(stat => (
            <div
              key={stat.label}
              className="p-5 rounded-xl text-center border border-white/5"
              style={{ background: 'rgba(10,22,40,0.6)' }}
            >
              <p className="font-display font-black text-3xl mb-1" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}40` }}>
                {stat.value}
              </p>
              <p className="font-mono text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
