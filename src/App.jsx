import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home           from './pages/Home'
import Classes        from './pages/Classes'
import About          from './pages/About'
import Pricing        from './pages/Pricing'
import Contact        from './pages/Contact'
import Schedule       from './pages/Schedule'
import BookingSuccess from './pages/BookingSuccess'
import Admin          from './pages/Admin'
import { injectJsonLD, LOCAL_BUSINESS_SCHEMA } from './components/SEO'
import Analytics from './components/Analytics'

// 404 page
function NotFound() {
  useEffect(() => { document.title = 'Page Not Found | Iron & Fire Fitness' }, [])
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <div className="font-display font-black text-8xl fire-text mb-4">404</div>
        <h1 className="font-display font-black text-3xl text-white mb-4 uppercase">Page Not Found</h1>
        <p className="text-white/50 font-sans mb-8">That page doesn't exist — let's get you back on track.</p>
        <a href="/" className="inline-block px-8 py-4 rounded-md font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white">
          Back to Home
        </a>
      </div>
    </div>
  )
}

// Admin page gets no Navbar/Footer
function AdminWrapper() {
  return <Admin />
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  // Inject LocalBusiness JSON-LD once at app level (not per page)
  useEffect(() => {
    injectJsonLD('local-business', LOCAL_BUSINESS_SCHEMA)
  }, [])

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      <ScrollToTop />
      <Analytics />
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? '' : 'flex-1'}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"                element={<Home />}           />
            <Route path="/classes"         element={<Classes />}        />
            <Route path="/about"           element={<About />}          />
            <Route path="/pricing"         element={<Pricing />}        />
            <Route path="/contact"         element={<Contact />}        />
            <Route path="/schedule"        element={<Schedule />}       />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/admin"           element={<AdminWrapper />}   />
            <Route path="*"               element={<NotFound />}        />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
    </div>
  )
}
