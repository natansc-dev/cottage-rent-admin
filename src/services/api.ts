import axios from 'axios'
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: 'https://app.chacarakairos.com.br',
  headers: {
    Authorization: `Bearer ${Cookies.get('reactauth.token')}`,
  },
})
