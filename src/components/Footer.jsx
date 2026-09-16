import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span>MyTerraceApp</span>
            </div>
            <p>Connecting communities, one neighborhood at a time.</p>
            <div className="footer-social">
              <a href="https://facebook.com" aria-label="MyTerraceApp on Facebook" target="_blank" rel="noopener">f</a>
              <a href="https://instagram.com" aria-label="MyTerraceApp on Instagram" target="_blank" rel="noopener">i</a>
              <a href="https://linkedin.com" aria-label="MyTerraceApp on LinkedIn" target="_blank" rel="noopener">in</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/#home">Home</Link></li>
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/#features">Features</Link></li>
              <li><Link to="/#how-it-works">How It Works</Link></li>
              <li><Link to="/#contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>For Users</h4>
            <ul>
              <li><a href="#">Residents</a></li>
              <li><a href="#">Businesses</a></li>
              <li><a href="#">Community Management</a></li>
              <li><a href="#">Help &amp; Support</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use">Terms &amp; Conditions</Link></li>
              <li><Link to="/community-guidelines">Community Guidelines</Link></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
            <h4 style={{ marginTop: '1.5rem' }}>Contact</h4>
            <ul>
              <li><a href="mailto:admin@myterraceapp.com">admin@myterraceapp.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 MyTerraceApp. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
