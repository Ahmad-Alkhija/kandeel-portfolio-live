import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Eye, Target } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

export default function VisionMission() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <section className="relative py-24 md:py-32 bg-aviation-navy overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-aviation-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Vision */}
          <motion.div
            id="vision"
            variants={itemVariants}
            className="group relative"
          >
            <div className="relative z-10 p-8 md:p-12 rounded-3xl glass-dark border border-aviation-gold/10 hover:border-aviation-gold/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-aviation-gold/10 text-aviation-gold group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8" />
                </div>
                <h3
                  className={`text-3xl md:text-4xl font-bold text-white ${
                    isRtl ? 'font-arabic' : 'font-display'
                  }`}
                >
                  {t('vision.title')}
                </h3>
              </div>
              <p
                className={`text-lg leading-relaxed text-white/70 ${
                  isRtl ? 'font-arabic leading-[1.8]' : ''
                }`}
              >
                {t('vision.description')}
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            id="mission"
            variants={itemVariants}
            className="group relative"
          >
            <div className="relative z-10 p-8 md:p-12 rounded-3xl glass-dark border border-aviation-gold/10 hover:border-aviation-gold/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-aviation-gold/10 text-aviation-gold group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8" />
                </div>
                <h3
                  className={`text-3xl md:text-4xl font-bold text-white ${
                    isRtl ? 'font-arabic' : 'font-display'
                  }`}
                >
                  {t('mission.title')}
                </h3>
              </div>
              <p
                className={`text-lg leading-relaxed text-white/70 ${
                  isRtl ? 'font-arabic leading-[1.8]' : ''
                }`}
              >
                {t('mission.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
