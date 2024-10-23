import { cookies } from 'next/headers'

export function getTokenFromServer () {
  const token = cookies().get('token')
  return token?.value
}
