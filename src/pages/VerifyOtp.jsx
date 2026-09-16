import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthLayout from '../components/AuthLayout'
import ErrorAlert from '../components/ErrorAlert'
import OtpInput from '../components/OtpInput'

const OTP_LENGTH = 6

function formatPhone(phone) {
  if (!phone || phone.length !== 10) return phone
  return `${phone.slice(0, 5)} ${phone.slice(5)}`
}

export default function VerifyOtp() {
  const { isInitializing, isAuthenticated, verifyOtpAndLogin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const phone = location.state?.phone

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (otp.length === OTP_LENGTH && !isVerifying) {
      handleVerify()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp])

  if (!isInitializing && isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  if (!phone) {
    return <Navigate to="/login" replace />
  }

  async function handleVerify() {
    if (otp.length !== OTP_LENGTH) {
      setError('Please enter the complete 6-digit OTP.')
      return
    }

    setError('')
    setIsVerifying(true)
    try {
      const result = await verifyOtpAndLogin(phone, otp)
      navigate(result === 'guest' ? '/login' : '/profile', { replace: true })
    } catch (err) {
      setError(err.message)
      setOtp('')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <AuthLayout mainClassName="auth-center">
      <div className="card card-auth">
        <h1>Verify your number</h1>
        <p className="subtitle">
          Enter the OTP sent to<br />
          <strong>+91 {formatPhone(phone)}</strong>
        </p>

        <ErrorAlert message={error} />

        <form onSubmit={(event) => { event.preventDefault(); handleVerify() }}>
          <OtpInput length={OTP_LENGTH} value={otp} onChange={setOtp} disabled={isVerifying} />

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isVerifying || otp.length !== OTP_LENGTH}
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <button
          type="button"
          className="btn-link"
          onClick={() => navigate('/login', { state: { phone } })}
          disabled={isVerifying}
        >
          Change Number
        </button>
      </div>
    </AuthLayout>
  )
}
