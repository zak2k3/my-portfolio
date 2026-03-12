import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { PERSONAL_INFO } from '../utils/data'
import { useAnalytics } from '../hooks'
import { SectionTitle } from '../components/ui/index.jsx'

function FormField({ label, name, type = 'text', multiline, value, onChange, error, placeholder }) {
  const [focused, setFocused] = useState(false)
  const Component = multiline ? 'textarea' : 'input'

  return (
    <div className="relative">
      <label className={`block font-mono text-xs mb-2 transition-colors ${
        focused ? 'text-[#00f5ff]' : 'text-slate-500'
      }`}>
        {label}
        {error && <span className="text-[#ff0080] ml-2">* {error}</span>}
      </label>
      <Component
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        rows={multiline ? 5 : undefined}
        className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-all outline-none resize-none
          ${focused
            ? 'border-[#00f5ff]/60 bg-[#00f5ff]/5 text-white shadow-[0_0_15px_rgba(0,245,255,0.1)]'
            : 'border-white/10 bg-white/3 text-slate-300'
          }
          ${error ? 'border-[#ff0080]/50' : ''}
          border placeholder-slate-600`}
        style={{ background: focused ? 'rgba(0,245,255,0.05)' : 'rgba(10,22,40,0.6)' }}
      />
      {/* Focus indicator line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: focused ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const { trackEvent } = useAnalytics()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  useEffect(() => {
    trackEvent('page_view', { page: 'contact' })
  }, [])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.email.trim()) errs.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.message.trim()) errs.message = 'Required'
    return errs
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('sending')
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykdozvr";
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setStatus('success')
        trackEvent('contact_form_submit', { subject: form.subject })
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Form failed')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }

    // auto-reset success after 5s
    setTimeout(() => setStatus(null), 5000)
  }

  const contactItems = [
    {
      icon: MapPin,
      label: t('contact.location'),
      value: PERSONAL_INFO.location,
      color: '#00f5ff',
    },
    {
      icon: Mail,
      label: t('contact.emailLabel'),
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      color: '#bf00ff',
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone}`,
      color: '#00ff9f',
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400 font-body text-base leading-relaxed mb-10">
              Have a project in mind? Want to collaborate? Or just want to say hi?
              I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.
            </p>

            <div className="space-y-4 mb-10">
              {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-[#00f5ff]/20 transition-all"
                  style={{ background: 'rgba(10,22,40,0.6)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-500 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="font-body text-sm text-slate-200 hover:text-[#00f5ff] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-slate-200">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Availability indicator */}
            <div
              className="p-5 rounded-xl border border-[#00ff9f]/20"
              style={{ background: 'rgba(0,255,159,0.05)' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00ff9f] animate-pulse"
                  style={{ boxShadow: '0 0 8px #00ff9f' }} />
                <span className="font-display font-semibold text-sm text-[#00ff9f]">Available for Work</span>
              </div>
              <p className="font-body text-xs text-slate-400">
                Currently accepting freelance projects and full-time opportunities.
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="p-8 rounded-2xl border border-[#00f5ff]/15 relative overflow-hidden"
              style={{ background: 'rgba(10,22,40,0.8)', backdropFilter: 'blur(20px)' }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00f5ff]/40 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#bf00ff]/40 rounded-br-2xl" />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle size={64} className="text-[#00ff9f] mb-4" style={{ filter: 'drop-shadow(0 0 20px #00ff9f)' }} />
                    </motion.div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">Message Sent!</h3>
                    <p className="font-body text-slate-400 text-sm">{t('contact.success')}</p>
                    <p className="font-body text-slate-500 text-xs mt-2">I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        label={t('contact.name')}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="John Doe"
                      />
                      <FormField
                        label={t('contact.email')}
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="john@example.com"
                      />
                    </div>
                    <FormField
                      label={t('contact.subject')}
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      placeholder="Project collaboration..."
                    />
                    <FormField
                      label={t('contact.message')}
                      name="message"
                      multiline
                      value={form.message}
                      onChange={handleChange}
                      error={errors.message}
                      placeholder="Tell me about your project..."
                    />

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-display font-bold text-sm transition-all relative overflow-hidden"
                      style={{
                        background: status === 'sending'
                          ? 'rgba(0,245,255,0.2)'
                          : 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                        boxShadow: status === 'sending' ? 'none' : '0 0 20px rgba(0,245,255,0.4)',
                        color: status === 'sending' ? '#00f5ff' : '#020408',
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-[#00f5ff] border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          {t('contact.send')}
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
