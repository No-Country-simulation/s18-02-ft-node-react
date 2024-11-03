import { cookies } from 'next/headers'
import api from './api'
import { redirect } from 'next/navigation'

export function getTokenFromServer () {
  const token = cookies().get('token')
  return token?.value
}

export async function getSessionUser () {
  let currentRes

  try {
    currentRes = await api.current()

    if (currentRes.status !== 'success') {
      redirect('/login')
    }
  } catch (error) {
    redirect('/login')
  }

  return currentRes
}
