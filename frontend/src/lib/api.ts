import axios from 'axios'
import { API_URL } from '@/utils/constants'

axios.defaults.baseURL = API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
