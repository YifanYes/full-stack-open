import { useEffect, useState } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchBar from './components/SearchBar'
import Toast from './components/Toast'
import { addNewPerson, deletePerson, getPhonebook, updatePerson } from './services/phonebook.services'

const App = () => {
  const [phonebook, setPhonebook] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchText, setSearchText] = useState('')
  const [toastData, setToastData] = useState(null)

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
        setToastData({ message: `${name} updated successfully`, severity: 'success', duration: 3000 })
      } catch (error) {
        console.error(error)

        if (error.status === 404) {
          setToastData({
            message: `Information of ${name} has already been removed from server`,
            severity: 'error',
            duration: 3000
          })
          return
        }

        if (error.status === 400) {
          setToastData({
            message: error.response.data.error || 'Failed to update person',
            severity: 'error',
            duration: 3000
          })
          return
        }

        setToastData({ message: 'Failed to update person', severity: 'error', duration: 3000 })
      }

      return
    }

    try {
      const storedNewPerson = await addNewPerson(newPerson)
      setPhonebook([...phonebook, storedNewPerson])
      setNewPerson({ name: '', number: '' })
      setToastData({ message: `${name} added successfully`, severity: 'success', duration: 3000 })
    } catch (error) {
      console.error(error)

      if (error.status === 400) {
        setToastData({
          message: error.response.data.error || 'Failed to add new person',
          severity: 'error',
          duration: 3000
        })
        return
      }

      setToastData({ message: 'Failed to add new person', severity: 'error', duration: 3000 })
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
        setToastData({ message: `${name} deleted successfully`, severity: 'success', duration: 3000 })
      } catch (error) {
        console.error(error)
        setToastData({ message: 'Failed to delete person', severity: 'error', duration: 3000 })
      }
    }
  }

  return (
    <div>
      {toastData && (
        <Toast
          message={toastData.message}
          severity={toastData.severity}
          duration={toastData.duration}
          setToastData={setToastData}
        />
      )}
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
