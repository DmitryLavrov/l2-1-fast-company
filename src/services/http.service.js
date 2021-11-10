import axios from 'axios'
// import * as Sentry from '@sentry/react'
import { toast } from 'react-toastify'
import config from '../config.json'

axios.defaults.baseURL = config.apiEndpoint

axios.interceptors.response.use(res => res,
  error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
    if (!expectedError) {
      // =========================
      console.log('error:', error)
      // =========================

      toast.info('Something happened. Try it later.')
      // toast('Unexpected error:')
    }
    return Promise.reject(error)
  })

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}

export default httpService
