import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Building2, Cog, Plane as PlaneIcon } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

const sectors = [
  {
    key: 'trading',
    icon: Building2,
    color: 'text-aviation-gold',
    bgColor: 'bg-aviation-gold/10',
  },
  {
    key: 'engineering',
    icon: Cog,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    key: 'aviation',
    icon: PlaneIcon,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
  },
]

export default function About() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <section id="about" className="relative py-24 md:py-32 bg-aviation-cream overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-aviation-gold/5 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-aviation-navy/5 rounded-tr-full" />

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
            {t('about.title')}
          </h2>
          <div className="accent-line mx-auto" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className={`text-lg md:text-xl leading-relaxed text-aviation-gray max-w-4xl mx-auto text-center mb-20 ${
            isRtl ? 'font-arabic leading-[1.8]' : ''
          }`}
        >
          {t('about.description')}
        </motion.p>

        {/* Sectors */}
        <motion.div variants={itemVariants}>
          <h3
            className={`text-2xl md:text-3xl font-semibold text-aviation-navy text-center mb-12 ${
              isRtl ? 'font-arabic' : 'font-display'
            }`}
          >
            {t('about.sectors')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector) => {
              const Icon = sector.icon
              return (
                <motion.div
                  key={sector.key}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500 border border-transparent hover:border-aviation-gold/20"
                  whileHover={{ y: -8 }}
                >
                  <div
                    className={`inline-flex p-4 rounded-xl ${sector.bgColor} ${sector.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4
                    className={`text-xl font-semibold text-aviation-navy mb-3 ${
                      isRtl ? 'font-arabic' : ''
                    }`}
                  >
                    {t(`about.sector_${sector.key}`)}
                  </h4>
                  <p
                    className={`text-aviation-gray leading-relaxed ${
                      isRtl ? 'font-arabic' : ''
                    }`}
                  >
                    {t(`about.sector_desc_${sector.key}`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
