import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchText, setSearchText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newPerson.name && person.number === newPerson.number)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(newPerson))
    setNewPerson({ name: '', number: '' })
  }

  const handleFilterPersons = (event) => {
    setSearchText(event.target.value)
    setPersons(persons.filter((person) => person.name.toLowerCase().includes(searchText.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={searchText} onChange={handleFilterPersons} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            value={newPerson.name}
            onChange={(event) => setNewPerson({ ...newPerson, name: event.target.value })}
          />
        </div>
        <div>
          number:
          <input
            value={newPerson.number}
            onChange={(event) => setNewPerson({ ...newPerson, number: event.target.value })}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App
