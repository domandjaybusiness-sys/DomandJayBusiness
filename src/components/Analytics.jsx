/**
 * Analytics.jsx — Privacy-first, zero-dependency page-view tracker.
 *
 * What it does:
 *   - Respects the browser's Do Not Track (DNT) signal
 *   - Fires a lightweight POST to /.netlify/functions/track on each
 *     route change with only: page path + referrer (no PII, no cookies)
 *   - Falls back silently if the function doesn't exist (dev / pre-deploy)
 *
 * To enable:
 *   1. Create netlify/functions/track.js that stores the event
 *      (or swap the endpoint for Plausible / Fathom / Umami).
 *   2. Mount <Analytics /> in App.jsx (already done).
 *
 * This component collects NO personally identifiable information.
 */

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Honour browser-level Do Not Track
function isDNT() {
  return (
    navigator.doNotTrack === '1' ||
    navigator.doNotTrack === 'yes' ||
    window.doNotTrack === '1'
  )
}

export default function Analytics() {
  const location = useLocation()
  const prevPath = useRef(null)

  useEffect(() => {
    // Skip if DNT is set, admin panel, or same path
    if (isDNT()) return
    if (location.pathname === '/admin') return
    if (location.pathname === prevPath.current) return
    prevPath.current = location.pathname

    const payload = {
      path: location.pathname,
      referrer: document.referrer || '',
    }

    // Fire-and-forget — errors are swallowed intentionally
    fetch('/.netlify/functions/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {/* silently ignore */})
  }, [location.pathname])

  return null
}
