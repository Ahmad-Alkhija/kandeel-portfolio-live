import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export default function Events() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <section id="events" className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-aviation-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-aviation-sky rounded-full blur-3xl" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-aviation-navy mb-4 ${
              isRtl ? 'font-arabic' : 'font-display'
            }`}
          >
            {t('events.title')}
          </h2>
          <p
            className={`text-lg text-aviation-gray ${
              isRtl ? 'font-arabic' : ''
            }`}
          >
            {t('events.subtitle')}
          </p>
          <div className="accent-line mx-auto mt-4" />
        </motion.div>

        {/* Content - Coming Soon */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="relative">
            <div className="inline-flex p-6 rounded-full bg-aviation-cream mb-8">
              <Calendar className="w-12 h-12 text-aviation-gold" />
            </div>
            <p
              className={`text-lg text-aviation-gray leading-relaxed ${
                isRtl ? 'font-arabic leading-[1.8]' : ''
              }`}
            >
              {t('events.no_events')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
