import { create } from 'zustand'

interface CounterState {
  current: number
}

interface CounterActions {
  addition: () => void
}

export const useCounterStore = create<CounterState & CounterActions>()((set) => ({
  current: 0,
  addition () {
    set(state => ({ current: state.current + 1 }))
  }
}))
