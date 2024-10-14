function localStorageExist () {
  return typeof localStorage !== 'undefined'
}

export function setToken (token: string) {
  if (localStorageExist()) localStorage.setItem('token', token)
}

export function getToken () {
  if (localStorageExist()) return localStorage.getItem('token') ?? ''
}
