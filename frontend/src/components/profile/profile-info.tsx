'use client'

import { useSessionStore } from '@/stores/session'
import { notFound } from 'next/navigation'
import { Button } from '../ui/button'

export default function ProfileInfo ({ user }: { user: User }) {
  const sessionUser = useSessionStore(store => store.user)

  if (sessionUser === undefined) {
    notFound()
  }

  return (
    <div className='flex flex-col justify-between flex-1 gap-y-4'>
      <section>
        <h2 className='font-bold text-sm mb-1'>Sobre mí</h2>
        <p className='text-neutral-500'>{user.description}</p>
      </section>

      {(user.role === 'teacher' && sessionUser.id !== user.id) && <section
        className='flex gap-x-4'
      >
        <Button
          variant='outline'
          className='w-full'
        >Añadir a Mis profesores</Button>
        <Button className='w-full'>Reserva una clase</Button>
      </section>}
    </div>
  )
}
