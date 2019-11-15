import axios from '../lib/axios'

export const index = () => {
  return axios.get(`/events`)
}

export const show = (id) => {
  return axios.get(`/events/${id}`)
}

export const create = (event) => {
  return axios.post(`/events`, event)
}

export const update = (id, event) => {
  return axios.put(`/events/${id}`, event)
}

export const destroy = (id) => {
  return axios.delete(`/events/${id}`)
}

export const getInstructions = (id) => {
  return axios.get(`/events/${id}/instructions`)
}

export default null
