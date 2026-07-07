import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.4 },
  }),
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isRtl = i18n.language === 'ar'

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'vision', href: '#vision' },
    { key: 'mission', href: '#mission' },
    { key: 'agency', href: '#agency' },
    { key: 'services', href: '#services' },
    { key: 'events', href: '#events' },
    { key: 'gallery', href: '#gallery' },
    { key: 'contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
    localStorage.setItem('i18nextLng', newLang)
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-dark shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={isRtl ? `${import.meta.env.BASE_URL}images/arabic%20logo.png` : `${import.meta.env.BASE_URL}images/english%20logo.png`}
              alt="Kandeel Almustashar"
              className="h-12 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <motion.a
                key={item.key}
                href={item.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isRtl ? 'font-arabic' : ''
                } text-white/80 hover:text-aviation-gold hover:bg-white/5`}
                whileHover={{ y: -1 }}
              >
                {t(`nav.${item.key}`)}
              </motion.a>
            ))}

            {/* Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg border border-aviation-gold/30 text-aviation-gold hover:bg-aviation-gold/10 transition-all duration-300 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              {t('language.switch_to')}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-aviation-gold transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-dark border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isRtl ? 'font-arabic text-right' : ''
                  } text-white/70 hover:text-aviation-gold hover:bg-white/5`}
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              <button
                onClick={toggleLanguage}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg border border-aviation-gold/30 text-aviation-gold hover:bg-aviation-gold/10 transition-all duration-300 text-sm font-medium ${
                  isRtl ? 'justify-start font-arabic' : ''
                }`}
              >
                <Globe className="w-4 h-4" />
                {t('language.switch_to')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
