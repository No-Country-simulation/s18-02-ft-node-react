import axios from 'axios'
import { API_URL } from '@/lib/constants'
import { type RegisterSchema, type LoginSchema } from './zod'
import { getToken } from './web'

axios.defaults.baseURL = API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
const secureApi = axios.create()

secureApi.interceptors.request.use(config => {
  const token = getToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
}, async error => {
  console.error(error)
  return Promise.reject(error)
})

const api = {
  async login (credentials: LoginSchema) {
    return axios.post<{
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
  async current () {
    return secureApi.get('auth/current')
  }
}

export default api
