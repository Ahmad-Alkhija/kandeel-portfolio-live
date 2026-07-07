import { useState, type FormEvent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

// ---- Gold Particle Burst (same as DoorReveal) ----
function ParticleBurst() {
  const particles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * 360 + Math.random() * 15
      const distance = 50 + Math.random() * 120
      const size = 2 + Math.random() * 4
      const delay = Math.random() * 0.2
      return { angle, distance, size, delay, id: i }
    })
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180
        const x = Math.cos(rad) * p.distance
        const y = Math.sin(rad) * p.distance
        return (
          <motion.div
            key={p.id}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              backgroundColor: '#c9a84c',
              boxShadow: '0 0 6px rgba(201, 168, 76, 0.6)',
            }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            whileInView={{
              opacity: [0, 0.9, 0.6, 0],
              scale: [0, 1.2, 0.8, 0.3],
              x: [0, x * 0.5, x],
              y: [0, y * 0.5, y],
            }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 1.0 + p.delay,
              delay: 1.35 + p.delay * 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )
      })}
    </div>
  )
}

export default function Contact() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-aviation-navy overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aviation-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201, 168, 76, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header with Door Reveal */}
        <div className="text-center mb-16">
          <div className="relative inline-block mx-auto">
            {/* Gold horizontal line accent above */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-aviation-gold/40 to-transparent mx-auto mb-8"
              style={{ transformOrigin: 'center', width: '120px' }}
            />

            {/* Door container */}
            <div className="relative w-64 h-28 sm:w-80 sm:h-36 mx-auto perspective-[1200px]">
              {/* Content behind doors */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white ${
                    isRtl ? 'font-arabic' : 'font-display'
                  }`}
                >
                  {t('contact.title')}
                </motion.h2>
              </div>

              {/* Gold particle burst when doors open */}
              <ParticleBurst />

              {/* Left door panel */}
              <motion.div
                className="absolute left-0 top-0 w-1/2 h-full z-10 origin-left"
                initial={{ rotateY: 0 }}
                whileInView={{ rotateY: isRtl ? 120 : -120 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              >
                <div className="w-full h-full bg-gradient-to-r from-aviation-navy-light via-aviation-navy to-aviation-navy-light border-r border-aviation-gold/15 rounded-l-xl shadow-2xl flex items-center justify-end p-3">
                  <div className="w-3/4 h-3/4 border border-aviation-gold/10 rounded-lg flex items-center justify-center">
                    <div className="w-10 h-10 border border-aviation-gold/20 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-aviation-gold/20 rounded-full" />
                    </div>
                  </div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-aviation-gold/60 to-aviation-gold-dark/60 rounded-full" />
                </div>
              </motion.div>

              {/* Right door panel */}
              <motion.div
                className="absolute right-0 top-0 w-1/2 h-full z-10 origin-right"
                initial={{ rotateY: 0 }}
                whileInView={{ rotateY: isRtl ? -120 : 120 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              >
                <div className="w-full h-full bg-gradient-to-l from-aviation-navy-light via-aviation-navy to-aviation-navy-light border-l border-aviation-gold/15 rounded-r-xl shadow-2xl flex items-center justify-start p-3">
                  <div className="w-3/4 h-3/4 border border-aviation-gold/10 rounded-lg flex items-center justify-center">
                    <div className="w-10 h-10 border border-aviation-gold/20 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-aviation-gold/20 rounded-full" />
                    </div>
                  </div>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-aviation-gold/60 to-aviation-gold-dark/60 rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Subtitle revealed after doors open */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className={`text-lg text-white/60 mt-6 ${
                isRtl ? 'font-arabic' : ''
              }`}
            >
              {t('contact.subtitle')}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="accent-line mx-auto mt-4"
              style={{ transformOrigin: 'center' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-aviation-gold/10 text-aviation-gold group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-white font-semibold mb-1 ${
                      isRtl ? 'font-arabic' : ''
                    }`}
                  >
                    {t('contact.address')}
                  </h3>
                  <p className="text-white/50 text-sm">Damascus, Syria</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-aviation-gold/10 text-aviation-gold group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-white font-semibold mb-1 ${
                      isRtl ? 'font-arabic' : ''
                    }`}
                  >
                    {t('contact.phone')}
                  </h3>
                  <p className="text-white/50 text-sm">+963 XX XXX XXXX</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-aviation-gold/10 text-aviation-gold group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-white font-semibold mb-1 ${
                      isRtl ? 'font-arabic' : ''
                    }`}
                  >
                    {t('contact.email')}
                  </h3>
                  <p className="text-white/50 text-sm">info@kandeel-almustashar.com</p>
                </div>
              </div>
            </div>

            {/* Social & WhatsApp Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="https://wa.me/963XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle className="w-5 h-5" />
                {t('contact.whatsapp')}
              </motion.a>

              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                Facebook
              </motion.a>

              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                Twitter / X
              </motion.a>

              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube
              </motion.a>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-48 rounded-xl glass-dark border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-aviation-gold/40 mx-auto mb-2" />
                <p className="text-white/30 text-sm">
                  {t('contact.map_placeholder')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p
                    className={`text-white text-lg ${
                      isRtl ? 'font-arabic' : ''
                    }`}
                  >
                    {t('contact.form_success')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder={t('contact.form_name')}
                      required
                      className={`w-full px-5 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-aviation-gold/50 focus:ring-1 focus:ring-aviation-gold/30 transition-all duration-300 ${
                        isRtl ? 'text-right font-arabic' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={t('contact.form_email')}
                      required
                      className={`w-full px-5 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-aviation-gold/50 focus:ring-1 focus:ring-aviation-gold/30 transition-all duration-300 ${
                        isRtl ? 'text-right font-arabic' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder={t('contact.form_phone')}
                      className={`w-full px-5 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-aviation-gold/50 focus:ring-1 focus:ring-aviation-gold/30 transition-all duration-300 ${
                        isRtl ? 'text-right font-arabic' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder={t('contact.form_message')}
                      required
                      className={`w-full px-5 py-3.5 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-aviation-gold/50 focus:ring-1 focus:ring-aviation-gold/30 transition-all duration-300 resize-none ${
                        isRtl ? 'text-right font-arabic' : ''
                      }`}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-aviation-gold text-aviation-navy rounded-xl font-semibold hover:bg-aviation-gold-light transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-4 h-4" />
                    {t('contact.form_submit')}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
