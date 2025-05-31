import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const addNewPerson = async (newPerson) => {
  const response = await axios.post(`${BASE_URL}/persons`, newPerson)
  return response.data
}

export const getPhonebook = async () => {
  const response = await axios.get(`${BASE_URL}/persons`)
  return response.data
}
