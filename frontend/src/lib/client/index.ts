export function setTokenFromClient (token: string) {
  document.cookie = `token=${token}; secure; samesite=strict`
}

export function getTokenFromClient () {
  return document.cookie.split(';')
    .find(ck => ck.includes('token'))
    ?.replace('token=', '').trim()
}
