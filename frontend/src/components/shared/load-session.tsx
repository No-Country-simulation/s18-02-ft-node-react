'use client'

import api from '@/lib/client/api'
import { useSessionStore } from '@/stores/session'
import { useEffect } from 'react'

export default function LoadSession () {
  const setSession = useSessionStore(store => store.setSession)

  useEffect(() => {
    api.current().then(res => {
      setSession(res.payload)
    }).catch(error => {
      if (error?.response?.data.status !== 'error') {
        console.log('error in load session: ', error)
      }
    })
  }, [setSession])

  return null
}
