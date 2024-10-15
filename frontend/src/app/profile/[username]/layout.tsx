import Header from '@/components/header'
import Navbar from '@/components/navbar'
import React from 'react'

export default function ProfileLayout ({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-dvh flex flex-col'>
      <Header />
      <main className='flex-1 px-5 py-6 space-y-6'>
        {children}
      </main>
      <Navbar />
    </div>
  )
}
