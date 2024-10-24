import axios from 'axios'
import { API_URL } from '@/lib/constants'
import { getTokenFromServer } from '.'
import { createApiMethods } from '../axios'

axios.defaults.baseURL = API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
export const authInstance = axios.create()

authInstance.interceptors.request.use(config => {
  const token = getTokenFromServer()

  if (token !== undefined) config.headers.Authorization = `Bearer ${token}`

  return config
}, error => {
  console.error('SV Request interceptor error: ', error.response)
  return error.response.data
})

authInstance.interceptors.response.use(response => {
  // console.log('SV Response interceptor: ', response)
  return response.data
}, async error => {
  console.error('SV Response interceptor error: ', error.response)
  return Promise.reject(error)
})

const api = createApiMethods(axios, authInstance)

export default api
