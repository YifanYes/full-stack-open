import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { Person } from './models/person.js'
import { errorHandler } from './middlewares/errorHandler.js'

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', async (_req, res, next) => {
  try {
    const people = await Person.find({})
    return res.status(200).send(`Phonebook has info for ${people.length} people <br/> ${new Date()}`)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons', async (_req, res, next) => {
  try {
    const people = await Person.find({})
    return res.status(200).json(people)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const personId = req.params.id
    const person = await Person.findById(personId)
    if (!person) {
      return res.status(404).end()
    }

    return res.status(200).json(person)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const personId = req.params.id

    const result = await Person.findByIdAndDelete(personId)
    if (!result) {
      return res.status(404).json({ message: 'Person not found' })
    }

    return res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }
    if (!number) {
      return res.status(400).json({ error: 'Number is required' })
    }

    const newPerson = new Person({
      name,
      number
    })

    const savedPerson = await newPerson.save()

    return res.status(200).json(savedPerson)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const personId = req.params.id
    const { name, number } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }
    if (!number) {
      return res.status(400).json({ error: 'Number is required' })
    }

    const person = await Person.findById(personId)
    if (!person) {
      return res.status(404).json({ message: 'Person not found' })
    }

    person.name = name
    person.number = number
    const updatedPerson = await person.save()

    return res.status(200).json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
