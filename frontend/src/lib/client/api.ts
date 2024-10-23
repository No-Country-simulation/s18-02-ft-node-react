import axios from 'axios'
import { getTokenFromClient } from '.'
import { createApiMethods } from '../axios'

const clientInstance = axios.create()
const api = createApiMethods(clientInstance, getTokenFromClient)

export default api
