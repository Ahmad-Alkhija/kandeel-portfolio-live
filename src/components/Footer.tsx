import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Plane, ChevronRight } from 'lucide-react'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'gallery', href: '#gallery' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <footer className="relative bg-aviation-dark border-t border-white/5 overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-aviation-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-6 h-6 text-aviation-gold" />
              <span className={`text-xl font-bold text-white ${
                isRtl ? 'font-arabic' : 'font-display'
              }`}>
                Kandeel Almustashar
              </span>
            </div>
            <p className={`text-sm text-white/40 leading-relaxed max-w-sm ${
              isRtl ? 'font-arabic' : ''
            }`}>
              {t('about.description')}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={`text-white font-semibold mb-6 ${
              isRtl ? 'font-arabic' : ''
            }`}>
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-2 text-sm text-white/50 hover:text-aviation-gold transition-colors duration-300 group ${
                      isRtl ? 'flex-row-reverse font-arabic' : ''
                    }`}
                  >
                    <ChevronRight className={`w-3 h-3 group-hover:translate-x-1 transition-transform duration-300 ${
                      isRtl ? 'rotate-180' : ''
                    }`} />
                    {t(`nav.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={`text-white font-semibold mb-6 ${
              isRtl ? 'font-arabic' : ''
            }`}>
              {t('contact.title')}
            </h3>
            <ul className={`space-y-3 text-sm text-white/50 ${
              isRtl ? 'font-arabic' : ''
            }`}>
              <li>{t('contact.address')}</li>
              <li>{t('contact.phone')}</li>
              <li className="text-aviation-gold">{t('contact.email')}</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className={`text-sm text-white/30 ${
            isRtl ? 'font-arabic' : ''
          }`}>
            &copy; {new Date().getFullYear()} Kandeel Almustashar. {t('footer.rights')}
          </p>
          <p className={`text-sm text-white/30 ${
            isRtl ? 'font-arabic' : ''
          }`}>
            {t('footer.designed_by')}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
