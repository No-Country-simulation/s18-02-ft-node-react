import axios, { type AxiosInstance } from 'axios'
import type { LoginSchema, RegisterSchema } from './zod'
import { API_URL } from './constants'

axios.defaults.baseURL = API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'

interface BaseResponse<T> {
  payload: T
  status: string
}

interface LoginResponse extends BaseResponse<SessionUser> {
  token: string
}

export function createApiMethods (authInstance: AxiosInstance) {
  return {
    async login (credentials: LoginSchema): Promise<LoginResponse> {
      return await axios.post('auth/login', credentials)
    },
    async register (user: RegisterSchema & { role: User['role'] }) {
      return axios.post('auth/register', { ...user, repassword: user.repeatedPassword })
    },
    async confirmEmail (token: string) {
      return axios.post(`auth/confirm-email/${token}`)
    },
    async current (): Promise<BaseResponse<SessionUser>> {
      return authInstance.get('auth/current')
    }
  }
}
