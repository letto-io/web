import axios from '../lib/axios'

export const update = (id, test) => {
  return axios.put(`/tests/${id}`, test)
}

export const destroy = (id) => {
  return axios.delete(`/tests/${id}`)
}

export const getQuestions = (id) => {
  return axios.get(`/tests/${id}/test_questions`)
}

export const show = (id) => {
  return axios.get(`/tests/${id}`)
}

export default null
