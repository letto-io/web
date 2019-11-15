import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.WS_URL,
})

export default instance
