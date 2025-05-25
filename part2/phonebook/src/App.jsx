import { useState } from 'react'
import AddPersonForm from './components/AddPersonForm'
import SearchBar from './components/SearchBar'

const App = () => {
  const [phonebook, setPhonebook] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchText, setSearchText] = useState('')

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
