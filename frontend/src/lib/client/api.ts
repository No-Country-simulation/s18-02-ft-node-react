import axios from 'axios'
import { getTokenFromClient } from '.'
import { createApiMethods } from '../axios'

export const authInstance = axios.create()

axios.interceptors.request.use(config => {
  const token = getTokenFromClient()

  if (token !== undefined) config.headers.Authorization = `Bearer ${token}`

  return config
}, error => {
  console.error('Request interceptor error: ', error.response)
  return error.response.data
})

axios.interceptors.response.use(response => {
  console.log('Response interceptor: ', response)
  return response.data
}, async error => {
  console.error('Response interceptor error: ', error.response)
  return Promise.reject(error)
})

const api = createApiMethods(authInstance)

export default api
