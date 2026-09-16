import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function LegalLayout({ title, effectiveDate, children }) {
  return (
    <>
      <Header variant="marketing" />
      <main>
        <section className="legal-hero">
          <div className="container">
            <h1>{title}</h1>
            <p className="eff-date">{effectiveDate}</p>
          </div>
        </section>

        <section className="legal-wrap">
          <div className="container">
            <div className="legal-card">{children}</div>
            <div className="back-home">
              <Link className="btn btn-primary" to="/">← Back to Homepage</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
