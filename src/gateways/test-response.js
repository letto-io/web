import axios from '../lib/axios'

export const create = (testId, testResponse) => {
  return axios.post(`/tests/${testId}/test_responses`, testResponse)
}

export const show = (testId) => {
  return axios.get(`/tests/${testId}}/test_responses`)
}

export const update = (id, testResponse) => {
  return axios.put(`/test_responses/${id}`, testResponse)
}

export default null
