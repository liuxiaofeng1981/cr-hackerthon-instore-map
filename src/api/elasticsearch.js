import axios from 'axios'
import { ES_AGW_URL, ES_AGW_API_KEY } from '@env'

export default axios.create({
  baseURL: ES_AGW_URL,
  headers: {
    'x-api-key': ES_AGW_API_KEY,
  },
})
