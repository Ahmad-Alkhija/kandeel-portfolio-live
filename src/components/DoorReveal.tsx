import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

// ---- Gold Particle Burst ----
function ParticleBurst() {
  const particles = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const angle = (i / 28) * 360 + Math.random() * 15
      const distance = 60 + Math.random() * 140
      const size = 2.5 + Math.random() * 5
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

export default function DoorReveal() {
  const { i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <section className="relative py-24 md:py-32 bg-aviation-navy overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-aviation-navy via-aviation-navy-light to-aviation-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-aviation-gold/5 rounded-full blur-3xl" />

      {/* Gold horizontal line accent above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-aviation-gold/40 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className={`text-xs tracking-[0.2em] uppercase text-aviation-gold/50 mb-8 ${isRtl ? 'font-arabic' : ''}`}
        >
          {isRtl ? 'بوابتنا' : 'Our Gateway'}
        </motion.p>

        {/* Door container with fixed aspect ratio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-md aspect-square perspective-[1200px]"
        >
          {/* Logo behind the doors */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-6"
            >
              <img
                src={isRtl ? `${import.meta.env.BASE_URL}images/arabic%20logo.png` : `${import.meta.env.BASE_URL}images/english%20logo.png`}
                alt="Kandeel Almustashar"
                className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Gold particle burst when doors open */}
          <ParticleBurst />

          {/* Gold glow ring behind doors */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Left door panel */}
          <motion.div
            className="absolute left-0 top-0 w-1/2 h-full z-10 origin-left"              initial={{ rotateY: 0 }}
              whileInView={{ rotateY: isRtl ? 120 : -120 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            <div className="w-full h-full bg-gradient-to-r from-aviation-navy-light via-aviation-navy to-aviation-navy-light border-r border-aviation-gold/15 rounded-l-2xl shadow-2xl flex items-center justify-end p-4">
              {/* Door decorative panel */}
              <div className="w-3/4 h-3/4 border border-aviation-gold/10 rounded-xl flex items-center justify-center">
                <div className="w-16 h-16 border border-aviation-gold/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-aviation-gold/20 rounded-full" />
                </div>
              </div>
              {/* Gold handle */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-aviation-gold/60 to-aviation-gold-dark/60 rounded-full" />
            </div>
          </motion.div>

          {/* Right door panel */}
          <motion.div
            className="absolute right-0 top-0 w-1/2 h-full z-10 origin-right"              initial={{ rotateY: 0 }}
              whileInView={{ rotateY: isRtl ? -120 : 120 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            <div className="w-full h-full bg-gradient-to-l from-aviation-navy-light via-aviation-navy to-aviation-navy-light border-l border-aviation-gold/15 rounded-r-2xl shadow-2xl flex items-center justify-start p-4">
              {/* Door decorative panel */}
              <div className="w-3/4 h-3/4 border border-aviation-gold/10 rounded-xl flex items-center justify-center">
                <div className="w-16 h-16 border border-aviation-gold/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-aviation-gold/20 rounded-full" />
                </div>
              </div>
              {/* Gold handle */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-aviation-gold/60 to-aviation-gold-dark/60 rounded-full" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text below */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className={`mt-10 text-white/40 text-sm max-w-md mx-auto leading-relaxed ${isRtl ? 'font-arabic' : ''}`}
        >
          {isRtl
            ? 'بوابتك إلى عالم من التميز في خدمات التجارة والطيران'
            : 'Your gateway to a world of excellence in trading and aviation services'}
        </motion.p>

        {/* Gold line accent below */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-aviation-gold/30 to-transparent mt-8 mx-auto max-w-xs"
          style={{ transformOrigin: 'center' }}
        />
      </div>
    </section>
  )
}
