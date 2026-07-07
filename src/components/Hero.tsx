import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Plane, ChevronRight, ArrowDown } from 'lucide-react'

const Globe3D = lazy(() => import('./Globe3D'))

// ---- Simple 2D Flying Airplane (background) ----
function FlyingAirplane({ top, delay = 0, speed = 18 }: { top: string; delay?: number; speed?: number }) {
  return (
    <motion.div
      className="absolute left-0 z-[1] pointer-events-none"
      style={{ top }}
      initial={{ x: '-10vw' }}
      animate={{ x: '110vw' }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    >
      <Plane
        className="text-aviation-gold"
        style={{ width: 18, height: 18, opacity: 0.08, transform: 'rotate(-5deg)' }}
      />
    </motion.div>
  )
}

// ---- Simple Cloud (background) ----
function Cloud({ top, left, size = 'w-48 h-12', delay = 0 }: { top: string; left: string; size?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute z-[1] pointer-events-none ${size} bg-white/5 rounded-full blur-xl`}
      style={{ top, left }}
      animate={{ x: [0, 20, 0], opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const, delay }}
    />
  )
}

// ---- Content variants ----
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

export default function Hero() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-stretch overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-aviation-navy via-aviation-navy-light to-aviation-dark" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-[1]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201, 168, 76, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Background 2D flying airplane and clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <FlyingAirplane top="15%" delay={0} speed={22} />
        <FlyingAirplane top="35%" delay={8} speed={28} />
        <FlyingAirplane top="60%" delay={4} speed={25} />
        <FlyingAirplane top="80%" delay={14} speed={30} />
        <Cloud top="10%" left="10%" size="w-56 h-14" delay={0} />
        <Cloud top="45%" left="60%" size="w-40 h-10" delay={3} />
        <Cloud top="72%" left="25%" size="w-52 h-12" delay={6} />
        <Cloud top="25%" left="70%" size="w-36 h-8" delay={2} />
        <Cloud top="55%" left="5%" size="w-44 h-11" delay={5} />
      </div>

      {/* Content: Split into two halves */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-stretch min-h-screen">
        {/* Left side: 3D Globe */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen flex items-center justify-center p-4 lg:p-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-aviation-gold/30 border-t-aviation-gold rounded-full animate-spin" />
              </div>
            }
          >
            <div className="w-full h-full max-w-[600px] max-h-[600px] lg:max-h-full">
              <Globe3D />
            </div>
          </Suspense>
        </div>

        {/* Right side: Agency info */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-xl"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="mb-6">
              <img
                src={isRtl ? `${import.meta.env.BASE_URL}images/arabic%20logo.png` : `${import.meta.env.BASE_URL}images/english%20logo.png`}
                alt="Kandeel Almustashar"
                className="h-16 md:h-20 w-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight ${
                isRtl ? 'font-arabic' : 'font-display'
              }`}
            >
              {t('hero.title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className={`text-xl md:text-2xl text-aviation-gold font-light mb-2 ${
                isRtl ? 'font-arabic' : 'font-display italic'
              }`}
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className={`text-base md:text-lg text-white/60 mb-8 leading-relaxed ${
                isRtl ? 'font-arabic' : ''
              }`}
            >
              {t('hero.description')}
            </motion.p>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="w-16 h-0.5 bg-gradient-to-r from-aviation-gold to-transparent mb-8"
            />

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className={`flex flex-col sm:flex-row gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}
            >
              <motion.button
                onClick={scrollToServices}
                className="group relative px-8 py-4 bg-aviation-gold text-aviation-navy rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-aviation-gold/25"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.cta_primary')}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? 'rotate-180' : ''}`}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-aviation-gold-light to-aviation-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                className="px-8 py-4 border border-white/20 text-white rounded-xl font-medium text-base backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t('hero.cta_secondary')}
              </motion.button>
            </motion.div>

            {/* Hint text about globe */}
            <motion.p
              variants={itemVariants}
              className={`text-xs text-white/30 mt-8 ${isRtl ? 'font-arabic text-right' : ''}`}
            >
              {isRtl ? '🖱️ اسحب الكرة الأرضية لاستكشاف الوجهات' : '🖱️ Drag the globe to explore destinations'}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <a href="#about" className="text-white/30 hover:text-aviation-gold transition-colors flex flex-col items-center gap-1.5">
          <span className="text-[10px] tracking-widest uppercase">{t('hero.scroll_down')}</span>
          <ArrowDown className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  )
}
