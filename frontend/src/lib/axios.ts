import { type AxiosInstance } from 'axios'
import type { LoginSchema, RegisterSchema } from './zod'
import { API_URL } from './constants'

interface BaseResponse<T> {
  payload: T
  status: string
}

interface LoginResponse extends BaseResponse<SessionUser> {
  token: string
}

const authRoutes = ['current', 'user']

// Suggested code may be subject to a license. Learn more: ~LicenseLog:276667114.
export function createApiMethods (axiosInstance: AxiosInstance, getToken: () => string | undefined) {
  axiosInstance.defaults.baseURL = API_URL
  axiosInstance.defaults.headers.get['Content-Type'] = 'application/json'
  axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
  axiosInstance.defaults.headers.put['Content-Type'] = 'application/json'

  axiosInstance.interceptors.request.use(config => {
    // console.log('Axios request')

    if (authRoutes.some(route => config.url?.includes(route))) {
      const token = getToken()

      if (token !== undefined) config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, async error => {
    console.error('Request interceptor error: ', error.response)
    return Promise.reject(error)
  })

  axiosInstance.interceptors.response.use(response => {
    // console.log('Response interceptor: ')
    return response.data
  }, async error => {
    console.error('Response interceptor error: ', error.response)
    return Promise.reject(error)
  })

  return {
    async login (credentials: LoginSchema): Promise<LoginResponse> {
      return await axiosInstance.post('auth/login', credentials)
    },
    async register (user: RegisterSchema & { role: User['role'] }) {
      return axiosInstance.post('auth/register', { ...user, repassword: user.repeatedPassword })
    },
    async confirmEmail (token: string) {
      return axiosInstance.post(`auth/confirm-email/${token}`)
    },
    async current (): Promise<BaseResponse<SessionUser>> {
      return axiosInstance.get('auth/current')
    },
    async getMyProfile (): Promise<BaseResponse<User>> {
      return axiosInstance.get('user/my-profile')
    },
    async getProfile (username: string): Promise<BaseResponse<User>> {
      return axiosInstance({
        url: 'user/user-profile',
        method: 'GET',
        data: { username }
      })
    }
  }
}
