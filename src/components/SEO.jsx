import { useEffect } from 'react'

const FALLBACK_SITE_URL = 'https://domandjaybusiness.pages.dev'

function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL?.trim()
  if (configured) return configured.replace(/\/+$/, '')
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin
  return FALLBACK_SITE_URL
}

const SITE_URL = getSiteUrl()

export const SITE = {
  name: 'Domandjaybusiness',
  url: SITE_URL,
  defaultTitle: 'Domandjaybusiness | Modern Digital Services for Growing Businesses',
  defaultDesc:
    'Domandjaybusiness provides website-based digital services for individuals, entrepreneurs, and small businesses that want a modern, trustworthy online presence.',
  defaultImage: `${SITE_URL}/logo.jpg`,
  email: 'hello@domandjaybusiness.com',
}

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  description: SITE.defaultDesc,
  url: SITE.url,
  email: SITE.email,
  logo: SITE.defaultImage,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: SITE.email,
    availableLanguage: ['English'],
  },
  sameAs: ['https://instagram.com', 'https://facebook.com', 'https://linkedin.com'],
  areaServed: 'Worldwide',
  knowsAbout: ['Website design', 'Landing pages', 'Digital support', 'Online business services'],
}

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
    document.title = fullTitle
    upsert('name', 'description', desc)
    upsert('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1')
    upsert('name', 'author', SITE.name)
    upsert('property', 'og:title', fullTitle)
    upsert('property', 'og:description', desc)
    upsert('property', 'og:url', canonical)
    upsert('property', 'og:image', image)
    upsert('property', 'og:type', 'website')
    upsert('property', 'og:site_name', SITE.name)
    upsert('property', 'og:locale', 'en_US')
    upsert('name', 'twitter:card', 'summary_large_image')
    upsert('name', 'twitter:title', fullTitle)
    upsert('name', 'twitter:description', desc)
    upsert('name', 'twitter:image', image)

    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)

    if (schema) injectJsonLD('page-schema', schema)
  }, [fullTitle, desc, canonical, image, noIndex, schema])

  return null
}

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
