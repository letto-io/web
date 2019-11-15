import axios from '../lib/axios'

export const login = (user) => {
  return axios.post(`/session`, user)
}

export const logout = () => {
  return axios.delete(`/session`)
}

export const recoverPassword = (user) => {
  return axios.post(`/recover-password`, user)
}

export const redefinePassword = (user) => {
  return axios.post(`/redefine-password`, user)
}

export default null
