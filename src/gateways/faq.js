import axios from '../lib/axios'

export const update = (id, faq) => {
  return axios.put(`/faqs/${id}`, faq)
}

export const destroy = (id) => {
  return axios.delete(`/faqs/${id}`)
}

export default null
