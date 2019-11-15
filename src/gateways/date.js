import axios from '../lib/axios'

export const update = (id, date) => {
  return axios.put(`/dates/${id}`, date)
}

export const destroy = (id) => {
  return axios.delete(`/dates/${id}`)
}

export default null
