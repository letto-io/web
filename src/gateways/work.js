import axios from '../lib/axios'

export const show = (id) => {
  return axios.get(`/works/${id}`)
}

export const update = (id, work) => {
  return axios.put(`/works/${id}`, work)
}

export const destroy = (id) => {
  return axios.delete(`/works/${id}`)
}

export const createMaterial = (id) => {
  return axios.post(`/works/${id}/materials`)
}

export const createSubmission = (id, submission) => {
  return axios.post(`/works/${id}/submissions`, submission)
}

export const getSubmissions = (id) => {
  return axios.get(`/works/${id}/submissions`)
}

export default null
