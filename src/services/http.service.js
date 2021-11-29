import axios from 'axios'
// import * as Sentry from '@sentry/react'
import { toast } from 'react-toastify'
import configFile from '../config.json'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
  function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gm.test(config.url)
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
    }
    return config
  }, function (err) {
    return Promise.reject(err)
  }
)

const transformData = (data) => {
  return data && !data._id
    ? Object.keys(data).map(key => ({...data[key]}))
    : data
}

http.interceptors.response.use(res => {
    if (configFile.isFirebase) {
      res.data = {content: transformData(res.data)}
    }
    return res
  },
  error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
    if (!expectedError) {
      // =========================
      console.log('error:', error.message)
      // =========================

      toast.info('Something happened. Try it later.')
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
}

export default httpService
