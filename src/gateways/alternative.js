import axios from '../lib/axios'

export const choose = (id) => {
  return axios.post(`/alternatives/${id}/choose`)
}

export default null
