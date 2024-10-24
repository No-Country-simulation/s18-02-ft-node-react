'use client'

import Logo from '@/components/logo'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/client/api'

export default function AuthConfirmAccountPage ({ params: { token } }: { params: { token: string } }) {
  const router = useRouter()

  useEffect(() => {
    api.confirmEmail(token).then(res => {
      console.log(res)
      router.push('/login')
    }).catch(console.error)
  }, [token, router])

  return (
    <section className='max-w-sm mx-auto flex flex-col items-center space-y-12 pt-10'>
      <Logo />
      <h1 className='font-semibold text-xl'>Confirmamos tu email con éxito!</h1>
    </section>
  )
}
