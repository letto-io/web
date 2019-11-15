import axios from '../lib/axios'

export const create = (enroll) => {
  return axios.post(`/enrolls`, enroll)
}

export const destroy = (id) => {
  return axios.delete(`/enrolls/${id}`)
}

export default null
