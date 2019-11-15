import axios from '../lib/axios'

export const show = (id) => {
  return axios.get(`/submissions/${id}`)
}

export const update = (id, submission) => {
  return axios.put(`/submissions/${id}`, submission)
}

export const destroy = (id) => {
  return axios.delete(`/submissions/${id}`)
}

export const createMaterial = (id) => {
  return axios.post(`/submissions/${id}/materials`)
}

export default null
