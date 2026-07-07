import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Award, Ticket, HeadphonesIcon, Package } from 'lucide-react'

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

const services = [
  { key: 'ticketing', icon: Ticket },
  { key: 'support', icon: HeadphonesIcon },
  { key: 'cargo', icon: Package },
]

export default function OfficialAgency() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <section id="agency" className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aviation-gold/50 to-transparent" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-aviation-sky rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-80 h-80 bg-aviation-gold/5 rounded-full blur-3xl" />

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
            {t('agency.title')}
          </h2>
          <div className="accent-line mx-auto" />
        </motion.div>

        {/* Main content card */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden mb-16"
        >
          <div className="relative z-10 p-8 md:p-16 bg-gradient-to-br from-aviation-navy via-aviation-navy-light to-aviation-dark">
            {/* Decorative pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201, 168, 76, 0.4) 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-aviation-gold/20">
                  <Award className="w-10 h-10 text-aviation-gold" />
                </div>
                <div>
                  <h3
                    className={`text-2xl md:text-3xl font-bold text-aviation-gold ${
                      isRtl ? 'font-arabic' : 'font-display'
                    }`}
                  >
                    {t('agency.subtitle')}
                  </h3>
                </div>
              </div>

              <p
                className={`text-lg leading-relaxed text-white/80 max-w-4xl mb-12 ${
                  isRtl ? 'font-arabic leading-[1.8]' : ''
                }`}
              >
                {t('agency.description')}
              </p>

              {/* Jazeera Airways Detail */}
              <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 mb-10">
                <h4
                  className={`text-xl font-semibold text-white mb-4 ${
                    isRtl ? 'font-arabic' : ''
                  }`}
                >
                  {t('agency.about_airline')}
                </h4>
                <p
                  className={`text-white/60 leading-relaxed ${
                    isRtl ? 'font-arabic leading-[1.8]' : ''
                  }`}
                >
                  {t('agency.airline_desc')}
                </p>
              </div>

              {/* Airline Services */}
              <h4
                className={`text-xl font-semibold text-white mb-6 ${
                  isRtl ? 'font-arabic' : ''
                }`}
              >
                {t('agency.services_title')}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service) => {
                  const Icon = service.icon
                  return (
                    <motion.div
                      key={service.key}
                      className="group bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-aviation-gold/30 transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <Icon className="w-8 h-8 text-aviation-gold mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h5
                        className={`text-base font-semibold text-white mb-2 ${
                          isRtl ? 'font-arabic' : ''
                        }`}
                      >
                        {t(`agency.service_${service.key}`)}
                      </h5>
                      <p
                        className={`text-sm text-white/50 ${
                          isRtl ? 'font-arabic' : ''
                        }`}
                      >
                        {t(`agency.service_${service.key}_desc`)}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
