import { Link } from 'react-router-dom'
import Header from './Header'

export default function AuthLayout({ children, rightSlot, mainClassName = '' }) {
  return (
    <div className="auth-shell">
      <Header variant="minimal" rightSlot={rightSlot} />
      <main className={mainClassName}>{children}</main>
      <footer className="auth-footer">
        <span>© 2026 MyTerraceApp</span>
        <nav aria-label="Legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/community-guidelines">Community Guidelines</Link>
        </nav>
      </footer>
    </div>
  )
}
