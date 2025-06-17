import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URI)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: (props) => `Invalid phone number. It should be 2-3 digits followed by a dash and 5-6 digits.`
    }
  }
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Person = mongoose.model('Person', personSchema)
