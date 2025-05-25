import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newPerson.name && person.number === newPerson.number)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(newPerson))
    setNewPerson({ name: '', number: '' })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            value={newPerson.name || ''}
            onChange={(event) => setNewPerson({ ...newPerson, name: event.target.value })}
          />
        </div>
        <div>
          number:
          <input
            value={newPerson.number || ''}
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
