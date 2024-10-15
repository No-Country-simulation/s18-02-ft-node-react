'use client'

import PostCard from '@/components/post-card'
import api from '@/lib/api'
import { TEACHERS } from '@/lib/constants'
import { useEffect } from 'react'

export default function Home () {
  useEffect(() => {
    api.current().then(res => {
      console.log(res)
    }).catch(console.error)
  }, [])

  return (
    <div className="">
      {TEACHERS.map(teacher => <PostCard key={teacher.id} user={teacher}/>)}
    </div>
  )
}
