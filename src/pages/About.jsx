import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MapPin, Mail, Phone, Download, Code, Globe, Star } from 'lucide-react'
import { PERSONAL_INFO } from '../utils/data'
import { useAnalytics } from '../hooks'
import { SectionTitle } from '../components/ui/index.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function About() {
  const { t } = useTranslation()
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent('page_view', { page: 'about' })
  }, [])

  const infoItems = [
    { icon: MapPin, label: 'Location', value: PERSONAL_INFO.location, color: '#00f5ff' },
    { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, color: '#bf00ff', link: `mailto:${PERSONAL_INFO.email}` },
    { icon: Phone, label: 'Phone', value: PERSONAL_INFO.phone, color: '#00ff9f', link: `tel:${PERSONAL_INFO.phone}` },
  ]

  const timelineItems = [
    {
      year: '2024 - Present',
      title: 'Final Year Student',
      org: 'Computer Science',
      desc: 'Finishing my degree while building production-ready web applications.',
      color: '#00f5ff',
    },
    {
      year: '2023',
      title: 'Full Stack Developer',
      org: 'Freelance',
      desc: 'Building web applications for clients on Fiverr and independent projects.',
      color: '#bf00ff',
    },
    {
      year: '2022',
      title: 'Started Web Development',
      org: 'Self-taught',
      desc: 'Began learning HTML, CSS, JavaScript, and gradually moved into React and Laravel.',
      color: '#ff0080',
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('about.title')} subtitle={t('about.subtitle')} centered={false} />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio & Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Avatar */}
            <div className="flex items-start gap-8 mb-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative flex-shrink-0"
              >
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl font-display font-black border-2 border-[#00f5ff]/40"
                  style={{
                    background: 'linear-gradient(135deg, #020408, #0a1628)',
                    boxShadow: '0 0 30px rgba(0,245,255,0.2), inset 0 0 15px rgba(0,245,255,0.05)',
                    color: '#00f5ff',
                    textShadow: '0 0 20px rgba(0,245,255,0.8)',
                  }}
                >
                  Z
                </div>
                {/* Online indicator */}
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00ff9f] border-2 border-[#020408]"
                  style={{ boxShadow: '0 0 8px #00ff9f' }}
                />
              </motion.div>

              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-1">Zakariya Baaziz</h3>
                <p className="font-mono text-[#00f5ff] text-sm mb-3">Full Stack Web Developer</p>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <MapPin size={14} className="text-[#00f5ff]" />
                  <span className="font-mono">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div
              className="p-6 rounded-xl border border-[#00f5ff]/20 mb-8 relative overflow-hidden"
              style={{ background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(10px)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />
              <p className="text-slate-300 font-body leading-relaxed text-sm">{PERSONAL_INFO.bio}</p>
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              {infoItems.map(({ icon: Icon, label, value, color, link }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-white/2 hover:border-[#00f5ff]/20 transition-all"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-500 mb-0.5">{label}</p>
                    {link ? (
                      <a href={link} className="font-body text-sm text-slate-300 hover:text-[#00f5ff] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-slate-300">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download CV */}
            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold text-sm border border-[#00f5ff]/40 text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-all"
              style={{ boxShadow: '0 0 10px rgba(0,245,255,0.1)' }}
            >
              <Download size={16} />
              {t('about.downloadCV')}
            </motion.a>
          </motion.div>

          {/* Right: Timeline & Languages */}
          <div className="space-y-10">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2">
                <Code size={18} className="text-[#00f5ff]" />
                Journey
              </h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f5ff]/50 via-[#bf00ff]/50 to-transparent" />

                <div className="space-y-6">
                  {timelineItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6 pl-12 relative"
                    >
                      {/* Dot */}
                      <div
                        className="absolute left-4 top-1 w-2.5 h-2.5 rounded-full -translate-x-1/2"
                        style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                      />

                      <div
                        className="flex-1 p-4 rounded-xl border border-white/5 hover:border-[#00f5ff]/20 transition-all"
                        style={{ background: 'rgba(10,22,40,0.5)' }}
                      >
                        <p className="font-mono text-xs mb-1" style={{ color: item.color }}>{item.year}</p>
                        <h4 className="font-display font-bold text-sm text-white mb-0.5">{item.title}</h4>
                        <p className="font-body text-xs text-slate-400 mb-2">{item.org}</p>
                        <p className="font-body text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2">
                <Globe size={18} className="text-[#bf00ff]" />
                {t('about.languages')}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {PERSONAL_INFO.languages.map((lang) => (
                  <motion.div
                    key={lang.lang}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="p-4 rounded-xl border border-[#00f5ff]/15 text-center relative overflow-hidden"
                    style={{ background: 'rgba(10,22,40,0.6)' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/3 to-[#bf00ff]/3" />
                    <div className="text-3xl mb-2">{lang.flag}</div>
                    <p className="font-display font-bold text-xs text-white mb-1">{lang.lang}</p>
                    <p className="font-mono text-xs text-[#00f5ff]">{lang.level}</p>
                    {/* Mini progress */}
                    <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#00f5ff] to-[#bf00ff]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <Star size={18} className="text-[#ff0080]" />
                Find Me Online
              </h3>
              <div className="flex gap-3">
                {[
                  { name: 'GitHub', url: PERSONAL_INFO.social.github, color: '#fff', bg: '#333' },
                  { name: 'LinkedIn', url: PERSONAL_INFO.social.linkedin, color: '#0077b5', bg: '#0077b510' },
                  { name: 'Fiverr', url: PERSONAL_INFO.social.fiverr, color: '#1dbf73', bg: '#1dbf7310' },
                ].map(link => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-center font-body font-medium text-sm transition-all hover:border-[#00f5ff]/30"
                    style={{ background: link.bg, color: link.color }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
