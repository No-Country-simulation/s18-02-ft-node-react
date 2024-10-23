import axios from 'axios'
import { getTokenFromServer } from '.'
import { createApiMethods } from '../axios'

const serverInstance = axios.create()
const api = createApiMethods(serverInstance, getTokenFromServer)

export default api
