import mongoose from 'mongoose'

const password = process.argv[2]
if (!password) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const url = `mongodb+srv://yifan:${password}@cluster0.8pojb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  const people = await Person.find({})
  console.log('phonebook:')

  for (const person of people) {
    console.log(`${person.name} ${person.number}`)
  }
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  await person.save()
  console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
}

mongoose.connection.close()
