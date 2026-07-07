import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Building2, Cog, Plane as PlaneIcon, Shield, Briefcase } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const services = [
  { key: 'trading', icon: Building2, gradient: 'from-amber-500/20 to-amber-600/10', iconColor: 'text-amber-500', borderColor: 'hover:border-amber-500/30' },
  { key: 'engineering', icon: Cog, gradient: 'from-blue-500/20 to-blue-600/10', iconColor: 'text-blue-500', borderColor: 'hover:border-blue-500/30' },
  { key: 'aviation', icon: PlaneIcon, gradient: 'from-emerald-500/20 to-emerald-600/10', iconColor: 'text-emerald-500', borderColor: 'hover:border-emerald-500/30' },
  { key: 'airline', icon: Shield, gradient: 'from-purple-500/20 to-purple-600/10', iconColor: 'text-purple-500', borderColor: 'hover:border-purple-500/30' },
  { key: 'business', icon: Briefcase, gradient: 'from-rose-500/20 to-rose-600/10', iconColor: 'text-rose-500', borderColor: 'hover:border-rose-500/30' },
]

export default function Services() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <section id="services" className="relative py-24 md:py-32 bg-aviation-cream overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-aviation-gold/5 rounded-tl-full" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-aviation-navy mb-4 ${
              isRtl ? 'font-arabic' : 'font-display'
            }`}
          >
            {t('services.title')}
          </h2>
          <p
            className={`text-lg text-aviation-gray ${
              isRtl ? 'font-arabic' : ''
            }`}
          >
            {t('services.subtitle')}
          </p>
          <div className="accent-line mx-auto mt-4" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.key}
                variants={cardVariants}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500 border border-gray-100 ${service.borderColor}`}
                whileHover={{ y: -8, scale: 1.01 }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 p-8">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} ${service.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3
                    className={`text-xl font-semibold text-aviation-navy mb-3 ${
                      isRtl ? 'font-arabic' : ''
                    }`}
                  >
                    {t(`services.${service.key}`)}
                  </h3>

                  <p
                    className={`text-aviation-gray leading-relaxed ${
                      isRtl ? 'font-arabic' : ''
                    }`}
                  >
                    {t(`services.${service.key}_desc`)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
