/**
 * SEO.jsx — Per-page head manager (no external dependencies).
 *
 * Handles: document.title, meta description, robots, Open Graph,
 * Twitter Card, canonical link, and optional JSON-LD injection.
 *
 * Usage:
 *   <SEO
 *     title="Classes"
 *     description="Browse all fitness classes at Iron & Fire…"
 *     path="/classes"
 *   />
 */

import { useEffect } from 'react'

// ── Site-wide constants ──────────────────────────────────────────────────────
export const SITE = {
  name: 'Iron & Fire Fitness',
  url: 'https://ironandfire.netlify.app',
  defaultTitle: 'Iron & Fire Fitness — Gym in Portsmouth, RI',
  defaultDesc:
    'Iron & Fire Fitness is Portsmouth, RI\'s community boutique gym. ' +
    'CrossFit, strength training, boxing, Olympic lifting, yoga & open gym. ' +
    '200+ members. First class is free — no commitment required.',
  defaultImage: 'https://ironandfire.netlify.app/og-image.jpg',
  twitter: '@ironandfirefit',
  email: 'ironandfire.ri@gmail.com',
  phone: '(401) 855-8004',
  address: {
    street: '275 High Point Avenue',
    locality: 'Portsmouth',
    region: 'RI',
    postalCode: '02871',
    country: 'US',
  },
}

// ── LocalBusiness JSON-LD (injected once from App or Home) ───────────────────
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'SportsActivityLocation'],
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  alternateName: ['Iron and Fire Gym', 'Iron and Fire Fitness Portsmouth RI'],
  description:
    'Community boutique gym in Portsmouth, RI. CrossFit, strength training, ' +
    'boxing, Olympic lifting, yoga & open gym. 200+ members. First class free.',
  url: SITE.url,
  email: SITE.email,
  telephone: '+14018558004',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '275 High Point Avenue',
    addressLocality: 'Portsmouth',
    addressRegion: 'RI',
    postalCode: '02871',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.604,
    longitude: -71.2518,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '05:30',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '07:00',
      closes: '12:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '08:00',
      closes: '11:00',
    },
  ],
  priceRange: '$$',
  image: `${SITE.url}/logo.jpg`,
  logo: `${SITE.url}/logo.jpg`,
  foundingDate: '2016',
  sameAs: [
    'https://instagram.com/ironandfirefit',
    'https://instagram.com/lizmoniz_crazyfitbitch',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Fitness Classes',
    itemListElement: [
      { '@type': 'Offer', name: 'CrossFit Classes', description: 'High-intensity functional fitness classes in Portsmouth RI' },
      { '@type': 'Offer', name: 'Strength Training', description: 'Progressive strength and Olympic lifting programs' },
      { '@type': 'Offer', name: 'Boxing & Kickboxing', description: 'Boxing classes for all levels in Portsmouth RI' },
      { '@type': 'Offer', name: 'Yoga & Recovery', description: 'Yoga and recovery classes at Iron & Fire Portsmouth' },
      { '@type': 'Offer', name: 'Open Gym Access', description: 'Flexible open gym access 7 days a week' },
    ],
  },
}

// ── Component ────────────────────────────────────────────────────────────────
export default function SEO({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
  schema,
}) {
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.defaultTitle
  const desc = description || SITE.defaultDesc
  const canonical = `${SITE.url}${path}`
  const image = ogImage || SITE.defaultImage

  useEffect(() => {
    // Page title
    document.title = fullTitle

    // Core meta
    upsert('name', 'description', desc)
    upsert('name', 'robots',
      noIndex
        ? 'noindex,nofollow'
        : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
    )
    upsert('name', 'author', SITE.name)

    // Open Graph
    upsert('property', 'og:title', fullTitle)
    upsert('property', 'og:description', desc)
    upsert('property', 'og:url', canonical)
    upsert('property', 'og:image', image)
    upsert('property', 'og:image:width', '1200')
    upsert('property', 'og:image:height', '630')
    upsert('property', 'og:type', 'website')
    upsert('property', 'og:site_name', SITE.name)
    upsert('property', 'og:locale', 'en_US')

    // Twitter Card
    upsert('name', 'twitter:card', 'summary_large_image')
    upsert('name', 'twitter:site', SITE.twitter)
    upsert('name', 'twitter:title', fullTitle)
    upsert('name', 'twitter:description', desc)
    upsert('name', 'twitter:image', image)

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)

    // Optional page-level JSON-LD
    if (schema) {
      injectJsonLD('page-schema', schema)
    }
  }, [fullTitle, desc, canonical, image, noIndex, schema])

  return null
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function upsert(attrName, attrValue, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function injectJsonLD(id, schema) {
  const scriptId = `jld-${id}`
  const existing = document.getElementById(scriptId)
  if (existing) existing.remove()
  const script = document.createElement('script')
  script.id = scriptId
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
}
