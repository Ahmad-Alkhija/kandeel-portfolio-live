import { useState, useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import ImageLightbox from './ImageLightbox'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const base = import.meta.env.BASE_URL

const galleryImages = [
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.40%20PM.jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.40%20PM%20(1).jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.40%20PM%20(2).jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.41%20PM.jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.41%20PM%20(1).jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.41%20PM%20(2).jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.42%20PM.jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.42%20PM%20(1).jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.42%20PM%20(2).jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.42%20PM%20(3).jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.43%20PM.jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.43%20PM%20(1).jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.43%20PM%20(2).jpeg`,
  `${base}images/WhatsApp%20Image%202026-07-01%20at%2010.06.44%20PM.jpeg`,
]

const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD = 60

// Individual slide with its own loading skeleton
function Slide({
  src,
  index,
  direction,
  onOpen,
  reduceMotion,
}: {
  src: string
  index: number
  direction: number
  onOpen: () => void
  reduceMotion: boolean
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      key={src}
      className="absolute inset-0"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 60 : -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -60 : 60 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: 'easeOut' }}
    >
      {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <img
        src={src}
        alt={`Gallery ${index + 1}`}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={index === 0 ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        draggable={false}
      />
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View image ${index + 1} of ${galleryImages.length} full screen`}
        className="group absolute inset-0 flex items-center justify-center bg-aviation-navy/0 hover:bg-aviation-navy/30 focus-visible:bg-aviation-navy/30 transition-colors duration-300 outline-none"
      >
        <span className="w-14 h-14 rounded-full bg-aviation-gold/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 ring-4 ring-transparent group-focus-visible:ring-white/60">
          <Search className="w-6 h-6 text-aviation-navy" />
        </span>
      </button>
    </motion.div>
  )
}

export default function Gallery() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'
  const reduceMotion = Boolean(useReducedMotion())

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([])
  const thumbStripRef = useRef<HTMLDivElement | null>(null)
  const total = galleryImages.length

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir)
      setCurrentIndex(((index % total) + total) % total)
    },
    [total]
  )

  const handlePrev = useCallback(() => {
    goTo(currentIndex - 1, -1)
  }, [currentIndex, goTo])

  const handleNext = useCallback(() => {
    goTo(currentIndex + 1, 1)
  }, [currentIndex, goTo])

  // Keep active thumbnail in view — scroll only the thumbnail strip itself,
  // never scrollIntoView, since that can bubble up and scroll the whole page.
  useEffect(() => {
    const container = thumbStripRef.current
    const thumb = thumbRefs.current[currentIndex]
    if (!container || !thumb) return

    const targetLeft =
      thumb.offsetLeft - container.clientWidth / 2 + thumb.clientWidth / 2

    container.scrollTo({
      left: targetLeft,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [currentIndex, reduceMotion])

  // Autoplay, paused on hover/focus, when lightbox closed, and respecting reduced motion
  useEffect(() => {
    if (!isPlaying || isHovering || lightboxOpen || reduceMotion) return
    const id = window.setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % total)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [isPlaying, isHovering, lightboxOpen, reduceMotion, total])

  // Keyboard navigation when the slider itself is focused
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        isRtl ? handlePrev() : handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        isRtl ? handleNext() : handlePrev()
      }
    },
    [handleNext, handlePrev, isRtl]
  )

  const handleDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) {
        isRtl ? handlePrev() : handleNext()
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        isRtl ? handleNext() : handlePrev()
      }
    },
    [handleNext, handlePrev, isRtl]
  )

  const openLightboxAt = useCallback((index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }, [])

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-aviation-cream overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-aviation-gold/5 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-aviation-navy/5 rounded-tr-full" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-aviation-navy mb-4 ${
              isRtl ? 'font-arabic' : 'font-display'
            }`}
          >
            {t('gallery.title')}
          </h2>
          <p className={`text-lg text-aviation-gray ${isRtl ? 'font-arabic' : ''}`}>
            {t('gallery.subtitle')}
          </p>
          <div className="accent-line mx-auto mt-4" />
        </motion.div>

        {/* Slider */}
        <motion.div
          variants={itemVariants}
          className="relative"
          dir={isRtl ? 'rtl' : 'ltr'}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={t('gallery.title')}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 shadow-xl outline-none focus-visible:ring-4 focus-visible:ring-aviation-gold/60"
          >
            <motion.div
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <Slide
                  key={currentIndex}
                  src={galleryImages[currentIndex]}
                  index={currentIndex}
                  direction={direction}
                  onOpen={() => openLightboxAt(currentIndex)}
                  reduceMotion={reduceMotion}
                />
              </AnimatePresence>
            </motion.div>

            {/* Prev / Next arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t('gallery.previousImage', 'Previous image')}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-aviation-navy shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-aviation-gold/60"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t('gallery.nextImage', 'Next image')}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-aviation-navy shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-aviation-gold/60"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Play / pause + counter */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={
                  isPlaying
                    ? t('gallery.pauseSlideshow', 'Pause slideshow')
                    : t('gallery.playSlideshow', 'Play slideshow')
                }
                className="w-9 h-9 rounded-full bg-aviation-navy/70 backdrop-blur-sm text-white flex items-center justify-center hover:bg-aviation-navy/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-aviation-gold/60"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <span className="px-3 py-1.5 rounded-full bg-aviation-navy/70 backdrop-blur-sm text-white text-sm font-medium tabular-nums">
                {currentIndex + 1} / {total}
              </span>
            </div>
          </div>

          {/* Dot indicators (mobile) */}
          <div className="flex sm:hidden justify-center gap-2 mt-5">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index, index > currentIndex ? 1 : -1)}
                aria-label={`${t('gallery.goToImage', 'Go to image')} ${index + 1}`}
                aria-current={index === currentIndex}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-aviation-gold' : 'w-2.5 bg-aviation-navy/25'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail strip (tablet & up) */}
          <div
            ref={thumbStripRef}
            className="hidden sm:flex gap-3 mt-5 overflow-x-auto pb-2 px-1 scrollbar-thin scrollbar-thumb-aviation-navy/20"
          >
            {galleryImages.map((src, index) => (
              <button
                key={src}
                ref={(el) => { thumbRefs.current[index] = el }}
                type="button"
                onClick={() => goTo(index, index > currentIndex ? 1 : -1)}
                aria-label={`${t('gallery.goToImage', 'Go to image')} ${index + 1}`}
                aria-current={index === currentIndex}
                className={`relative shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                  index === currentIndex
                    ? 'ring-2 ring-aviation-gold ring-offset-2 ring-offset-aviation-cream opacity-100'
                    : 'opacity-60 hover:opacity-90'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      <ImageLightbox
        images={galleryImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  )
}