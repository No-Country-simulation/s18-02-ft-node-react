function documentExist () {
  return typeof window !== 'undefined'
}

export function setToken (token: string) {
  if (documentExist()) document.cookie = `token=${token}; secure; samesite=strict`
}

export function getToken () {
  if (documentExist()) {
    return document.cookie.split(';')
      .find(ck => ck.includes('token'))
      ?.replace('token=', '')
  }
}
