import axios from 'axios'
import { API_URL } from '@/lib/constants'
import { type RegisterSchema, type LoginSchema } from '../zod'
import { getTokenFromClient } from '.'

axios.defaults.baseURL = API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
export const authInstance = axios.create()

authInstance.interceptors.request.use(config => {
  const token = getTokenFromClient()

  if (token !== undefined) config.headers.Authorization = `Bearer ${token}`

  return config
}, error => {
  console.error('Request interceptor error: ', error.response)
  return error.response.data
})

authInstance.interceptors.response.use(response => {
  console.log('Response interceptor: ', response)
  return response.data
}, async error => {
  console.error('Response interceptor error: ', error.response)
  return Promise.reject(error)
})

const api = {
  async login (credentials: LoginSchema) {
    return await axios.post<{
      payload: User
      token: string
    }>('auth/login', credentials)
  },
  async register (user: RegisterSchema & { role: User['role'] }) {
    return axios.post('auth/register', { ...user, repassword: user.repeatedPassword })
  },
  async confirmEmail (token: string) {
    return axios.post(`auth/confirm-email/${token}`)
  },
  async current (token?: string) {
    return authInstance.get<{
      payload: SessionUser
      status: string
    }>('auth/current', {
      headers: {
        Authorization: token === undefined ? undefined : `Bearer ${token}`
      }
    })
  }
}

export default api
