'use client'

import api from '@/lib/api'
import { useEffect } from 'react'

export default function Home () {
  useEffect(() => {
    api.current().then(res => {
      console.log(res)
    }).catch(console.error)
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Hello
    </div>
  )
}
