import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Github, ExternalLink, Code2, Star, Zap } from 'lucide-react'
import { PROJECTS } from '../utils/data'
import { useAnalytics } from '../hooks'
import { SectionTitle } from '../components/ui/index.jsx'
import { BarChart, Cpu, Utensils } from 'lucide-react'

const techColors = {
  Laravel: '#ff2d20',
  React: '#61dafb',
  MySQL: '#4479a1',
  Docker: '#2496ed',
  PHP: '#777bb4',
  HTML: '#e34f26',
  CSS: '#1572b6',
  JavaScript: '#f7df1e',
  'HuggingFace API': '#ff9a00',
  MongoDB: '#47a248',
}

function TechBadge({ tech }) {
  const color = techColors[tech] || '#00f5ff'
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium border transition-all cursor-default"
      style={{
        borderColor: `${color}40`,
        background: `${color}10`,
        color: color,
        boxShadow: `0 0 6px ${color}20`,
      }}
    >
      {tech}
    </motion.div>
  )
}

function ProjectCard({ project, index }) {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(10,22,40,0.8)',
        border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.05)'}`,
        boxShadow: hovered ? `0 20px 60px ${project.color}15, 0 0 0 1px ${project.color}20` : 'none',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${project.color}, ${project.color}80)`,
          boxShadow: `0 0 10px ${project.color}`,
          opacity: hovered ? 1 : 0.5,
        }}
      />

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}08 0%, transparent 60%)`,
        }}
      />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <motion.div
              animate={hovered ? {scale: 1.075 } : {scale: 1}}
              className="text-4xl"
            >
              {project.icon}
            </motion.div>
            <div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-white transition-colors">
                {project.title}
              </h3>
              {project.featured && (
                <div className="flex items-center gap-1 mt-1">
                  <Star size={10} style={{ color: project.color, fill: project.color }} />
                  <span className="font-mono text-xs" style={{ color: project.color }}>Featured</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                onClick={e => e.stopPropagation()}
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"
              >
                <Github size={16} />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                onClick={e => e.stopPropagation()}
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm font-body leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-5">
          <p className="font-mono text-xs text-slate-500 mb-2 uppercase tracking-wider">Features</p>
          <div className="grid grid-cols-2 gap-1.5">
            {project.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs text-slate-400 font-body">
                <Zap size={10} style={{ color: project.color }} />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <p className="font-mono text-xs text-slate-500 mb-2 uppercase tracking-wider">
            {t('projects.technologies')}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map(tech => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-body text-sm font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: `${project.color}30`, color: project.color }}
            >
              <Code2 size={14} />
              {t('projects.viewCode')}
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-body text-sm font-medium transition-all"
              style={{
                background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                border: `1px solid ${project.color}40`,
                color: project.color,
              }}
            >
              <ExternalLink size={14} />
              {t('projects.liveDemo')}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent('page_view', { page: 'projects' })
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} />

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 font-body mb-4">Want to see more of my work?</p>
          <motion.a
            href="https://github.com/zak2k3"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-body font-semibold text-sm border border-[#00f5ff]/40 text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-all"
          >
            <Github size={18} />
            View GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
