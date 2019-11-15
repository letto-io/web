import axios from '../lib/axios'

export const show = (id) => {
  return axios.get(`/materials/${id}`)
}

export const update = (id, material) => {
  return axios.put(`/materials/${id}`, material)
}

export const destroy = (id) => {
  return axios.delete(`/materials/${id}`)
}

export default null
