import express from 'express'

const app = express()

app.use(express.json())

let phonebook = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

app.get('/info', (_req, res) => {
  return res.status(200).send(`Phonebook has info for ${phonebook.length} people <br/> ${new Date()}`)
})

app.get('/api/persons', (_req, res) => {
  return res.status(200).json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
  const personId = req.params.id
  const person = phonebook.find((person) => person.id === personId)
  if (!person) {
    return res.status(404).end()
  }

  return res.status(200).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const personId = req.params.id
  const person = phonebook.find((person) => person.id === personId)
  if (!person) {
    return res.status(404).end()
  }

  phonebook = phonebook.filter((person) => person.id !== personId)

  return res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (!name) {
    return res.status(400).json({ error: 'Name is required' })
  }
  if (!number) {
    return res.status(400).json({ error: 'Number is required' })
  }

  const existingName = phonebook.find((person) => person.name === name)
  if (existingName) {
    return res.status(400).json({ error: 'Name must be unique' })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 10000).toString(),
    name,
    number
  }
  phonebook.push(newPerson)

  return res.status(200).json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
