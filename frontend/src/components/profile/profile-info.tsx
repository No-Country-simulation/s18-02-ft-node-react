'use client'

import { useSessionStore } from '@/stores/session'
import { notFound } from 'next/navigation'

export default function ProfileInfo ({ user }: { user: User }) {
  const sessionUser = useSessionStore(store => store.user)

  if (sessionUser === undefined) {
    notFound()
  }

  return (
    <>
      <section>
        <h2 className='font-bold text-sm mb-1'>Sobre mí</h2>
        <p className='text-neutral-500'>{user.description}</p>
      </section>
    </>
  )
}
