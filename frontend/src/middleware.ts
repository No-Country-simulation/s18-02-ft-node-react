import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import api from './lib/server/api'

export async function middleware (request: NextRequest) {
  const token = request.cookies.get('token')

  if (token === undefined) {
    console.log('redirect to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const res = await api.current()

    if (res.status !== 'success') return NextResponse.redirect(new URL('/login', request.url))
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/profile/:path*'
}
