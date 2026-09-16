import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthLayout from '../components/AuthLayout'
import ErrorAlert from '../components/ErrorAlert'

const PHONE_REGEX = /^[6-9]\d{9}$/

export default function Login() {
  const { isInitializing, isAuthenticated, notice, clearNotice, sendOtp } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [phone, setPhone] = useState(location.state?.phone || '')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isInitializing && isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!PHONE_REGEX.test(phone)) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    setError('')
    setIsSubmitting(true)
    try {
      await sendOtp(phone)
      clearNotice()
      navigate('/verify-otp', { state: { phone } })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout mainClassName="auth-center">
      <div className="card card-auth">
        <h1>Welcome Back</h1>
        <p className="subtitle">Log in to your MyTerraceApp account</p>

        {notice && (
          <div className="alert alert-info">
            {notice}
            <button type="button" className="alert-dismiss" aria-label="Dismiss" onClick={clearNotice}>
              &times;
            </button>
          </div>
        )}

        <ErrorAlert message={error} />

        <form onSubmit={handleSubmit}>
          <label htmlFor="phone" className="field-label">Mobile Number</label>
          <div className="phone-input">
            <span className="phone-prefix">+91</span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="9876543210"
              value={phone}
              onChange={handlePhoneChange}
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? 'Sending OTP...' : 'Continue'}
          </button>
        </form>

        <p className="auth-note">Secure &amp; simple — we’ll text you a one-time code.</p>
      </div>
    </AuthLayout>
  )
}
