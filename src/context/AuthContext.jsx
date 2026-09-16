import { createContext, useCallback, useEffect, useState } from 'react'
import * as authService from '../services/authService'
import { saveToken, clearToken, getToken, isExpiringSoon } from '../utils/tokenStorage'

export const AuthContext = createContext(null)

const GUEST_MESSAGE_NO_ACCOUNT =
  "You currently don't have a Resident or Business profile. Please create a Resident or Business profile to continue."
const GUEST_MESSAGE_AFTER_DELETE =
  'Your account has been deleted successfully. You no longer have a Resident or Business profile. Please create a Resident or Business profile to continue.'
const SESSION_EXPIRED_MESSAGE = 'Your session has expired. Please log in again.'

export function AuthProvider({ children }) {
  const [isInitializing, setIsInitializing] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [residentAccountExists, setResidentAccountExists] = useState(false)
  const [businessAccountExists, setBusinessAccountExists] = useState(false)
  const [notice, setNotice] = useState(null)

  const clearNotice = useCallback(() => setNotice(null), [])

  const resetSession = useCallback(() => {
    clearToken()
    setIsAuthenticated(false)
    setUser(null)
    setResidentAccountExists(false)
    setBusinessAccountExists(false)
  }, [])

  const logout = useCallback(() => {
    resetSession()
  }, [resetSession])

  const logoutWithNotice = useCallback((message) => {
    resetSession()
    setNotice(message)
  }, [resetSession])

  const handleSessionExpired = useCallback(() => {
    logoutWithNotice(SESSION_EXPIRED_MESSAGE)
  }, [logoutWithNotice])

  // Applies a fresh profile response to state. Returns true when the user has
  // neither a resident nor a business account (i.e. is a guest), in which
  // case the session is cleared immediately and the caller attaches whichever
  // notice message fits the situation it was called from.
  const applyProfile = useCallback((profile) => {
    const hasAccount = !!profile.residentAccountExists || !!profile.businessAccountExists
    if (!hasAccount) {
      resetSession()
      return true
    }
    setUser(profile.user)
    setResidentAccountExists(!!profile.residentAccountExists)
    setBusinessAccountExists(!!profile.businessAccountExists)
    setIsAuthenticated(true)
    return false
  }, [resetSession])

  const loadProfile = useCallback(async () => {
    const profile = await authService.getProfile()
    return applyProfile(profile)
  }, [applyProfile])

  useEffect(() => {
    let cancelled = false

    async function initialize() {
      const token = getToken()
      if (!token) {
        setIsInitializing(false)
        return
      }

      try {
        await authService.verifyToken()

        if (isExpiringSoon()) {
          try {
            const refreshed = await authService.refreshToken()
            saveToken(refreshed.token, refreshed.expiresAt)
          } catch {
            // Refresh is best-effort here; the still-valid token keeps working until it expires.
          }
        }

        const isGuest = await loadProfile()
        if (!cancelled && isGuest) {
          setNotice(GUEST_MESSAGE_NO_ACCOUNT)
        }
      } catch {
        if (!cancelled) resetSession()
      } finally {
        if (!cancelled) setIsInitializing(false)
      }
    }

    initialize()
    return () => {
      cancelled = true
    }
  }, [loadProfile, resetSession])

  const sendOtp = useCallback((phone) => authService.sendOtp(phone), [])

  const verifyOtpAndLogin = useCallback(async (phone, code) => {
    const result = await authService.verifyOtp(phone, code)
    saveToken(result.token, result.expiresAt)
    const isGuest = await loadProfile()
    if (isGuest) {
      setNotice(GUEST_MESSAGE_NO_ACCOUNT)
      return 'guest'
    }
    return 'authenticated'
  }, [loadProfile])

  const deleteResidentAccount = useCallback(async () => {
    await authService.deleteResidentAccount()
    const isGuest = await loadProfile()
    if (isGuest) {
      setNotice(GUEST_MESSAGE_AFTER_DELETE)
      return 'guest'
    }
    return 'authenticated'
  }, [loadProfile])

  const deleteBusinessAccount = useCallback(async () => {
    await authService.deleteBusinessAccount()
    const isGuest = await loadProfile()
    if (isGuest) {
      setNotice(GUEST_MESSAGE_AFTER_DELETE)
      return 'guest'
    }
    return 'authenticated'
  }, [loadProfile])

  const value = {
    isInitializing,
    isAuthenticated,
    user,
    residentAccountExists,
    businessAccountExists,
    notice,
    clearNotice,
    sendOtp,
    verifyOtpAndLogin,
    deleteResidentAccount,
    deleteBusinessAccount,
    logout,
    handleSessionExpired,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
