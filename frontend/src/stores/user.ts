import { create } from 'zustand'

interface UserState {
  user?: User
}

interface UserActions {
  setUser: (user: User) => void
}

export const useUserStore = create<UserState & UserActions>()((set) => ({
  setUser (user) {
    set({ user })
  }
}))
