import request from './api'

export function sendOtp(phone) {
  return request('/api/auth/send-otp', { method: 'POST', body: { phone } })
}

export function verifyOtp(phone, code) {
  return request('/api/auth/verify-otp', { method: 'POST', body: { phone, code } })
}

export function verifyToken() {
  return request('/api/auth/verify-token', { method: 'GET', authenticated: true })
}

export function refreshToken() {
  return request('/api/auth/refresh-token', { method: 'POST', authenticated: true })
}

export function getProfile() {
  return request('/api/user/profile', { method: 'GET', authenticated: true })
}

export function deleteResidentAccount() {
  return request('/api/user/resident-account', { method: 'DELETE', authenticated: true })
}

export function deleteBusinessAccount() {
  return request('/api/business/account', { method: 'DELETE', authenticated: true })
}
