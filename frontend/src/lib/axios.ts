import { type AxiosInstance } from 'axios'
import type { LoginSchema, RegisterSchema } from './zod'

export function createApiMethods (baseInstance: AxiosInstance, authInstance: AxiosInstance) {
  return {
    async login (credentials: LoginSchema) {
      return await baseInstance.post<{
        payload: User
        token: string
      }>('auth/login', credentials)
    },
    async register (user: RegisterSchema & { role: User['role'] }) {
      return baseInstance.post('auth/register', { ...user, repassword: user.repeatedPassword })
    },
    async confirmEmail (token: string) {
      return baseInstance.post(`auth/confirm-email/${token}`)
    },
    async current () {
      return authInstance.get<{
        payload: SessionUser
        status: string
      }>('auth/current')
    }
  }
}
