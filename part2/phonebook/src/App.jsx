import { useEffect, useState } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchBar from './components/SearchBar'
import { addNewPerson, getPhonebook } from './services/phonebook.services'

const App = () => {
  const [phonebook, setPhonebook] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const fetchPhonebook = async () => {
      try {
        const phonebook = await getPhonebook()
        setPhonebook(phonebook)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPhonebook()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (phonebook.some((person) => person.name === newPerson.name && person.number === newPerson.number)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }

    try {
      const storedNewPerson = await addNewPerson(newPerson)
      setPhonebook(phonebook.concat(storedNewPerson))
      setNewPerson({ name: '', number: '' })
    } catch (error) {
      console.error(error)
    }
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
