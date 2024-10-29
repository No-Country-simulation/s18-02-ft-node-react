'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/client/api'
import CheckCircleIcon from '@/icons/check-circle'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function AuthConfirmAccountPage ({ params: { token } }: { params: { token: string } }) {
  const router = useRouter()

  useEffect(() => {
    api.confirmEmail(token).then(res => {
      console.log(res)
      router.push('/login')
    }).catch(console.error)
  }, [token, router])

  return (
    <section className='max-w-sm mx-auto flex flex-col items-center gap-y-12 pt-10 min-h-full'>
      <CheckCircleIcon className='text-primary size-32'/>
      <div className='grow text-center text-pretty'>
        <h1 className='font-semibold text-xl'>¡Has registrado tu usuario con éxito!</h1>
        <p className='text-muted'>Muchas gracias por elegir nuestra plataforma, esperamos tengas una buena experiencia.</p>
      </div>
      <Link href='/' className={cn(buttonVariants(), 'font-semibold w-full')}>Ir al inicio</Link>
    </section>
  )
}
