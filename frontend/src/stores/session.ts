import api from '@/lib/client/api'
// import { SESSION_USER } from '@/lib/constants'
import { create } from 'zustand'

interface SessionState {
  user?: SessionUser
}

interface SessionActions {
  setSession: (user: SessionUser) => void
}

export const useSessionStore = create<SessionState & SessionActions>()((set) => {
  api.current().then(res => {
    console.log('zustand: ', res)
    if (res.status !== 'success') return
    set({ user: res.payload })
  }).catch(console.error)

  return {
    // user: SESSION_USER,
    setSession (user) {
      set({ user })
    }
  }
})
