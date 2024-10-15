import { USERS } from '@/lib/constants'
import { create } from 'zustand'

interface UserState {
  user?: User
}

interface UserActions {
  setUser: (user: User) => void
}

export const useUserStore = create<UserState & UserActions>()((set) => ({
  user: USERS[0],
  setUser (user) {
    set({ user })
  }
}))
