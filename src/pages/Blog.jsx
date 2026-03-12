import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '../utils/data'
import { useAnalytics } from '../hooks'
import { SectionTitle } from '../components/ui/index.jsx'

export default function Blog() {
  const { t } = useTranslation()
  const { trackEvent } = useAnalytics()
  const [activeTag, setActiveTag] = useState('All')

  useEffect(() => {
    trackEvent('page_view', { page: 'blog' })
  }, [])

  const allTags = ['All', ...new Set(BLOG_POSTS.flatMap(p => p.tags))]
  const filtered = activeTag === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.tags.includes(activeTag))

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('blog.title')} subtitle={t('blog.subtitle')} />

        {/* Tag filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTags.map(tag => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTag(tag)}
              className="px-4 py-1.5 rounded-full font-mono text-xs border transition-all"
              style={{
                borderColor: activeTag === tag ? '#00f5ff' : 'rgba(255,255,255,0.1)',
                background: activeTag === tag ? 'rgba(0,245,255,0.1)' : 'transparent',
                color: activeTag === tag ? '#00f5ff' : '#64748b',
              }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.id}`}>
                <div
                  className="rounded-2xl overflow-hidden border border-white/5 group-hover:border-[#00f5ff]/30 transition-all duration-300 h-full flex flex-col"
                  style={{
                    background: 'rgba(10,22,40,0.7)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,245,255,0.1)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Post header color */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: `linear-gradient(90deg, #00f5ff, #bf00ff)`,
                      opacity: 0.7,
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-xs font-mono bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#00f5ff] transition-colors mb-3 leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-400 text-sm font-body leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime} {t('blog.minRead')}
                        </span>
                      </div>

                      <motion.div
                        className="flex items-center gap-1 text-[#00f5ff] text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ x: 3 }}
                      >
                        Read <ArrowRight size={12} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
