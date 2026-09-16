const TOKEN_KEY = 'terrace_auth_token'
const EXPIRES_KEY = 'terrace_auth_expires_at'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getExpiresAt() {
  return localStorage.getItem(EXPIRES_KEY)
}

export function saveToken(token, expiresAt) {
  localStorage.setItem(TOKEN_KEY, token)
  if (expiresAt) {
    localStorage.setItem(EXPIRES_KEY, expiresAt)
  } else {
    localStorage.removeItem(EXPIRES_KEY)
  }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EXPIRES_KEY)
}

export function isExpiringSoon(thresholdMs = 5 * 60 * 1000) {
  const expiresAt = getExpiresAt()
  if (!expiresAt) return false
  const expiryTime = new Date(expiresAt).getTime()
  if (Number.isNaN(expiryTime)) return false
  return expiryTime - Date.now() < thresholdMs
}
