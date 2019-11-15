import axios from '../lib/axios'

export const index = () => {
  return axios.get('/person')
}

export const show = (id) => {
  return axios.get(`/person/${id}`)
}

export const create = (person) => {
  return axios.post(`/person`, person)
}

export const update = (id, person) => {
  return axios.put(`/person/${id}`, person)
}

export const destroy = (id) => {
  return axios.delete(`/person/${id}`)
}

export default null
