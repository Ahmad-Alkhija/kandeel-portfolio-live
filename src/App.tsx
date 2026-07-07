import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import VisionMission from './components/VisionMission'
import OfficialAgency from './components/OfficialAgency'
import Services from './components/Services'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import DoorReveal from './components/DoorReveal'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kandeel Almustashar for Trading & Aviation Services',
    description:
      'Official General Sales Agent of Jazeera Airways in Syria. Trading, engineering, and aviation services.',
    url: 'https://kandeel-almustashar.com',
    logo: `${import.meta.env.BASE_URL}images/english%20logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Damascus',
      addressCountry: 'SY',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+963-XX-XXX-XXXX',
      contactType: 'customer service',
    },
    sameAs: [],
  }

  return (
    <>
      <Helmet>
        <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <LoadingScreen />

      <div className="min-h-screen overflow-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <VisionMission />
          <OfficialAgency />
          <Services />
          <Events />
          <Gallery />
          <Contact />
          <DoorReveal />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}

export default App
