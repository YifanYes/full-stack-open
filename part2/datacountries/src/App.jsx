import axios from 'axios'
import { useEffect, useState } from 'react'
import Country from './components/Country'
import SearchBar from './components/SearchBar'

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

function App() {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get(`${API_URL}/all`)
      setCountries(response.data)
    }
    fetchCountries()
  }, [])

  const handleFindCountries = async (event) => {
    setSearchText(event.target.value)
    const result = countries.filter((country) => country.name.common.toLowerCase().includes(searchText.toLowerCase()))
    console.log(result)
    setFilteredCountries(result ?? [])
  }

  return (
    <>
      <SearchBar searchText={searchText} handleFindCountries={handleFindCountries} />
      {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
      {filteredCountries.length > 1 &&
        filteredCountries.length <= 10 &&
        filteredCountries.map((country) => <p key={country.cca3}>{country.name.common}</p>)}
      {filteredCountries.length === 1 && <Country country={filteredCountries[0]} />}
    </>
  )
}

export default App
