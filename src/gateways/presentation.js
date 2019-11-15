import axios from '../lib/axios'

export const show = (id) => {
  return axios.get(`/presentations/${id}`)
}

export const close = (id) => {
  return axios.post(`/presentations/${id}/close`)
}

export const getMaterials = (id) => {
  return axios.get(`/presentations/${id}/materials`)
}

export const getQuestions = (id) => {
  return axios.get(`/presentations/${id}/questions`)
}

export const getRequests = (id) => {
  return axios.get(`/presentations/${id}/requests`)
}

export const createMaterial = (id) => {
  return axios.post(`/presentations/${id}/materials`)
}

export const createQuestion = (id, question) => {
  return axios.post(`/presentations/${id}/questions`, question)
}

export const createRequest = (id) => {
  return axios.post(`/presentations/${id}/requests`)
}

export const updateRequest = (id) => {
  return axios.put(`/requests/${id}`)
}

export default null
