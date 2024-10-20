import { SESSION_USER } from '@/lib/constants'
import { create } from 'zustand'

interface SessionState {
  user?: SessionUser
}

interface SessionActions {
  setSession: (user: SessionUser) => void
}

export const useSessionStore = create<SessionState & SessionActions>()((set) => ({
  user: SESSION_USER,
  setSession (user) {
    set({ user })
  }
}))
