export function setTokenFromClient (token: string) {
  document.cookie = `token=${token}`
}

export function getTokenFromClient () {
  return document.cookie.split(';')
    .find(ck => ck.includes('token'))
    ?.replace('token=', '')
}
