import axios from 'axios'
import Cookie from 'js-cookie'

const instance = axios.create({
  baseURL: process.env.WS_URL,
})

instance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: Cookie.get('token'),
  },
}))

export default instance
