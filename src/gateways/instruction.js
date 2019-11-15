import axios from '../lib/axios'

export const index = () => {
  return axios.get(`/instructions`)
}

export const show = (id) => {
  return axios.get(`/instructions/${id}`)
}

export const create = (instruction) => {
  return axios.post(`/instructions`, instruction)
}

export const destroy = (id) => {
  return axios.delete(`/instructions/${id}`)
}

export const getProfile = (id) => {
  return axios.get(`/instructions/${id}/profile`)
}

export const getPresentations = (id) => {
  return axios.get(`/instructions/${id}/presentations`)
}

export const getNotices = (id) => {
  return axios.get(`/instructions/${id}/notices`)
}

export const getDates = (id) => {
  return axios.get(`/instructions/${id}/dates`)
}

export const getWorks = (id) => {
  return axios.get(`/instructions/${id}/works`)
}

export const getMaterials = (id) => {
  return axios.get(`/instructions/${id}/materials`)
}

export const getParticipants = (id) => {
  return axios.get(`/instructions/${id}/participants`)
}

export const getFAQs = (id) => {
  return axios.get(`/instructions/${id}/faqs`)
}

export const getSurveys = (id) => {
  return axios.get(`/instructions/${id}/surveys`)
}

export const getTests = (id) => {
  return axios.get(`/instructions/${id}/tests`)
}

export const createPresentation = (id, presentation) => {
  return axios.post(`/instructions/${id}/presentations`, presentation)
}
export const createNotice = (id, notice) => {
  return axios.post(`/instructions/${id}/notices`, notice)
}

export const createDate = (id, date) => {
  return axios.post(`/instructions/${id}/dates`, date)
}

export const createWork = (id, work) => {
  return axios.post(`/instructions/${id}/works`, work)
}

export const createMaterial = (id) => {
  return axios.post(`/instructions/${id}/materials`)
}

export const createFAQ = (id, faq) => {
  return axios.post(`/instructions/${id}/faqs`, faq)
}

export const createSurvey = (id, survey) => {
  return axios.post(`/instructions/${id}/surveys`, survey)
}

export const createTest = (id, test) => {
  return axios.post(`/instructions/${id}/tests`, test)
}

export default null
