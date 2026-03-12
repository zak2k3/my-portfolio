import { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { BLOG_POSTS } from '../utils/data'

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false)
  const [displayed, setDisplayed] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setIsTyping(true)
    // Fast typing for code blocks
    const timer = setInterval(() => {
      if (i < code.length) {
        setDisplayed(code.slice(0, i + 1))
        i++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 8)
    return () => clearInterval(timer)
  }, [code])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-[#00f5ff]/20">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a1628] border-b border-[#00f5ff]/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-xs text-slate-500">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-[#00f5ff] transition-colors"
        >
          {copied ? <Check size={12} className="text-[#00ff9f]" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          background: 'rgba(5,13,20,0.9)',
          fontSize: '0.8rem',
          lineHeight: '1.6',
        }}
      >
        {displayed}
      </SyntaxHighlighter>
      {isTyping && (
        <div className="absolute bottom-3 right-3 w-2 h-4 bg-[#00f5ff] animate-[blink_0.5s_infinite]" />
      )}
    </div>
  )
}

function renderMarkdown(content) {
  const lines = content.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code blocks
    if (line.startsWith('```')) {
      const lang = line.slice(3) || 'text'
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <CodeBlock key={i} code={codeLines.join('\n')} language={lang} />
      )
    }
    // H1
    else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="font-display font-bold text-3xl text-white mt-8 mb-4">
          {line.slice(2)}
        </h1>
      )
    }
    // H2
    else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-display font-bold text-xl text-[#00f5ff] mt-6 mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#00f5ff] rounded-full" />
          {line.slice(3)}
        </h2>
      )
    }
    // H3
    else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="font-display font-semibold text-lg text-slate-200 mt-4 mb-2">
          {line.slice(4)}
        </h3>
      )
    }
    // List items
    else if (line.startsWith('- ')) {
      elements.push(
        <div key={i} className="flex items-start gap-2 my-1.5">
          <span className="text-[#00f5ff] mt-1.5 text-xs">◆</span>
          <span className="font-body text-slate-300 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
            }}
          />
        </div>
      )
    }
    // Numbered list
    else if (/^\d+\. /.test(line)) {
      const num = line.match(/^(\d+)\. /)[1]
      elements.push(
        <div key={i} className="flex items-start gap-3 my-1.5">
          <span className="font-mono text-[#bf00ff] text-xs mt-1 font-bold">{num}.</span>
          <span className="font-body text-slate-300 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: line.replace(/^\d+\. /, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
            }}
          />
        </div>
      )
    }
    // Regular paragraph
    else if (line.trim()) {
      elements.push(
        <p key={i} className="font-body text-slate-300 leading-relaxed mb-3 text-sm"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
              .replace(/`(.*?)`/g, '<code class="font-mono text-[#00f5ff] bg-[#00f5ff]/10 px-1.5 py-0.5 rounded text-xs">$1</code>')
          }}
        />
      )
    }
    i++
  }
  return elements
}

export default function BlogPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = BLOG_POSTS.find(p => p.id === parseInt(id))

  if (!post) {
    navigate('/blog')
    return null
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00f5ff] transition-colors font-mono text-sm"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Post header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-slate-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#00f5ff]" />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#bf00ff]" />
              {post.readTime} min read
            </span>
          </div>

          <div className="mt-6 h-px bg-gradient-to-r from-[#00f5ff] via-[#bf00ff] to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose-custom"
        >
          {renderMarkdown(post.content)}
        </motion.div>

        {/* Related posts */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <h3 className="font-display font-bold text-lg text-white mb-6">More Posts</h3>
          <div className="grid gap-4">
            {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(related => (
              <Link key={related.id} to={`/blog/${related.id}`}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-[#00f5ff]/20 transition-all"
                  style={{ background: 'rgba(10,22,40,0.5)' }}
                >
                  <div className="flex-1">
                    <p className="font-display font-semibold text-sm text-white hover:text-[#00f5ff] transition-colors">
                      {related.title}
                    </p>
                    <p className="font-mono text-xs text-slate-500 mt-1">{related.readTime} min read</p>
                  </div>
                  <ArrowLeft size={14} className="text-[#00f5ff] rotate-180" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
