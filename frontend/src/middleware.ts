import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware (request: NextRequest) {
  const token = request.cookies.get('token')
  console.log(token)

  if (token === undefined) return NextResponse.redirect(new URL('/login', request.url))

  // try {
  //   const user = await api.current()
  //   console.log(user)
  // } catch (error) {
  //   console.error(error)
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/profile/:path*'
}
