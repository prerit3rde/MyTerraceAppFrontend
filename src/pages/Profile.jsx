import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthLayout from '../components/AuthLayout'
import ErrorAlert from '../components/ErrorAlert'
import ConfirmModal from '../components/ConfirmModal'

const ACCOUNT_COPY = {
  resident: {
    label: 'Resident',
    deleteLabel: 'Delete Resident Account',
    confirmTitle: 'Delete Resident Account?',
    confirmMessage:
      'Are you sure you want to delete your Resident account? This action will remove your resident account information.',
  },
  business: {
    label: 'Business',
    deleteLabel: 'Delete Business Account',
    confirmTitle: 'Delete Business Account?',
    confirmMessage:
      'Are you sure you want to delete your Business account? This action will permanently remove your business account data.',
  },
}

function capitalize(value) {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function Profile() {
  const {
    user,
    residentAccountExists,
    businessAccountExists,
    deleteResidentAccount,
    deleteBusinessAccount,
    logout,
    handleSessionExpired,
  } = useAuth()
  const navigate = useNavigate()

  const [confirmTarget, setConfirmTarget] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  async function handleConfirmDelete() {
    const target = confirmTarget
    setIsDeleting(true)
    setError('')

    try {
      const result = target === 'resident' ? await deleteResidentAccount() : await deleteBusinessAccount()
      setConfirmTarget(null)

      if (result === 'guest') {
        navigate('/login', { replace: true })
        return
      }

      setSuccessMessage(`${ACCOUNT_COPY[target].label} account deleted successfully.`)
    } catch (err) {
      if (err.isAuthError) {
        handleSessionExpired()
        navigate('/login', { replace: true })
        return
      }
      setError(err.message)
    } finally {
      setIsDeleting(false)
    }
  }

  const confirmCopy = confirmTarget ? ACCOUNT_COPY[confirmTarget] : null
  const roles = user?.roles ?? []
  const addressVerification = user?.isAddressVerified
  const hasAnyAccount = residentAccountExists || businessAccountExists

  return (
    <AuthLayout
      mainClassName="profile-main"
      rightSlot={<button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsLogoutConfirmOpen(true)}>Log out</button>}
    >
      <div className="profile-shell">
        <div className="profile-intro">
          <h1>My Account</h1>
          <p className="subtitle">Manage your profile and community accounts.</p>
        </div>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
            <button type="button" className="alert-dismiss" aria-label="Dismiss" onClick={() => setSuccessMessage('')}>
              &times;
            </button>
          </div>
        )}
        <ErrorAlert message={error} />

        <section className="card">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user?.fullName || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{user?.phone || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user?.email || 'Not provided'}</span>
            </div>
            {user?._id && (
              <div className="info-item">
                <span className="info-label">User ID</span>
                <span className="info-value">{user._id}</span>
              </div>
            )}
          </div>
        </section>

        <section className="card">
          <h2>Account Information</h2>
          <div className="pill-row">
            {roles.length > 0 ? (
              roles.map((role) => (
                <span key={role} className={`pill pill-${role}`}>{capitalize(role)}</span>
              ))
            ) : (
              <span className="pill pill-muted">No roles</span>
            )}
          </div>
          {user?.user_type && (
            <p className="user-type-line">Current user type: <strong>{capitalize(user.user_type)}</strong></p>
          )}
          <div className="availability-grid">
            <div className={`availability-item${residentAccountExists ? ' is-active' : ''}`}>
              <span>Resident Account</span>
              <strong>{residentAccountExists ? 'Active' : 'Not Available'}</strong>
            </div>
            <div className={`availability-item${businessAccountExists ? ' is-active' : ''}`}>
              <span>Business Account</span>
              <strong>{businessAccountExists ? 'Active' : 'Not Available'}</strong>
            </div>
          </div>
        </section>

        {addressVerification && (
          <section className="card">
            <h2>Address Verification</h2>
            <span className={`verify-badge verify-${(addressVerification.status || 'unknown').toLowerCase()}`}>
              {capitalize(addressVerification.status) || 'Unknown'}
            </span>
            {addressVerification.rejectionReason && (
              <p className="rejection-reason">Reason: {addressVerification.rejectionReason}</p>
            )}
          </section>
        )}

        {hasAnyAccount && (
          <section className="card">
            <h2>My Profiles / Accounts</h2>
            <div className="account-card-grid">
              {residentAccountExists && (
                <div className="account-card account-card-resident">
                  <h3>Resident Profile</h3>
                  <span className="status-active">Active</span>
                  <button
                    type="button"
                    className="btn btn-danger-outline"
                    onClick={() => setConfirmTarget('resident')}
                    disabled={isDeleting}
                  >
                    Delete Resident Account
                  </button>
                </div>
              )}

              {businessAccountExists && (
                <div className="account-card account-card-business">
                  <h3>Business Profile</h3>
                  <span className="status-active">Active</span>
                  <button
                    type="button"
                    className="btn btn-danger-outline"
                    onClick={() => setConfirmTarget('business')}
                    disabled={isDeleting}
                  >
                    Delete Business Account
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        <ConfirmModal
          isOpen={confirmTarget !== null}
          title={confirmCopy?.confirmTitle}
          message={confirmCopy?.confirmMessage}
          confirmLabel={confirmCopy?.deleteLabel}
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmTarget(null)}
        />

        <ConfirmModal
          isOpen={isLogoutConfirmOpen}
          title="Log Out?"
          message="Are you sure you want to log out of your account?"
          confirmLabel="Log Out"
          onConfirm={handleLogout}
          onCancel={() => setIsLogoutConfirmOpen(false)}
        />
      </div>
    </AuthLayout>
  )
}
