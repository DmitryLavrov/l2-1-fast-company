const JWT_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'

export function setToken({refreshToken, idToken, expiresIn = 3600}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(JWT_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
}

export function getAccessToken() {
  return localStorage.getItem(JWT_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}

export function getExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY)
}

const localStorageService = {
  setToken,
  getAccessToken,
  getRefreshToken,
  getExpiresDate
}

export default localStorageService
