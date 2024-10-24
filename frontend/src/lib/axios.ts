import { type AxiosInstance } from 'axios'
import type { LoginSchema, RegisterSchema } from './zod'

interface SessionUserResponse {
  payload: SessionUser
  status: string
}

export function createApiMethods (baseInstance: AxiosInstance, authInstance: AxiosInstance) {
  return {
    async login (credentials: LoginSchema): Promise<SessionUserResponse> {
      return await baseInstance.post('auth/login', credentials)
    },
    async register (user: RegisterSchema & { role: User['role'] }) {
      return baseInstance.post('auth/register', { ...user, repassword: user.repeatedPassword })
    },
    async confirmEmail (token: string) {
      return baseInstance.post(`auth/confirm-email/${token}`)
    },
    async current (): Promise<SessionUserResponse> {
      return authInstance.get('auth/current')
    }
  }
}
