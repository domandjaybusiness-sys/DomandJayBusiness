import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import { injectJsonLD, ORGANIZATION_SCHEMA } from './components/SEO'
import Analytics from './components/Analytics'

export default function App() {
  useEffect(() => {
    injectJsonLD('organization', ORGANIZATION_SCHEMA)
  }, [])

  return (
    <div className="min-h-screen bg-ink text-slate-900 flex flex-col">
      <ScrollToTop />
      <Analytics />
      <Navbar />
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
    </div>
  )
}
