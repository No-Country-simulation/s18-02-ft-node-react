'use client'

import Header from '@/components/header'
import Navbar from '@/components/navbar'

export default function ProfilePage ({ params: { username } }: { params: { username: string } }) {
  console.log(username)

  return (
    <div className='min-h-dvh flex flex-col'>
      <Header />
      <main className='flex-1'>
        hola
        Username: {username}
      </main>
      <Navbar />
    </div>
  )
}
