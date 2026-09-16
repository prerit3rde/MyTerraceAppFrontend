import { getToken } from '../utils/tokenStorage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export class ApiError extends Error {
  constructor(message, { code, status, isAuthError = false } = {}) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
    this.isAuthError = isAuthError
  }
}

/**
 * Centralized request helper: builds the URL, attaches JSON headers and the
 * bearer token when needed, and normalizes both transport and API-level
 * failures into ApiError so callers only ever deal with one error shape.
 */
async function request(path, { method = 'GET', body, authenticated = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (authenticated) {
    const token = getToken()
    if (!token) {
      throw new ApiError('You have been signed out. Please log in again.', { isAuthError: true })
    }
    headers.Authorization = `Bearer ${token}`
  }

  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Unable to reach the server. Please check your connection and try again.')
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    // Non-JSON or empty response body; fall through to status-based handling below.
  }

  if (!response.ok || !data?.success) {
    const message = data?.error || 'Something went wrong. Please try again.'
    throw new ApiError(message, {
      code: data?.code ?? response.status,
      status: response.status,
      isAuthError: authenticated && response.status === 401,
    })
  }

  return data
}

export default request
