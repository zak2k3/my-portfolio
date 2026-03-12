import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Heart, Code, Github, Linkedin, ExternalLink } from 'lucide-react'
import { PERSONAL_INFO } from '../../utils/data'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.social.github, label: 'GitHub', color: '#fff' },
    { icon: Linkedin, href: PERSONAL_INFO.social.linkedin, label: 'LinkedIn', color: '#0077b5' },
    { icon: ExternalLink, href: PERSONAL_INFO.social.fiverr, label: 'Fiverr', color: '#1dbf73' },
  ]

  return (
    <footer className="relative z-10 border-t border-[#00f5ff]/10 bg-[#020408]/80 backdrop-blur-xl mt-20">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg bg-[#020408] border border-[#00f5ff]/50 flex items-center justify-center"
                style={{ boxShadow: '0 0 10px rgba(0,245,255,0.2)' }}
              >
                <span className="font-display font-bold text-lg text-[#00f5ff]">Z</span>
              </div>
              <span className="font-display font-bold text-white">
                Zakariya <span className="text-[#00f5ff]">Baaziz</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm font-body leading-relaxed">
              Full Stack Developer building tools that matter.
            </p>
            <p className="text-slate-500 text-xs font-mono mt-2">📍 Tangier, Morocco</p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display text-sm font-semibold text-[#00f5ff] mb-4 tracking-wider uppercase">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {['Home', 'About', 'Projects', 'Skills', 'Blog', 'Contact'].map(item => (
                <a
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-slate-400 hover:text-[#00f5ff] transition-colors text-sm font-body group flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-[#00f5ff]/40 group-hover:bg-[#00f5ff] transition-colors" />
                  {item}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-sm font-semibold text-[#00f5ff] mb-4 tracking-wider uppercase">
              Connect
            </h4>
            <div className="flex gap-4 mb-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-[#0a1628] border border-[#00f5ff]/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#00f5ff]/60 transition-all"
                  style={{ '--hover-color': color }}
                  title={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-400 hover:text-[#00f5ff] transition-colors text-sm font-mono break-all"
            >
              {PERSONAL_INFO.email}
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-[#00f5ff]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-slate-500 text-xs font-mono">
            © {year} Zakariya Baaziz. {t('footer.rights')}
          </p>
          <p className="text-slate-500 text-xs font-body flex items-center gap-2">
            {t('footer.madeWith')}
            <Heart size={12} className="text-[#ff0080] fill-current" />
            {t('footer.and')}
            <Code size={12} className="text-[#00f5ff]" />
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
