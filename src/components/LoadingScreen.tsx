import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Short delay to ensure smooth entry
    const showTimer = setTimeout(() => setShowContent(true), 50)
    // Hide loader after content is ready
    const hideTimer = setTimeout(() => setIsVisible(false), 1800)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-aviation-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-8"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/english%20logo.png`}
              alt="Kandeel Almustashar"
              className="h-20 md:h-24 w-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Loading spinner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative"
          >
            {/* Outer ring */}
            <div className="w-12 h-12 rounded-full border-2 border-aviation-gold/20" />
            {/* Spinning arc */}
            <motion.div
              className="absolute top-0 left-0 w-12 h-12 rounded-full border-2 border-transparent border-t-aviation-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-aviation-gold"
              animate={{ scale: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6 text-xs tracking-[0.25em] uppercase text-aviation-gold/40"
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
