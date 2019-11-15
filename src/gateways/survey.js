import axios from '../lib/axios'

export const update = (id, survey) => {
  return axios.put(`/surveys/${id}`, survey)
}

export const destroy = (id) => {
  return axios.delete(`/surveys/${id}`)
}

export const close = (id) => {
  return axios.post(`/surveys/${id}/close`)
}

export default null
