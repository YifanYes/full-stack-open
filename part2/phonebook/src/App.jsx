import { useEffect, useState } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchBar from './components/SearchBar'
import { addNewPerson, deletePerson, getPhonebook, updatePerson } from './services/phonebook.services'

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
    const { name, number } = newPerson

    const isExactDuplicate = phonebook.some((person) => person.name === name && person.number === number)
    if (isExactDuplicate) {
      alert(`${name} is already added to phonebook`)
      return
    }

    const newNumberPerson = phonebook.find((person) => person.name === name && person.number !== number)
    if (newNumberPerson) {
      const confirmUpdate = window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      )

      if (!confirmUpdate) return

      try {
        const updatedPerson = await updatePerson(newNumberPerson.id, { name, number })
        setPhonebook(phonebook.map((person) => (person.id === updatedPerson.id ? updatedPerson : person)))
        setNewPerson({ name: '', number: '' })
      } catch (error) {
        console.error('Failed to update person:', error)
      }

      return
    }

    try {
      const storedNewPerson = await addNewPerson(newPerson)
      setPhonebook([...phonebook, storedNewPerson])
      setNewPerson({ name: '', number: '' })
    } catch (error) {
      console.error('Failed to add new person:', error)
    }
  }

  const handleFilterPersons = (event) => {
    setSearchText(event.target.value)
    setPhonebook(phonebook.filter((person) => person.name.toLowerCase().includes(searchText.toLowerCase())))
  }

  const handleDeletePerson = async ({ name, id }) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await deletePerson(id)
        setPhonebook(phonebook.filter((person) => person.id !== id))
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar searchText={searchText} handleFilterPersons={handleFilterPersons} />
      <h2>add a new</h2>
      <AddPersonForm newPerson={newPerson} setNewPerson={setNewPerson} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      {phonebook.map((person) => (
        <div key={person.name} style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <span>
            {person.name} {person.number}
          </span>
          <button style={{ cursor: 'pointer' }} onClick={() => handleDeletePerson(person)}>
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
