import axios from '../lib/axios'

export const upvote = (id) => {
  return axios.post(`/answers/${id}/upvote`)
}

export const downvote = (id) => {
  return axios.post(`/answers/${id}/downvote`)
}

export const destroyVote = (id) => {
  return axios.delete(`/answers/${id}/vote`)
}

export const accept = (id) => {
  return axios.post(`/answers/${id}/accept`)
}

export const reject = (id) => {
  return axios.delete(`/answers/${id}/accept`)
}

export const createMaterial = (id) => {
  return axios.post(`/answers/${id}/materials`)
}

export const destroy = (id) => {
  return axios.delete(`/answers/${id}`)
}

export default null
