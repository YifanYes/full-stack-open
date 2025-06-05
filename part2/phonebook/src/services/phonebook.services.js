import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'

export const addNewPerson = async (newPerson) => {
  const response = await axios.post(`${BASE_URL}/persons`, newPerson)
  return response.data
}

export const getPhonebook = async () => {
  const response = await axios.get(`${BASE_URL}/persons`)
  return response.data
}

export const deletePerson = async (id) => {
  await axios.delete(`${BASE_URL}/persons/${id}`)
}

export const updatePerson = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/persons/${id}`, data)
  return response.data
}
