import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNameInitials (name: string) {
  return name.split(/ +/g).map(s => s[0]).slice(0, 3).join('')
}

export function isClient () {
  return typeof window !== 'undefined'
}
