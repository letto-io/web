import axios from '../lib/axios'

export const create = (id, testQuestion) => {
  return axios.post(`/tests/${id}/test_questions`, testQuestion)
}

export const update = (id, testQuestion) => {
  return axios.put(`/test_questions/${id}`, testQuestion)
}

export const destroy = (id) => {
  return axios.delete(`/test_questions/${id}`)
}

export default null
