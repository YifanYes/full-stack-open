import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import { blogRouter } from './controllers/blog.js'
import { MONGO_URI } from './utils/config.js'
import { info } from './utils/logger.js'
import { errorHandler, requestLogger, unknownEndpoint } from './utils/middleware.js'

export const app = express()

mongoose
  .connect(MONGO_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    error('error connection to MongoDB:', error.message)
  })

app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', blogRouter)
app.use(unknownEndpoint)
app.use(errorHandler)
