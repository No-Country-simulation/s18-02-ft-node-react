import React from 'react'

export default function ProfileLayout ({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-col gap-y-6 flex-1 px-5 py-6'>
      {children}
    </main>
  )
}
