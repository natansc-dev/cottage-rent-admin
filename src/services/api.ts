import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponseHeaders,
} from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

interface ErrorMessage extends AxiosError {
  response: {
    status: number
    statusText: string
    headers: AxiosResponseHeaders
    config: AxiosRequestConfig<any>
    data: {
      message: string
    }
  }
}

let isRefreshing = false
let failedRequestsQueue: any[] = []

export const api = axios.create({
  baseURL: 'https://app.chacarakairos.com.br',
  headers: {
    Authorization: `Bearer ${Cookies.get('reactauth.token')}`,
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: ErrorMessage) => {
    if (error.response.status === 401) {
      if (error.response.data.message === 'Invalid token') {
        const refreshToken = Cookies.get('reactauth.refresh_token')
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('/refresh-token', {
              token: refreshToken,
            })
            .then((response) => {
              // eslint-disable-next-line camelcase
              const { token, refresh_token } = response.data

              Cookies.set('reactauth.token', token, {
                expires: 1, // 1 day
                path: '/',
              })

              Cookies.set('reactauth.refresh_token', refresh_token, {
                expires: 1, // 1 day
                path: '/',
              })

              api.defaults.headers.Authorization = `Bearer ${token}`

              failedRequestsQueue?.forEach((request) =>
                request.onSuccess(token),
              )
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue?.forEach((request) => request.onFailure(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              if (!originalConfig?.headers) {
                return // Eu coloquei um return mas pode colocar algum erro ou um reject
              }

              originalConfig.headers.Authorization = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
        const navigate = useNavigate()

        Cookies.remove('reactauth.token', { path: '/' })
        Cookies.remove('reactauth.refresh_token', { path: '/' })

        navigate('/')
      }
    }

    return Promise.reject(error)
  },
)
