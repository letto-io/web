import axios from '../lib/axios'

export const index = () => {
  return axios.get(`/lectures`)
}

export const show = (id) => {
  return axios.get(`/lectures/${id}`)
}

export const create = (lecture) => {
  return axios.post(`/lectures`, lecture)
}

export const update = (id, lecture) => {
  return axios.put(`/lectures/${id}`, lecture)
}

export const destroy = (id) => {
  return axios.delete(`/lectures/${id}`)
}

export default null
