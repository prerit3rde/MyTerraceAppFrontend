import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About Us' },
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#contact', label: 'Contact' },
]

export default function Header({ variant = 'marketing', rightSlot = null }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const isHomeLoggedIn = isAuthenticated && location.pathname === '/'
  const ctaLabel = isHomeLoggedIn ? 'My Account' : 'Get Started'
  const ctaTarget = isHomeLoggedIn ? '/profile' : '/login'

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    function onClickOutside(event) {
      if (!menuRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onClickOutside)
    }
  }, [isMenuOpen])

  const isMarketing = variant === 'marketing'

  return (
    <>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="container nav">
          <Link className="brand" to="/" aria-label="MyTerraceApp home">
            <img src="/assets/images/terrace_logo.png" alt="MyTerraceApp" />
          </Link>

          {isMarketing ? (
            <>
              <nav className="nav-links" aria-label="Primary">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} to={link.href}>{link.label}</Link>
                ))}
              </nav>
              <div className="nav-right">
                <Link className="btn btn-primary" to={ctaTarget}>{ctaLabel}</Link>
                <ThemeToggle />
                <button
                  ref={toggleRef}
                  className="menu-toggle"
                  type="button"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setIsMenuOpen((open) => !open)}
                >
                  <span className="bar" />
                </button>
              </div>
            </>
          ) : (
            <div className="nav-right">
              {rightSlot}
              <ThemeToggle />
            </div>
          )}
        </div>
      </header>

      {/* Rendered as a header sibling, not a child: .site-header's backdrop-filter would
          otherwise become the containing block for this fixed-position panel and collapse it. */}
      {isMarketing && (
        <div className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`} id="mobile-menu" ref={menuRef}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
          ))}
          <Link className="btn btn-primary btn-block" to={ctaTarget} onClick={() => setIsMenuOpen(false)}>{ctaLabel}</Link>
        </div>
      )}
    </>
  )
}
