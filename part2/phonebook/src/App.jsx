import axios from 'axios'
import { useEffect, useState } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchBar from './components/SearchBar'

const App = () => {
  const [phonebook, setPhonebook] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const getPhonebook = async () => {
      const response = await axios.get('http://localhost:3001/persons')
      setPhonebook(response.data)
    }
    getPhonebook()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (phonebook.some((person) => person.name === newPerson.name && person.number === newPerson.number)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }

    setPhonebook(phonebook.concat(newPerson))
    setNewPerson({ name: '', number: '' })
  }

  const handleFilterPersons = (event) => {
    setSearchText(event.target.value)
    setPhonebook(phonebook.filter((person) => person.name.toLowerCase().includes(searchText.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar searchText={searchText} handleFilterPersons={handleFilterPersons} />
      <h2>add a new</h2>
      <AddPersonForm newPerson={newPerson} setNewPerson={setNewPerson} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      {phonebook.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App
