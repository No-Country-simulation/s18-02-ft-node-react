'use client'

import { usePathname } from 'next/navigation'
import { useFormStatus } from 'react-dom'

export default function AuthForm () {
  const isLogin = usePathname().includes('/login')

  return (
    <form action="">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>

      <section className='flex flex-col gap-y-3'>
        {(!isLogin) && <label>
          <span>Name</span>
          <input type="text" />
        </label>}
        <label>
          <span>Username</span>
          <input type="text" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" />
        </label>
        {(!isLogin) && <label>
          <span>Repeat password</span>
          <input type="password" />
        </label>}
      </section>
    </form>
  )
}
