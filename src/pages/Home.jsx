import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const el = document.querySelector(location.hash)
    el?.scrollIntoView()
  }, [location])

  return (
    <>
      <Header variant="marketing" />

      <main id="home">
        <section className="hero">
          <div className="container hero-inner">
            <h1 data-reveal style={{ '--d': '.05s' }}>Your Community. Connected. Simplified.</h1>
            <p className="lede" data-reveal style={{ '--d': '.15s' }}>
              MyTerraceApp is a smart community platform designed to make everyday residential life easier.
              Connect with your community, stay updated, discover local services, participate in events, and
              manage important community activities — all in one place.
            </p>
            <div className="hero-actions" data-reveal style={{ '--d': '.25s' }}>
              <Link className="btn btn-primary" to="/login">Get Started</Link>
              <a className="btn btn-secondary" href="#features">Explore Features</a>
            </div>
            <p className="hero-note" data-reveal style={{ '--d': '.32s' }}>
              Built to bring residents, businesses, and communities closer together.
            </p>

            <div className="hero-visual" data-reveal style={{ '--d': '.42s' }} aria-hidden="true">
              <div className="feed-mock">
                <div className="feed-card">
                  <div className="row"><span className="avatar orange" /><span className="skeleton w40" /></div>
                  <span className="skeleton w80" />
                  <span className="skeleton w60" />
                </div>
                <div className="feed-stat">
                  <div className="stat-pill"><span>Upcoming event</span><b>Diwali Mela</b></div>
                  <div className="stat-pill"><span>Active poll</span><b>Parking policy</b></div>
                  <div className="stat-pill"><span>New nearby</span><b>3 businesses</b></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="container about-grid">
            <div>
              <h2>Everything Your Community Needs, In One Place</h2>
              <p>
                Managing community activities shouldn't be complicated. MyTerraceApp brings residents, local
                businesses, and community management together through one simple and convenient platform.
              </p>
              <p>
                From community updates and events to local businesses and important announcements, everything
                is easily accessible from your phone.
              </p>

              <h3>Why MyTerraceApp?</h3>
              <ul className="about-list">
                <li><span className="check">✓</span>Stay connected with your community</li>
                <li><span className="check">✓</span>Discover local businesses and services</li>
                <li><span className="check">✓</span>Get important community updates</li>
                <li><span className="check">✓</span>Participate in events and polls</li>
                <li><span className="check">✓</span>Share posts and engage with residents</li>
                <li><span className="check">✓</span>Access everything from one platform</li>
              </ul>
            </div>

            <div className="about-panel">
              <h3>One app, every community need</h3>
              <p>A single home for updates, events, local businesses and conversations.</p>
              <div className="mini-stats">
                <div><b>6</b><span>Core features</span></div>
                <div><b>3</b><span>Community roles</span></div>
                <div><b>1</b><span>Simple app</span></div>
                <div><b>24/7</b><span>Stay updated</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <div className="section-head center">
              <h2>Designed For Your Community</h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon">🏠</div>
                <h3>Community Feed</h3>
                <p>Stay updated with the latest posts, announcements, discussions, and activities happening in your community.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">📅</div>
                <h3>Events &amp; Activities</h3>
                <p>Discover upcoming community events, join activities, and never miss what's happening around you.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">🏪</div>
                <h3>Local Businesses</h3>
                <p>Find businesses and services within your community and discover what they have to offer.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Polls &amp; Discussions</h3>
                <p>Share your opinion, participate in community polls, and have meaningful conversations with other residents.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">🔔</div>
                <h3>Notifications</h3>
                <p>Receive important updates and notifications so you can stay informed without constantly checking for updates.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">❤️</div>
                <h3>Connect &amp; Engage</h3>
                <p>Like, comment, share, and interact with your community in a simple and friendly environment.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="how" id="how-it-works">
          <div className="container">
            <div className="section-head center">
              <h2>Connect. Discover. Participate.</h2>
            </div>
            <div className="steps">
              <div className="step">
                <div className="step-num">01</div>
                <h3>Create Your Account</h3>
                <p>Sign up and join your community in just a few simple steps.</p>
              </div>
              <div className="step">
                <div className="step-num">02</div>
                <h3>Explore Your Community</h3>
                <p>Discover posts, events, businesses, announcements, and activities around you.</p>
              </div>
              <div className="step">
                <div className="step-num">03</div>
                <h3>Stay Connected</h3>
                <p>Follow what's happening and receive important community updates.</p>
              </div>
              <div className="step">
                <div className="step-num">04</div>
                <h3>Get Involved</h3>
                <p>Join events, participate in polls, interact with residents, and support local businesses.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="audience">
          <div className="container">
            <div className="section-head center">
              <h2>One Platform. Different Community Needs.</h2>
            </div>
            <div className="audience-grid">
              <article className="audience-card">
                <div className="audience-icon">🏡</div>
                <h3>For Residents</h3>
                <p>Connect with neighbors, discover events, find local businesses, and stay informed about your community.</p>
                <a href="#features">Explore Your Community →</a>
              </article>
              <article className="audience-card">
                <div className="audience-icon">💼</div>
                <h3>For Businesses</h3>
                <p>Connect with local residents, showcase your business, and reach customers within your community.</p>
                <a href="#contact">Grow Your Business →</a>
              </article>
              <article className="audience-card">
                <div className="audience-icon">📋</div>
                <h3>For Community Management</h3>
                <p>Share important announcements, organize activities, and keep your community connected.</p>
                <a href="#contact">Learn More →</a>
              </article>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <div className="cta-panel">
              <h2>Your Community Is Better Together</h2>
              <p>
                MyTerraceApp makes it easier to stay connected, informed, and involved in the place you call home.
                Join your community today and experience a smarter way to connect.
              </p>
              <div className="cta-actions">
                <Link className="btn btn-primary" to="/login">Get Started</Link>
                <a className="btn btn-outline" href="#">Download the App</a>
              </div>
              <p className="cta-note">Connect with your community. Discover what's around you. Be part of the conversation.</p>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container">
            <div className="contact-card">
              <h2>Get in Touch</h2>
              <p>For questions or support, reach us anytime.</p>
              <a className="email" href="mailto:admin@myterraceapp.com">admin@myterraceapp.com</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
