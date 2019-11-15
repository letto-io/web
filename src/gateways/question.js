import axios from '../lib/axios'

export const getAnswers = (id) => {
  return axios.get(`/questions/${id}/answers`)
}

export const createAnswer = (id, answer) => {
  return axios.post(`/questions/${id}/answers`, answer)
}

export const upvote = (id) => {
  return axios.post(`/questions/${id}/upvote`)
}

export const destroyVote = (id) => {
  return axios.delete(`/questions/${id}/vote`)
}

export const getMaterials = (id) => {
  return axios.get(`/questions/${id}/materials`)
}

export default null
