import axios from 'axios'
import { getTokenFromServer } from '.'
import { createApiMethods } from '../axios'

export const authInstance = axios.create()

authInstance.interceptors.request.use(config => {
  console.log('Server request')
  const token = getTokenFromServer()

  if (token !== undefined) config.headers.Authorization = `Bearer ${token}`

  return config
}, async error => {
  console.error('SV Request interceptor error: ', error.response)
  return Promise.reject(error)
})

authInstance.interceptors.response.use(response => {
  console.log('SV Response interceptor: ')
  return response.data
}, async error => {
  console.error('SV Response interceptor error: ', error.response)
  return Promise.reject(error)
})

const api = createApiMethods(authInstance)

export default api
